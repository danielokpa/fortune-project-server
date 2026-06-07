import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product, ProductStatus, Prisma } from '@prisma/client';
// import slugify from 'slugify';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductDto, ProductQueryDto } from '../dto/product.dto';
import { IUpdateProduct } from '../interfaces/product.interface';
import { CursorUtil } from 'src/utils/cursor.util';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(dto: CreateProductDto): Promise<Product> {
    // const generatedSlug =
    //   dto.slug ||
    //   slugify(dto.name, {
    //     lower: true,
    //     strict: true,
    //   });

    // const existingProduct =
    //   await this.productRepository.findBySlug(
    //     generatedSlug,
    //   );

    // if (existingProduct) {
    //   throw new BadRequestException(
    //     'Product slug already exists',
    //   );
    // }
    if (!dto.hasVariants && dto.price == null) {
      throw new BadRequestException(
        'Price is required when product has no variants',
      );
    }

    if (dto.hasVariants && (!dto.variants || dto.variants.length === 0)) {
      throw new BadRequestException(
        'At least one variant is required when hasVariants is true',
      );
    }

    if (dto.hasVariants && dto.price != null) {
      throw new BadRequestException(
        'Products with variants cannot have a product-level price',
      );
    }
    const productPrice = dto.hasVariants
      ? null
      : new Prisma.Decimal(dto.price!);

    const createdProduct = await this.productRepository.create({
      name: dto.name,
      // slug: generatedSlug,

      description: dto.description,

      shortDescription: dto.shortDescription,

      inventoryUnit: dto.inventoryUnit,

      price: productPrice,

      status: dto.status ?? ProductStatus.IN_STOCK,

      availableQuantity: dto.availableQuantity,

      minimumOrderQuantity: dto.minimumOrderQuantity,

      maximumOrderQuantity: dto.maximumOrderQuantity,

      isAvailable: dto.isAvailable ?? true,

      hasVariants: dto.hasVariants ?? false,

      availableFrom: dto.availableFrom,

      availableTo: dto.availableTo,

      category: {
        connect: {
          id: dto.categoryId,
        },
      },

      ...(dto.originStateId && {
        originState: {
          connect: {
            id: dto.originStateId,
          },
        },
      }),

      images: {
        create:
          dto.images?.map((image) => ({
            imageUrl: image.imageUrl,
            isPrimary: image.isPrimary,
            sortOrder: image.sortOrder ?? 0,
          })) ?? [],
      },

      variants: {
        create:
          dto.variants?.map((variant) => ({
            name: variant.name,
            sku: variant.sku,
            price: new Prisma.Decimal(variant.price),

            inventoryUnit: variant.inventoryUnit,

            availableQuantity: variant.availableQuantity,

            weightKg: variant.weightKg,
          })) ?? [],
      },
    });

    if (!createdProduct) {
      throw new BadRequestException('Failed to create product');
    }

    return createdProduct;
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async findByIdWithVariants(id: string) {
    const product = await this.productRepository.findByIdWithVariants(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async findByIdsWithVariants(productIds: string[]) {
    const products =
      await this.productRepository.findByIdsWithVariants(productIds);
    if (products.length === 0)
      throw new NotFoundException('Products not found');
    return products;
  }

  async findAll(query: ProductQueryDto) {
    const decodedCursor = CursorUtil.decode(query.cursor);

    const limit = Number(query.limit) || 20;

    const products = await this.productRepository.findProducts({
      where: {
        deletedAt: null,
        isAvailable: true,
        status: ProductStatus.IN_STOCK,

        ...(query.categoryId && {
          categoryId: query.categoryId,
        }),

        ...(query.search && {
          OR: [
            {
              name: {
                contains: query.search,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: query.search,
                mode: 'insensitive',
              },
            },
            {
              shortDescription: {
                contains: query.search,
                mode: 'insensitive',
              },
            },
          ],
        }),

        ...(decodedCursor && {
          OR: [
            {
              createdAt: {
                lt: new Date(decodedCursor.createdAt),
              },
            },
            {
              createdAt: new Date(decodedCursor.createdAt),

              id: {
                lt: decodedCursor.id,
              },
            },
          ],
        }),
      },

      include: {
        images: true,
        category: true,
      },

      orderBy: [
        {
          createdAt: 'desc',
        },
        {
          id: 'desc',
        },
      ],

      take: limit + 1,
    });

    const hasNextPage = products.length > limit;

    if (hasNextPage) {
      products.pop();
    }

    let nextCursor: string | null = null;

    if (hasNextPage && products.length > 0) {
      const lastProduct = products[products.length - 1];

      nextCursor = CursorUtil.encode({
        id: lastProduct.id,
        createdAt: lastProduct.createdAt.toISOString(),
      });
    }

    return {
      products,
      nextCursor,
    };
  }

  async update(id: string, dto: IUpdateProduct): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (dto.hasVariants === false && dto.price == null) {
      throw new BadRequestException(
        'Price is required when hasVariants is false',
      );
    }

    if (dto.hasVariants === true && dto.variants && dto.variants.length === 0) {
      throw new BadRequestException('At least one variant is required');
    }

    return this.productRepository.updateProduct(id, dto);
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.productRepository.delete(id);

    if (!deleted) {
      throw new BadRequestException('Failed to delete product');
    }

    return deleted;
  }
}
