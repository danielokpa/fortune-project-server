import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { IUpdateProduct } from '../interfaces/product.interface';
import { handleDatabaseError } from 'src/utils/db-error-handler.util';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Product | null> {
    try {
      const product = await this.prisma.product.findFirst({
        where: {
          id,
          deletedAt: null,
        },

        include: {
          category: true,

          originState: true,

          images: {
            orderBy: {
              sortOrder: 'asc',
            },
          },

          variants: {
            orderBy: {
              createdAt: 'asc',
            },
          },
        },
      });
      return product;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findByIdWithVariants(id: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: {
          id,
        },

        include: {
          variants: true,
        },
      });

      return product;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findByIdsWithVariants(productIds: string[]) {
    return this.prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },

      include: {
        variants: true,
      },
    });
  }

  //   async findBySlug(
  //     slug: string,
  //   ): Promise<Product | null> {
  //     try {
  //       const product =
  //         await this.prisma.product.findFirst({
  //           where: {
  //             slug,
  //             deletedAt: null,
  //           },
  //         });

  //       return product;
  //     } catch (error) {
  //       handleDatabaseError(error);
  //     }
  //   }

  async create(productData: Prisma.ProductCreateInput): Promise<Product> {
    try {
      const product = await this.prisma.product.create({
        data: productData,
        include: {
          images: true,
          variants: true,
          category: true,
        },
      });

      return product;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findProducts(options: Prisma.ProductFindManyArgs) {
    try {
      const products = await this.prisma.product.findMany(options);

      return products;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async updateProduct(
    productId: string,
    payload: IUpdateProduct,
  ): Promise<Product> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const existingProduct = await tx.product.findUnique({
          where: {
            id: productId,
          },

          include: {
            images: true,
            variants: true,
          },
        });

        if (!existingProduct) {
          throw new NotFoundException('Product not found');
        }

        const updatedProduct = await tx.product.update({
          where: {
            id: productId,
          },

          data: {
            ...(payload.name !== undefined && {
              name: payload.name,
            }),

            ...(payload.description !== undefined && {
              description: payload.description,
            }),

            ...(payload.shortDescription !== undefined && {
              shortDescription: payload.shortDescription,
            }),

            ...(payload.inventoryUnit !== undefined && {
              inventoryUnit: payload.inventoryUnit,
            }),

            ...(payload.status !== undefined && {
              status: payload.status,
            }),

            ...(payload.availableQuantity !== undefined && {
              availableQuantity: new Prisma.Decimal(payload.availableQuantity),
            }),

            ...(payload.minimumOrderQuantity !== undefined && {
              minimumOrderQuantity: new Prisma.Decimal(
                payload.minimumOrderQuantity,
              ),
            }),

            ...(payload.maximumOrderQuantity !== undefined && {
              maximumOrderQuantity: new Prisma.Decimal(
                payload.maximumOrderQuantity,
              ),
            }),

            ...(payload.isAvailable !== undefined && {
              isAvailable: payload.isAvailable,
            }),

            ...(payload.availableFrom !== undefined && {
              availableFrom: payload.availableFrom,
            }),

            ...(payload.availableTo !== undefined && {
              availableTo: payload.availableTo,
            }),

            ...(payload.categoryId && {
              category: {
                connect: {
                  id: payload.categoryId,
                },
              },
            }),

            ...(payload.originStateId && {
              originState: {
                connect: {
                  id: payload.originStateId,
                },
              },
            }),

            ...(payload.hasVariants === false &&
              payload.price !== undefined && {
                price: new Prisma.Decimal(payload.price),
              }),
          },
        });

        /**
         * IMAGES
         */
        if (payload.images) {
          const incomingImageIds = payload.images
            .filter((image) => image.id)
            .map((image) => image.id!);

          const imageIdsToDelete = existingProduct.images
            .filter((image) => !incomingImageIds.includes(image.id))
            .map((image) => image.id);

          if (imageIdsToDelete.length > 0) {
            await tx.productImage.deleteMany({
              where: {
                id: {
                  in: imageIdsToDelete,
                },
              },
            });
          }

          const imagesToCreate = payload.images
            .filter((image) => !image.id)
            .map((image) => ({
              productId,

              imageUrl: image.imageUrl,

              isPrimary: image.isPrimary ?? false,

              sortOrder: image.sortOrder ?? 0,
            }));

          if (imagesToCreate.length > 0) {
            await tx.productImage.createMany({
              data: imagesToCreate,
            });
          }

          const imagesToUpdate = payload.images.filter((image) => image.id);

          await Promise.all(
            imagesToUpdate.map((image) =>
              tx.productImage.update({
                where: {
                  id: image.id,
                },

                data: {
                  imageUrl: image.imageUrl,

                  isPrimary: image.isPrimary,

                  sortOrder: image.sortOrder,
                },
              }),
            ),
          );
        }

        /**
         * VARIANTS
         */
        if (payload.hasVariants && payload.variants) {
          const incomingVariantIds = payload.variants
            .filter((variant) => variant.id)
            .map((variant) => variant.id!);

          const variantIdsToDelete = existingProduct.variants
            .filter((variant) => !incomingVariantIds.includes(variant.id))
            .map((variant) => variant.id);

          if (variantIdsToDelete.length > 0) {
            await tx.productVariant.deleteMany({
              where: {
                id: {
                  in: variantIdsToDelete,
                },
              },
            });
          }

          const variantsToCreate = payload.variants
            .filter((variant) => !variant.id)
            .map((variant) => ({
              productId,

              name: variant.name,

              sku: variant.sku,

              price: new Prisma.Decimal(variant.price),

              inventoryUnit: variant.inventoryUnit,

              availableQuantity: variant.availableQuantity
                ? new Prisma.Decimal(variant.availableQuantity)
                : null,

              weightKg: variant.weightKg
                ? new Prisma.Decimal(variant.weightKg)
                : null,

              isAvailable: variant.isAvailable ?? true,
            }));

          if (variantsToCreate.length > 0) {
            await tx.productVariant.createMany({
              data: variantsToCreate,
            });
          }

          const variantsToUpdate = payload.variants.filter(
            (variant) => variant.id,
          );

          await Promise.all(
            variantsToUpdate.map((variant) =>
              tx.productVariant.update({
                where: {
                  id: variant.id,
                },

                data: {
                  name: variant.name,

                  sku: variant.sku,

                  price: new Prisma.Decimal(variant.price),

                  inventoryUnit: variant.inventoryUnit,

                  availableQuantity: variant.availableQuantity
                    ? new Prisma.Decimal(variant.availableQuantity)
                    : null,

                  weightKg: variant.weightKg
                    ? new Prisma.Decimal(variant.weightKg)
                    : null,

                  isAvailable: variant.isAvailable,
                },
              }),
            ),
          );
        }

        return updatedProduct;
      });
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const existingProduct = await this.prisma.product.findUnique({
        where: { id },
      });

      if (!existingProduct) {
        throw new NotFoundException('Product not found');
      }

      await this.prisma.product.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });

      return true;
    } catch (error) {
      handleDatabaseError(error);
    }
  }
}
