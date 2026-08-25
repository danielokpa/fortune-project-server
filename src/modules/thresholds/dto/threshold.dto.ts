import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsOptional } from 'class-validator';

export class CreateThresholdDto {
  @ApiProperty()
  @IsUUID()
  patientId: string;

  @ApiProperty()
  @IsNumber()
  minHeartRate: number;

  @ApiProperty()
  @IsNumber()
  maxHeartRate: number;

  @ApiProperty()
  @IsNumber()
  minTemperature: number;

  @ApiProperty()
  @IsNumber()
  maxTemperature: number;
}

export class UpdateThresholdDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  minHeartRate?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  maxHeartRate?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  minTemperature?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  maxTemperature?: number;
}

export class ThresholdResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  patientId: string;

  @ApiProperty()
  minHeartRate: number;

  @ApiProperty()
  maxHeartRate: number;

  @ApiProperty()
  minTemperature: number;

  @ApiProperty()
  maxTemperature: number;
}
