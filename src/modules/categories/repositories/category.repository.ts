import { Injectable } from '@nestjs/common';

import { Category, Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

import { handleDatabaseError } from 'src/utils/db-error-handler.util';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByName(name: string): Promise<Category | null> {
    try {
      const category = await this.prisma.category.findFirst({
        where: {
          name,
        },
      });

      return category;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findMany(options: Prisma.CategoryFindManyArgs): Promise<Category[]> {
    try {
      const categories = await this.prisma.category.findMany(options);

      return categories;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async count(where?: Prisma.CategoryWhereInput): Promise<number> {
    try {
      const total = await this.prisma.category.count({
        where,
      });

      return total;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async create(categoryData: Prisma.CategoryCreateInput): Promise<Category> {
    try {
      const category = await this.prisma.category.create({
        data: categoryData,
      });

      return category;
    } catch (error) {
      handleDatabaseError(error);
    }
  }
}
