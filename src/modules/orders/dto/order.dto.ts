import {
  IsOptional,
  IsString,
  MaxLength,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @ApiProperty({
    example: 'Daniel Okpa',
  })
  @IsString()
  @MaxLength(120)
  recipientName: string;

  @ApiProperty({
    example: '+2348012345678',
  })
  @IsString()
  @MaxLength(30)
  recipientPhoneNo: string;

  @ApiProperty({
    example: '12 Admiralty Way, Lekki Phase 1',
  })
  @IsString()
  deliveryAddress: string;

  @ApiProperty({
    example: 'Lagos',
  })
  @IsString()
  deliveryCity: string;

  @ApiProperty({
    example: 'Lagos',
  })
  @IsString()
  deliveryState: string;

  @ApiProperty({
    example: 'Nigeria',
  })
  @IsString()
  deliveryCountry: string;

  @ApiPropertyOptional({
    example: '100001',
  })
  @IsOptional()
  @IsString()
  postalCode?: string;

  @ApiPropertyOptional({
    example: 'Please call before delivery',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class GetOrdersDto {
  @IsOptional()
  @IsString()
  cursor?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}
