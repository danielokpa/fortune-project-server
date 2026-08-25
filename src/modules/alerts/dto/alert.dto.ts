import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, Max, IsUUID, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { AlertStatus } from '@prisma/client';

export class GetAlertsDto {
  @ApiPropertyOptional({ description: 'Filter by patient ID' })
  @IsOptional()
  @IsUUID()
  patientId?: string;

  @ApiPropertyOptional({ description: 'Filter by alert status' })
  @IsOptional()
  @IsEnum(AlertStatus)
  status?: AlertStatus;

  @ApiPropertyOptional({ description: 'Cursor for pagination' })
  @IsOptional()
  cursor?: string;

  @ApiPropertyOptional({ description: 'Number of records to fetch', default: 20 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit = 20;
}

export class AlertResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  patientId: string;

  @ApiProperty()
  readingId: string;

  @ApiProperty()
  parameter: string;

  @ApiProperty()
  value: number;

  @ApiProperty({ enum: AlertStatus })
  status: AlertStatus;

  @ApiProperty()
  createdAt: Date;
}
