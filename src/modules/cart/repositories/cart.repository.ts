import { Injectable, NotFoundException } from '@nestjs/common';
import { Cart, CartItem, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleDatabaseError } from 'src/utils/db-error-handler.util';

export type CartWithItems = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        product: {
          include: {
            images: true;
          };
        };
        productVariant: true;
      };
    };
  };
}>;

@Injectable()
export class CartRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<CartWithItems | null> {
    try {
      const cart = await this.prisma.cart.findUnique({
        where: {
          userId,
        },

        include: {
          items: {
            include: {
              product: {
                include: {
                  images: true,
                },
              },

              productVariant: true,
            },
          },
        },
      });

      return cart;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async create(userId: string): Promise<Cart> {
    try {
      const cart = await this.prisma.cart.create({
        data: {
          userId,
        },
      });

      return cart;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async createCartItem(data: Prisma.CartItemCreateInput): Promise<CartItem> {
    try {
      const cartItem = await this.prisma.cartItem.create({
        data,
      });

      return cartItem;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async updateCartItem(
    id: string,
    data: Prisma.CartItemUpdateInput,
  ): Promise<CartItem> {
    try {
      const existingItem = await this.prisma.cartItem.findUnique({
        where: {
          id,
        },
      });

      if (!existingItem) {
        throw new NotFoundException('Cart item not found');
      }

      const updatedItem = await this.prisma.cartItem.update({
        where: {
          id,
        },
        data,
      });

      return updatedItem;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findCartItem(
    cartId: string,
    productId: string,
    productVariantId?: string,
  ): Promise<CartItem | null> {
    try {
      const item = await this.prisma.cartItem.findFirst({
        where: {
          cartId,
          productId,
          productVariantId: productVariantId ?? null,
        },
      });

      return item;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findCartItemById(id: string): Promise<CartItem | null> {
    try {
      const cartItem = await this.prisma.cartItem.findUnique({
        where: {
          id,
        },
        include: {
          product: true,
          productVariant: true,
          cart: true,
        },
      });

      return cartItem;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async deleteCartItem(id: string): Promise<boolean> {
    try {
      await this.prisma.cartItem.delete({
        where: {
          id,
        },
      });

      return true;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async clearCart(cartId: string): Promise<boolean> {
    try {
      await this.prisma.cartItem.deleteMany({
        where: {
          cartId,
        },
      });

      return true;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async mergeCartItems(
    cartId: string,
    items: {
      productId: string;
      productVariantId?: string;
      quantity: number;
    }[],
  ): Promise<number> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const productIds = [...new Set(items.map((item) => item.productId))];

        const variantIds = [
          ...new Set(
            items
              .filter((item) => item.productVariantId)
              .map((item) => item.productVariantId!),
          ),
        ];

        const [products, variants] = await Promise.all([
          tx.product.findMany({
            where: {
              id: {
                in: productIds,
              },
            },

            select: {
              id: true,
              price: true,
            },
          }),

          tx.productVariant.findMany({
            where: {
              id: {
                in: variantIds,
              },
            },

            select: {
              id: true,
              productId: true,
              price: true,
            },
          }),
        ]);

        const productMap = new Map(
          products.map((product) => [product.id, product]),
        );

        const variantMap = new Map(
          variants.map((variant) => [variant.id, variant]),
        );

        const existingItems = await tx.cartItem.findMany({
          where: {
            cartId,
          },
        });

        const existingMap = new Map(
          existingItems.map((item) => [
            `${item.productId}:${item.productVariantId ?? ''}`,
            item,
          ]),
        );

        const creates: Prisma.CartItemCreateManyInput[] = [];

        const updates: Prisma.PrismaPromise<any>[] = [];

        for (const item of items) {
          let unitPrice: Prisma.Decimal;

          if (item.productVariantId) {
            const variant = variantMap.get(item.productVariantId);

            if (!variant) {
              throw new NotFoundException(
                `Variant ${item.productVariantId} not found`,
              );
            }

            unitPrice = variant.price;
          } else {
            const product = productMap.get(item.productId);

            if (!product || !product.price) {
              throw new NotFoundException(
                `Product ${item.productId} not found or has no price`,
              );
            }

            unitPrice = product.price;
          }

          const key = `${item.productId}:${item.productVariantId ?? ''}`;

          const existing = existingMap.get(key);

          if (existing) {
            updates.push(
              tx.cartItem.update({
                where: {
                  id: existing.id,
                },

                data: {
                  quantity: {
                    increment: item.quantity,
                  },
                },
              }),
            );
          } else {
            creates.push({
              cartId,

              productId: item.productId,

              productVariantId: item.productVariantId,

              quantity: item.quantity,

              unitPrice,
            });
          }
        }

        if (creates.length) {
          await tx.cartItem.createMany({
            data: creates,
          });
        }

        if (updates.length) {
          await Promise.all(updates);
        }

        return items.length;
      });
    } catch (error) {
      handleDatabaseError(error);
    }
  }
}
