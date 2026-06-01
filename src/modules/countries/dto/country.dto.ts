import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsISO31661Alpha2,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateCountryDto {
  @ApiProperty({
    description: 'Country name',
    example: 'Nigeria',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'ISO 3166-1 Alpha-2 country code',
    example: 'NG',
  })
  @IsString()
  @IsNotEmpty()
  @IsISO31661Alpha2()
  isoCode: string;

  @ApiProperty({
    description: 'International phone dialing code',
    example: '+234',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  phoneCode: string;

  @ApiProperty({
    description: 'Expected phone number length excluding country code',
    example: 11,
  })
  @IsNumber()
  @Min(1)
  phoneLength: number;

  @ApiProperty({
    description: 'Country currency code',
    example: 'NGN',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  currency: string;

  @ApiPropertyOptional({
    description: 'Country flag emoji or image URL',
    example: '🇳🇬',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  flag?: string | null;
}

export class UpdateCountryDto extends PartialType(CreateCountryDto) {}