import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsDecimal,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { InventoryUnit, ProductStatus } from '@prisma/client';

export class ProductImageDto {
  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}

export class ProductVariantDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsNumber()
  price: number;

  @IsEnum(InventoryUnit)
  inventoryUnit: InventoryUnit;

  @IsOptional()
  @IsNumber()
  availableQuantity?: number;

  @IsOptional()
  @IsNumber()
  weightKg?: number;
}

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  shortDescription?: string;

  @IsUUID()
  categoryId: string;

  @IsOptional()
  @IsUUID()
  originStateId?: string;

  @IsEnum(InventoryUnit)
  inventoryUnit: InventoryUnit;

  @ApiProperty({
    example: 15000,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @IsOptional()
  @IsNumber()
  availableQuantity?: number;

  @IsOptional()
  @IsNumber()
  minimumOrderQuantity?: number;

  @IsOptional()
  @IsNumber()
  maximumOrderQuantity?: number;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @IsOptional()
  @IsBoolean()
  hasVariants?: boolean;

  @IsOptional()
  availableFrom?: Date;

  @IsOptional()
  availableTo?: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImageDto)
  images: ProductImageDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDto)
  variants?: ProductVariantDto[];
}

export class DeleteProductDto {
  @IsUUID()
  productId: string;
}

export class ProductQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsString()
  cursor?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number = 20;
}

export class UpdateProductImageDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty()
  @IsString()
  imageUrl: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}

export class UpdateProductVariantDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    enum: InventoryUnit,
  })
  @IsEnum(InventoryUnit)
  inventoryUnit: InventoryUnit;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  availableQuantity?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  weightKg?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}

export class UpdateProductDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  shortDescription?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  originStateId?: string;

  @ApiPropertyOptional({
    enum: InventoryUnit,
  })
  @IsOptional()
  @IsEnum(InventoryUnit)
  inventoryUnit?: InventoryUnit;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({
    enum: ProductStatus,
  })
  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  availableQuantity?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  minimumOrderQuantity?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  maximumOrderQuantity?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  hasVariants?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  availableFrom?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  availableTo?: string;

  @ApiPropertyOptional({
    type: [UpdateProductImageDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => UpdateProductImageDto)
  images?: UpdateProductImageDto[];

  @ApiPropertyOptional({
    type: [UpdateProductVariantDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => UpdateProductVariantDto)
  variants?: UpdateProductVariantDto[];
}
