import { Type } from 'class-transformer';

import {
  IsArray,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddCartItemDto {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    description: 'Product ID',
  })
  @IsUUID()
  productId: string;

  @ApiPropertyOptional({
    example: 'v1b2c3d4-e5f6-7890-abcd-ef1234567890',
    description: 'Product variant ID',
  })
  @IsOptional()
  @IsUUID()
  productVariantId?: string;

  @ApiProperty({
    example: 2,
    description: 'Quantity to add',
  })
  @IsNumber()
  @Min(1)
  quantity: number;
}

export class UpdateCartItemDto {
  @ApiProperty({
    example: 5,
    description: 'Updated quantity',
  })
  @IsNumber()
  @Min(0)
  quantity: number;
}

export class MergeCartItemDto {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @IsUUID()
  productId: string;

  @ApiPropertyOptional({
    example: 'v1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @IsOptional()
  @IsUUID()
  productVariantId?: string;

  @ApiProperty({
    example: 3,
  })
  @IsNumber()
  @Min(1)
  quantity: number;
}

export class MergeCartDto {
  @ApiProperty({
    type: [MergeCartItemDto],
  })
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => MergeCartItemDto)
  items: MergeCartItemDto[];
}
