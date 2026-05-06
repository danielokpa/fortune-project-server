import { PartialType } from '@nestjs/swagger';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateCngConversionCenterDto {
  @ApiProperty({ example: 'Lekki CNG Conversion Center' })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'Lagos' })
  @IsString()
  @MaxLength(100)
  state: string;

  @ApiProperty({ example: 'Nigeria' })
  @IsString()
  @MaxLength(100)
  country: string;

  @ApiProperty({ example: '12 Admiralty Way, Lekki Phase 1' })
  @IsString()
  @MaxLength(100)
  address: string;

  @ApiProperty({ example: '+2348012345678' })
  @IsString()
  @MaxLength(100)
  contactPhone: string;

  @ApiProperty({ example: '08:00:00' })
  @IsString()
  openingTime: string;

  @ApiProperty({ example: '18:00:00' })
  @IsString()
  closingTime: string;

  @ApiProperty({ example: 120.5 })
  @IsNumber()
  amountPerUnit: number;

  @ApiPropertyOptional({ example: 'NGN', default: 'NGN' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  currency?: string;

  @ApiPropertyOptional({ example: 'kwh', default: 'kwh' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  amountPerUnitType?: string;

  @ApiProperty({ example: 'support@center.com' })
  @IsEmail()
  @MaxLength(100)
  contactEmail: string;

  @ApiProperty({
    example: '12345678901',
    description: 'BVN used to generate conversion center virtual account',
  })
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  bvn?: string;

  @ApiPropertyOptional({ example: true, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ example: 3.3792 })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiPropertyOptional({ example: 6.5244 })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiPropertyOptional({ example: 'default.png' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  stationImage?: string;
}

export class UpdateCngConversionCenterDto extends PartialType(
  CreateCngConversionCenterDto,
) {}

export class FindCngConversionCentersQueryDto {
  @ApiPropertyOptional({ example: 1, default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ example: 10, default: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({
    example: 'Lekki',
    description: 'Search by center name, address, state or country',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
