import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsLatitude,
  IsLongitude,
  Min,
  Max,
} from 'class-validator';

export class FindCngStationsDto {
  @ApiProperty({
    description: 'User\'s current latitude',
    example: 6.4559,
    type: Number,
  })
  @IsLatitude()
  latitude: number;

  @ApiProperty({
    description: 'User\'s current longitude',
    example: 3.3970,
    type: Number,
  })
  @IsLongitude()
  longitude: number;

  @ApiPropertyOptional({
    description: 'Radius in kilometers to search for stations',
    example: 10,
    default: 10,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  radiusKm?: number;

  @ApiPropertyOptional({
    description: 'Country name to filter by',
    example: 'Nigeria',
    type: String,
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({
    description: 'State name to filter by',
    example: 'Lagos',
    type: String,
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({
    name: 'limit',
    required: false,
    type: Number,
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;
}





