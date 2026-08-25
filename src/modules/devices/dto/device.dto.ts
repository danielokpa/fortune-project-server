// create-device.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { DeviceStatus } from '@prisma/client';

export class CreateDeviceDto {
  @ApiProperty()
  @IsString()
  deviceName: string;
}

export class UpdateDeviceDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  deviceName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(DeviceStatus)
  status?: DeviceStatus;
}

export class GetDevicesDto {
  @ApiPropertyOptional({
    description: 'Cursor for pagination',
  })
  @IsOptional()
  cursor?: string;

  @ApiPropertyOptional({
    description: 'Number of records to fetch',
    default: 20,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit = 20;

  @ApiPropertyOptional({
    description: 'Search keyword for device name or status',
  })
  @IsOptional()
  @IsString()
  search?: string;
}
