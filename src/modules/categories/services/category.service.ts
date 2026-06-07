import { BadRequestException, Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { CategoryRepository } from '../repositories/category.repository';
import {
  ICreateCategory,
  ICategorySearchParams,
} from '../interfaces/category.interface';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(categoryData: ICreateCategory): Promise<Category> {
    const existingCategory = await this.categoryRepository.findByName(
      categoryData.name,
    );

    if (existingCategory) {
      throw new BadRequestException('Category already exists');
    }

    const category = await this.categoryRepository.create(categoryData);

    if (!category) {
      throw new BadRequestException('Failed to create category');
    }

    return category;
  }

  async findAll(params: ICategorySearchParams): Promise<Category[]> {
    const { search } = params;

    const where: Prisma.CategoryWhereInput = {
      isActive: true,

      ...(search && {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      }),
    };

    const categories = await this.categoryRepository.findMany({
      where,

      orderBy: {
        name: 'asc',
      },
    });

    return categories;
  }
}
