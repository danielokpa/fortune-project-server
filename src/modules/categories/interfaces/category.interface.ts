import { Prisma } from '@prisma/client';

export interface ICreateCategory extends Prisma.CategoryCreateInput {}

export interface ICategorySearchParams {
  search?: string;

  cursor?: string;

  limit?: number;
}
