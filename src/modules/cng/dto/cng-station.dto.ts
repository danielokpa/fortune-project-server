import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsLatitude,
  IsLongitude,
  IsUUID,
  Min,
  Max,
  MinLength,
  MaxLength,
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
  @Max(10000000000000)
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
    description: 'Page number for pagination',
    example: 1,
    default: 1,
    minimum: 1,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({
    name: 'limit',
    description: 'Limit number of results per page',
    example: 20,
    default: 20,
    minimum: 1,
    maximum: 100,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;
}

export class SearchCngStationsDto {
  @ApiProperty({
    description: 'Search query for name or address',
    example: 'CNG Station',
    type: String,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  query: string;

  @ApiPropertyOptional({
    description: 'Latitude coordinate for nearest search',
    example: 6.5244,
    type: Number,
  })
  @IsOptional()
  @IsLatitude()
  latitude?: number;

  @ApiPropertyOptional({
    description: 'Longitude coordinate for nearest search',
    example: 3.3792,
    type: Number,
  })
  @IsOptional()
  @IsLongitude()
  longitude?: number;

  @ApiPropertyOptional({
    description: 'Search radius in kilometers (used when latitude/longitude are provided)',
    example: 10,
    default: 10,
    minimum: 1,
    maximum: 10000000000000,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10000000000000)
  radiusKm?: number;

  @ApiPropertyOptional({
    name: 'limit',
    description: 'Limit number of results',
    example: 20,
    default: 20,
    minimum: 1,
    maximum: 100,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;

  @ApiPropertyOptional({
    name: 'offset',
    description: 'Offset for pagination',
    example: 0,
    default: 0,
    minimum: 0,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  offset?: number;
}

export class StartCngTripDto {
  @ApiProperty({
    description: 'CNG station ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  id: string;

  @ApiPropertyOptional({
    description: 'User latitude for distance calculation',
    example: 6.5244,
    type: Number,
  })
  @IsOptional()
  @IsLatitude()
  latitude?: number;

  @ApiPropertyOptional({
    description: 'User longitude for distance calculation',
    example: 3.3792,
    type: Number,
  })
  @IsOptional()
  @IsLongitude()
  longitude?: number;
}

export class EndCngTripDto {
  @ApiProperty({
    description: 'User CNG station record ID (from user_cng_stations table)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  id: string;
}

export class CancelCngTripDto {
  @ApiProperty({
    description: 'User CNG station record ID (from user_cng_stations table)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  id: string;
}

export class FindCngStationsQueryDto {
  @ApiPropertyOptional({
    name: 'page',
    description: 'Page number for pagination',
    example: 1,
    default: 1,
    minimum: 1,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({
    name: 'limit',
    description: 'Limit number of results per page',
    example: 10,
    default: 10,
    minimum: 1,
    maximum: 100,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;

  @ApiPropertyOptional({
    description: 'Country name to filter by',
    example: 'Nigeria',
    type: String,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  country?: string;

  @ApiPropertyOptional({
    description: 'State name to filter by',
    example: 'Lagos',
    type: String,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  state?: string;

  @ApiPropertyOptional({
    description: 'Filter by active status',
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}





