import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { OrderRepository, CANCELLABLE_STATUSES } from '../repositories/order.repository';
import { CreateOrderDto, GetOrdersDto } from '../dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
  ) {}

  async createOrder(userId: string, dto: CreateOrderDto) {
    return this.orderRepository.createOrder({ userId, ...dto });
  }

  async getMyOrders(userId: string, query: GetOrdersDto) {
    return this.orderRepository.findOrdersByUser({ userId, ...query });
  }

  async getOrderById(userId: string, orderId: string) {
    const order = await this.orderRepository.findById(orderId, userId);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async cancelOrder(userId: string, orderId: string) {
    const order = await this.orderRepository.findById(orderId, userId);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (!CANCELLABLE_STATUSES.includes(order.status)) {
      throw new BadRequestException('Order can no longer be cancelled');
    }

    return this.orderRepository.cancelOrder(orderId, userId);
  }

  async getOrderTracking(userId: string, orderId: string) {
    return this.orderRepository.getTrackingHistory(orderId, userId);
  }
}