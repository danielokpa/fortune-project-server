import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsUUID,
  IsLatitude,
  IsLongitude,
  MinLength,
  MaxLength,
  Min,
  Max,
  IsTimeZone,
} from 'class-validator';

export class CreateChargingStationDto {
  @ApiProperty({
    description: 'Name of the charging station',
    example: 'Tesla Supercharger - Lagos',
    maxLength: 100,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Country name',
    example: 'Nigeria',
    maxLength: 100,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  country: string;

  @ApiProperty({
    description: 'State name',
    example: 'Lagos',
    maxLength: 100,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  state: string;

  @ApiProperty({
    description: 'Full address of the charging station',
    example: '123 Victoria Island, Lagos',
    maxLength: 100,
  })
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  address: string;

  @ApiProperty({
    description: 'Contact phone number',
    example: '+2348100000000',
    maxLength: 100,
  })
  @IsString()
  @MaxLength(100)
  contactPhone: string;

  @ApiProperty({
    description: 'Contact email address',
    example: 'contact@chargingstation.com',
    maxLength: 100,
  })
  @IsEmail()
  @MaxLength(100)
  contactEmail: string;

  @ApiProperty({
    description: 'Opening time (HH:mm format)',
    example: '08:00',
  })
  @IsString()
  openingTime: string;

  @ApiProperty({
    description: 'Closing time (HH:mm format)',
    example: '22:00',
  })
  @IsString()
  closingTime: string;

  @ApiProperty({
    description: 'Amount per unit',
    example: 50.00,
    type: Number,
  })
  @IsNumber()
  @Min(0)
  amountPerUnit: number;

  @ApiPropertyOptional({
    description: 'Currency code',
    example: 'NGN',
    default: 'NGN',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  currency?: string;

  @ApiPropertyOptional({
    description: 'Amount per unit type',
    example: 'kwh',
    default: 'kwh',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  amountPerUnitType?: string;

  @ApiPropertyOptional({
    description: 'Latitude coordinate',
    example: 6.5244,
    type: Number,
  })
  @IsOptional()
  @IsLatitude()
  latitude?: number;

  @ApiPropertyOptional({
    description: 'Longitude coordinate',
    example: 3.3792,
    type: Number,
  })
  @IsOptional()
  @IsLongitude()
  longitude?: number;

  @ApiPropertyOptional({
    description: 'Initial rating (defaults to 0)',
    example: 0,
    minimum: 0,
    maximum: 5,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;

  @ApiPropertyOptional({
    description: 'Initial review count (defaults to 0)',
    example: 0,
    minimum: 0,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  reviews?: number;

  @ApiPropertyOptional({
    description: 'Whether the station is active (defaults to true)',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateChargingStationDto {
  @ApiPropertyOptional({
    description: 'Name of the charging station',
    example: 'Tesla Supercharger - Lagos Updated',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({
    description: 'Country name',
    example: 'Nigeria',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  country?: string;

  @ApiPropertyOptional({
    description: 'State name',
    example: 'Lagos',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  state?: string;

  @ApiPropertyOptional({
    description: 'Full address of the charging station',
    example: '123 Victoria Island, Lagos',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  address?: string;

  @ApiPropertyOptional({
    description: 'Contact phone number',
    example: '+2348100000000',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  contactPhone?: string;

  @ApiPropertyOptional({
    description: 'Contact email address',
    example: 'contact@chargingstation.com',
    maxLength: 100,
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  contactEmail?: string;

  @ApiPropertyOptional({
    description: 'Opening time (HH:mm format)',
    example: '08:00',
  })
  @IsOptional()
  @IsString()
  openingTime?: string;

  @ApiPropertyOptional({
    description: 'Closing time (HH:mm format)',
    example: '22:00',
  })
  @IsOptional()
  @IsString()
  closingTime?: string;

  @ApiPropertyOptional({
    description: 'Amount per unit',
    example: 50.00,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  amountPerUnit?: number;

  @ApiPropertyOptional({
    description: 'Currency code',
    example: 'NGN',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  currency?: string;

  @ApiPropertyOptional({
    description: 'Amount per unit type',
    example: 'kwh',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  amountPerUnitType?: string;

  @ApiPropertyOptional({
    description: 'Latitude coordinate',
    example: 6.5244,
    type: Number,
  })
  @IsOptional()
  @IsLatitude()
  latitude?: number;

  @ApiPropertyOptional({
    description: 'Longitude coordinate',
    example: 3.3792,
    type: Number,
  })
  @IsOptional()
  @IsLongitude()
  longitude?: number;

  @ApiPropertyOptional({
    description: 'Rating',
    example: 4,
    minimum: 0,
    maximum: 5,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;

  @ApiPropertyOptional({
    description: 'Review count',
    example: 150,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  reviews?: number;

  @ApiPropertyOptional({
    description: 'Whether the station is active',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class AddUserChargingStationDto {
  @ApiProperty({
    description: 'Charging station ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  chargingStationId: string;

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

  @ApiPropertyOptional({
    description: 'Mark as favorite',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isFavorite?: boolean;
}

export class UpdateUserChargingStationDto {
  @ApiPropertyOptional({
    description: 'Mark as favorite',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isFavorite?: boolean;

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

export class FindChargingStationsDto {
  @ApiPropertyOptional({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    minimum: 1,
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
    minimum: 1,
    maximum: 100,
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

  @ApiPropertyOptional({
    description: 'User\'s current latitude for nearby search',
    example: 6.5244,
    type: Number,
  })
  @IsOptional()
  @IsLatitude()
  latitude?: number;

  @ApiPropertyOptional({
    description: 'User\'s current longitude for nearby search',
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
    maximum: 100,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  radiusKm?: number;
}

export class FindNearbyStationsDto {
  @ApiProperty({
    description: 'Latitude coordinate',
    example: 6.5244,
    type: Number,
  })
  @IsLatitude()
  latitude: number;

  @ApiProperty({
    description: 'Longitude coordinate',
    example: 3.3792,
    type: Number,
  })
  @IsLongitude()
  longitude: number;

  @ApiPropertyOptional({
    description: 'Search radius in kilometers',
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

export class SearchChargingStationsDto {
  @ApiProperty({
    description: 'Search query for name or address',
    example: 'Tesla Supercharger',
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

export class StartTripDto {
  @ApiProperty({
    description: 'Charging station ID',
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

export class EndTripDto {
  @ApiProperty({
    description: 'User charging station record ID (from user_charging_stations table)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  id: string;
}

export class CancelTripDto {
  @ApiProperty({
    description: 'User charging station record ID (from user_charging_stations table)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  id: string;
}

