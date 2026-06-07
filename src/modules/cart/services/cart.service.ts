import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CartRepository } from '../repositories/cart.repository';
import { ProductService } from '../../products/services/product.service';
import {
  IAddCartItem,
  IMergeCart,
  IUpdateCartItem,
} from '../interfaces/cart.interface';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productService: ProductService,
  ) {}

  async getCart(userId: string) {
    const cart = await this.cartRepository.findByUserId(userId);

    if (!cart) {
      return {
        items: [],
        subtotal: 0,
      };
    }

    const subtotal = cart.items.reduce(
      (sum, item) => sum + Number(item.unitPrice) * Number(item.quantity),
      0,
    );

    return {
      ...cart,
      subtotal,
    };
  }

  async addItem(userId: string, payload: IAddCartItem) {
    let cart = await this.cartRepository.findByUserId(userId);

    if (!cart) {
      await this.cartRepository.create(userId);

      cart = await this.cartRepository.findByUserId(userId);
    }

    if (!cart) throw new NotFoundException('Cart not found');

    const product = await this.productService.findByIdWithVariants(
      payload.productId,
    );
    if (!product.isAvailable) {
      throw new BadRequestException('Product is unavailable');
    }

    let unitPrice: Prisma.Decimal;

    if (payload.productVariantId) {
      const variant = product.variants?.find(
        (item) => item.id === payload.productVariantId,
      );

      if (!variant) {
        throw new NotFoundException('Product variant not found');
      }
      if (!variant.isAvailable) {
        throw new BadRequestException('Product variant is unavailable');
      }

      unitPrice = variant.price;
    } else {
      // const defaultVariant =
      // product.variants?.[0];

      // if (!defaultVariant) {
      // throw new NotFoundException(
      //     'Product price not found',
      // );
      // }

      // unitPrice = defaultVariant.price;

      unitPrice = product.price!;
    }

    const existingItem = await this.cartRepository.findCartItem(
      cart!.id,
      payload.productId,
      payload.productVariantId,
    );

    if (existingItem) {
      const updatedItem = await this.cartRepository.updateCartItem(
        existingItem.id,
        {
          quantity: {
            increment: payload.quantity,
          },
        },
      );

      return updatedItem;
    }

    const createdItem = await this.cartRepository.createCartItem({
      quantity: payload.quantity,

      unitPrice,

      cart: {
        connect: {
          id: cart!.id,
        },
      },

      product: {
        connect: {
          id: payload.productId,
        },
      },

      ...(payload.productVariantId && {
        productVariant: {
          connect: {
            id: payload.productVariantId,
          },
        },
      }),
    });

    return createdItem;
  }

  async updateItem(cartItemId: string, payload: IUpdateCartItem) {
    const cartItem = await this.cartRepository.findCartItemById(cartItemId);

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    if (payload.quantity <= 0) {
      await this.cartRepository.deleteCartItem(cartItemId);

      return true;
    }

    const updatedCartItem = await this.cartRepository.updateCartItem(
      cartItemId,
      {
        quantity: payload.quantity,
      },
    );

    return updatedCartItem;
  }

  async removeItem(itemId: string): Promise<boolean> {
    const deleted = await this.cartRepository.deleteCartItem(itemId);

    return deleted;
  }

  async clearCart(userId: string): Promise<boolean> {
    const cart = await this.cartRepository.findByUserId(userId);

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return this.cartRepository.clearCart(cart!.id);
  }

  async mergeCart(userId: string, payload: IMergeCart) {
    let cart = await this.cartRepository.findByUserId(userId);

    if (!cart) {
      await this.cartRepository.create(userId);

      cart = await this.cartRepository.findByUserId(userId);
    }

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    if (!payload.items.length) {
      return {
        mergedCount: 0,
      };
    }

    const mergedCount = await this.cartRepository.mergeCartItems(
      cart.id,
      payload.items,
    );

    return {
      mergedCount,
    };
  }
}
