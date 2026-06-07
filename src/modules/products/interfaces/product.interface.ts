import { ProductStatus, InventoryUnit } from '@prisma/client';

export interface IProductSearchParams {
  search?: string;
  categoryId?: string;
  cursor?: string;
  limit?: number;
}

export interface ICreateProduct {
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  categoryId: string;
  originStateId?: string;

  inventoryUnit: InventoryUnit;

  status?: ProductStatus;

  availableQuantity?: number;

  minimumOrderQuantity?: number;

  maximumOrderQuantity?: number;

  isAvailable?: boolean;

  hasVariants?: boolean;

  availableFrom?: Date;

  availableTo?: Date;
}

export interface IUpdateProduct {
  name?: string;
  description?: string;
  shortDescription?: string;
  categoryId?: string;
  originStateId?: string;
  inventoryUnit?: InventoryUnit;
  price?: number;
  status?: ProductStatus;
  availableQuantity?: number;
  minimumOrderQuantity?: number;
  maximumOrderQuantity?: number;
  isAvailable?: boolean;
  hasVariants?: boolean;
  availableFrom?: string;
  availableTo?: string;

  images?: {
    id?: string;
    imageUrl: string;
    isPrimary?: boolean;
    sortOrder?: number;
  }[];

  variants?: {
    id?: string;
    name: string;
    sku?: string;
    price: number;
    inventoryUnit: InventoryUnit;
    availableQuantity?: number;
    weightKg?: number;
    isAvailable?: boolean;
  }[];
}
