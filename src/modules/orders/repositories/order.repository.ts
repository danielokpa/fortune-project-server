import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { Order, OrderStatus, PaymentStatus, Prisma } from '@prisma/client';
import { randomBytes } from 'crypto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from 'src/prisma/prisma.service';
import { CursorUtil } from 'src/utils/cursor.util';
import { handleDatabaseError } from 'src/utils/db-error-handler.util';
import {
  ICreateOrder,
  IOrderSearchParams,
} from '../interfaces/order.interface';

// Ideally extracted to a shared constants file (e.g. order.constants.ts)
// and imported by both the service and repository.
export const CANCELLABLE_STATUSES: OrderStatus[] = [
  OrderStatus.PENDING,
  OrderStatus.CONFIRMED,
];

type OrderItemInput = {
  productId: string;
  productVariantId: string | null;
  productName: string;
  variantName: string | undefined;
  quantity: Prisma.Decimal;
  unitPrice: Prisma.Decimal;
  totalPrice: Prisma.Decimal;
};

@Injectable()
export class OrderRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  private generateOrderNumber(): string {
    const date = new Date();
    const yy = date.getFullYear().toString().slice(-2);
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `KM${yy}${mm}${dd}${randomBytes(3).toString('hex').toUpperCase()}`;
  }

  private async generateUniqueOrderNumber(
    tx: Prisma.TransactionClient,
  ): Promise<string> {
    for (let attempt = 0; attempt < 5; attempt++) {
      const orderNumber = this.generateOrderNumber();
      const existing = await tx.order.findUnique({
        where: { orderNumber },
        select: { id: true },
      });
      if (!existing) return orderNumber;
    }
    throw new InternalServerErrorException(
      'Unable to generate unique order number',
    );
  }

  async createOrder(payload: ICreateOrder): Promise<Order> {
    try {
        const order = await this.prisma.$transaction(
        async (tx) => {
            // 1. Fetch cart
            const cart = await tx.cart.findUnique({
            where: { userId: payload.userId },
            include: {
                items: {
                include: {
                    product: true,
                    productVariant: true,
                },
                },
            },
            });

            if (!cart || !cart.items.length) {
              throw new NotFoundException('Cart is empty');
            }

            // 2. Validate inventory & build order items
            let subtotal = new Prisma.Decimal(0);
            const orderItems: OrderItemInput[] = [];

            for (const item of cart.items) {
            const unitPrice = item.unitPrice ?? new Prisma.Decimal(0);
            const totalPrice = unitPrice.mul(item.quantity);
            subtotal = subtotal.plus(totalPrice);

            if (item.productVariantId) {
                const availableQty = item.productVariant?.availableQuantity;
                if (availableQty == null) {
                throw new NotFoundException(
                    `Inventory unavailable for variant: ${item.productVariant?.name}`,
                );
                }
                if (availableQty.lt(item.quantity)) {
                throw new BadRequestException(
                    `Insufficient inventory for variant: ${item.productVariant!.name}`,
                );
                }
            } else {
                const availableQty = item.product.availableQuantity;
                if (availableQty == null) {
                throw new NotFoundException(
                    `Inventory unavailable for product: ${item.product.name}`,
                );
                }
                if (availableQty.lt(item.quantity)) {
                throw new BadRequestException(
                    `Insufficient inventory for product: ${item.product.name}`,
                );
                }
            }

            orderItems.push({
                productId: item.productId,
                productVariantId: item.productVariantId,
                productName: item.product.name,
                variantName: item.productVariant?.name,
                quantity: item.quantity,
                unitPrice,
                totalPrice,
            });
            }

            // 3. Generate order number — must NOT use this.prisma inside (only tx)
            const orderNumber = await this.generateUniqueOrderNumber(tx);

            // 4. Create order
            const order = await tx.order.create({
            data: {
                userId: payload.userId,
                orderNumber,
                status: OrderStatus.PENDING,
                paymentStatus: PaymentStatus.PENDING,
                subtotalAmount: subtotal,
                totalAmount: subtotal,
                recipientName: payload.recipientName,
                recipientPhoneNo: payload.recipientPhoneNo,
                deliveryAddress: payload.deliveryAddress,
                deliveryCity: payload.deliveryCity,
                deliveryState: payload.deliveryState,
                deliveryCountry: payload.deliveryCountry,
                postalCode: payload.postalCode,
                notes: payload.notes,
            },
            });

            // 5. Create order items
            await tx.orderItem.createMany({
              data: orderItems.map((item) => ({
                orderId: order.id,
                productId: item.productId,
                productVariantId: item.productVariantId,
                productName: item.productName,
                variantName: item.variantName,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                totalPrice: item.totalPrice,
              })),
            });

            // 6. Decrement inventory sequentially — avoids concurrent write-lock contention
            for (const item of cart.items) {
            if (item.productVariantId) {
                await tx.productVariant.update({
                where: { id: item.productVariantId },
                data: { availableQuantity: { decrement: item.quantity } },
                });
            } else {
                await tx.product.update({
                where: { id: item.productId },
                data: { availableQuantity: { decrement: item.quantity } },
                });
            }
            }

            // 7. Create tracking entry
            await tx.orderTracking.create({
            data: {
                orderId: order.id,
                status: OrderStatus.PENDING,
                note: 'Order created',
            },
            });

            // 8. Clear cart
            await tx.cartItem.deleteMany({
            where: { cartId: cart.id },
            });

            return order;
        },
        {
            maxWait: 10000, // wait up to 10s to acquire a connection
            timeout: 30000, // allow up to 30s for the transaction to complete
        },
        );

        // 9. Emit event AFTER commit — never inside the transaction
        this.eventEmitter.emit('inventory.quantity.changed');

        return order;
    } catch (error) {
        handleDatabaseError(error);
    }
  }

  async findOrdersByUser(params: IOrderSearchParams) {
    try {
      const limit = params.limit ?? 20;
      const decoded = CursorUtil.decode(params.cursor);

      const orders = await this.prisma.order.findMany({
        where: { userId: params.userId },
        take: limit + 1,
        ...(decoded && {
          cursor: { id: decoded.id },
          skip: 1,
        }),
        orderBy: [
          { createdAt: 'desc' },
          { id: 'desc' },
        ],
        include: { items: true },
      });

      const hasNext = orders.length > limit;
      const data = hasNext ? orders.slice(0, limit) : orders;
      const nextCursor = hasNext
        ? CursorUtil.encode({
            id: data[data.length - 1].id,
            createdAt: data[data.length - 1].createdAt.toISOString(),
          })
        : null;

      return { data, nextCursor };
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findById(orderId: string, userId: string) {
    try {
      return await this.prisma.order.findFirst({
        where: { id: orderId, userId },
        include: {
          items: {
            include: {
              product: true,
              productVariant: true,
            },
          },
          trackingEvents: {
            orderBy: { createdAt: 'asc' },
          },
          payments: true,
        },
      });
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async cancelOrder(orderId: string, userId: string): Promise<boolean> {
    try {
      await this.prisma.$transaction(async (tx) => {
        const order = await tx.order.findFirst({
          where: { id: orderId, userId },
          include: { items: true },
        });

        if (!order) {
          throw new NotFoundException('Order not found');
        }

        // Re-checking cancellability inside the transaction is intentional —
        // it guards against race conditions (e.g. order status changed between
        // the service's pre-check and this transaction executing).
        // The set of valid statuses mirrors CANCELLABLE_STATUSES in the service.
        if (!CANCELLABLE_STATUSES.includes(order.status)) {
          throw new BadRequestException('Order can no longer be cancelled');
        }

        await Promise.all(
          order.items.map((item) => {
            if (item.productVariantId) {
              return tx.productVariant.update({
                where: { id: item.productVariantId },
                data: { availableQuantity: { increment: item.quantity } },
              });
            }
            return tx.product.update({
              where: { id: item.productId },
              data: { availableQuantity: { increment: item.quantity } },
            });
          }),
        );

        await tx.order.update({
          where: { id: order.id },
          data: {
            status: OrderStatus.CANCELLED,
            cancelledAt: new Date(),
          },
        });

        await tx.orderTracking.create({
          data: {
            orderId: order.id,
            status: OrderStatus.CANCELLED,
            note: 'Order cancelled by customer',
          },
        });
      });

      this.eventEmitter.emit('inventory.quantity.changed');

      return true;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async getTrackingHistory(orderId: string, userId: string) {
    try {
      const order = await this.prisma.order.findFirst({
        where: { id: orderId, userId },
        select: { id: true },
      });

      if (!order) {
        throw new NotFoundException('Order not found');
      }

      return await this.prisma.orderTracking.findMany({
        where: { orderId },
        orderBy: { createdAt: 'asc' },
      });
    } catch (error) {
      handleDatabaseError(error);
    }
  }
}