import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export enum PeppFleetStatus {
  ACTIVE = 'active',
  MAINTENANCE = 'maintenance',
  UNASSIGNED = 'unassigned',
}

export class CreatePeppVehicleDto {
  @ApiProperty({ example: 'LAG-847-KJA', description: 'License / registration reference' })
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  licenseNumber: string;

  @ApiProperty({ example: 'Toyota Sienna', description: 'Brand or vehicle type label' })
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  brand: string;

  @ApiProperty({ example: 'Silver' })
  @IsString()
  @MinLength(2)
  @MaxLength(64)
  color: string;

  @ApiProperty({ example: 'LAG 847-KJA' })
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  plateNumber: string;

  @ApiProperty({ required: false, description: 'OCR / image plate text; defaults to plateNumber' })
  @IsOptional()
  @IsString()
  @MaxLength(32)
  imagePlateNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  registrationImageUrl?: string;

  @ApiProperty({ required: false, example: '2020' })
  @IsOptional()
  @IsString()
  @MaxLength(8)
  year?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  vinNumber?: string;

  @ApiProperty({ required: false, description: 'Assign to driver UUID' })
  @IsOptional()
  @IsUUID()
  driverId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  expiryDate?: string;

  @ApiProperty({ required: false, example: 7 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(80)
  capacity?: number;

  @ApiProperty({ required: false, example: 'Lagos' })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  region?: string;

  @ApiProperty({
    enum: PeppFleetStatus,
    required: false,
    description: 'If omitted, derived from driver assignment',
  })
  @IsOptional()
  @IsEnum(PeppFleetStatus)
  fleetStatus?: PeppFleetStatus;

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  @IsBoolean()
  isPeppcruiseVehicle?: boolean;
}

export class UpdatePeppVehicleDto extends PartialType(CreatePeppVehicleDto) {}

export class PeppVehicleListItemDto {
  id: string;
  type: string;
  plateNumber: string;
  capacity: number | null;
  region: string | null;
  assignedDriverName: string;
  assignedDriverPhone: string;
  status: string;
}
