import { Prisma } from '@prisma/client';

export interface IAddCartItem {
  productId: string;
  productVariantId?: string;
  quantity: number;
}

export interface IUpdateCartItem {
  quantity: number;
}

export interface IMergeCartItem {
  productId: string;
  productVariantId?: string;
  quantity: number;
}

export interface IMergeCart {
  items: IMergeCartItem[];
}

export interface ICartSearchParams {
  userId: string;
}

export interface ICreateCart extends Prisma.CartCreateInput {}
