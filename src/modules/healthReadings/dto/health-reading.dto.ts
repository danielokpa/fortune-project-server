import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID, IsNumber, IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReadingDto {
  @ApiProperty()
  @IsUUID()
  patientId: string;

  @ApiProperty()
  @IsUUID()
  deviceId: string;

  @ApiProperty()
  @IsNumber()
  heartRate: number;

  @ApiProperty()
  @IsNumber()
  temperature: number;
}

export class GetReadingsDto {
  @ApiPropertyOptional({ description: 'Filter by patient ID' })
  @IsOptional()
  @IsUUID()
  patientId?: string;

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

  @ApiPropertyOptional({ description: 'Search by heartRate or temperature' })
  @IsOptional()
  @IsString()
  search?: string;
}

// // reading-response.dto.ts
// import { ApiProperty } from '@nestjs/swagger';
// import { AlertStatus } from '@prisma/client';

// export class AlertResponseDto {
//   @ApiProperty()
//   id: string;

//   @ApiProperty()
//   parameter: string;

//   @ApiProperty()
//   value: number;

//   @ApiProperty({ enum: AlertStatus })
//   status: AlertStatus;

//   @ApiProperty()
//   createdAt: Date;
// }

// export class DeviceResponseDto {
//   @ApiProperty()
//   id: string;

//   @ApiProperty()
//   deviceName: string;

//   @ApiProperty()
//   status: string;

//   @ApiProperty()
//   createdAt: Date;
// }

// export class PatientResponseDto {
//   @ApiProperty()
//   id: string;

//   @ApiProperty()
//   firstName: string;

//   @ApiProperty()
//   lastName: string;

//   @ApiProperty()
//   gender: string;

//   @ApiProperty()
//   contact: string;

//   @ApiProperty()
//   dateOfBirth: Date;
// }

// export class ReadingResponseDto {
//   @ApiProperty()
//   id: string;

//   @ApiProperty()
//   patientId: string;

//   @ApiProperty()
//   deviceId: string;

//   @ApiProperty()
//   heartRate: number;

//   @ApiProperty()
//   temperature: number;

//   @ApiProperty()
//   recordedAt: Date;

//   @ApiProperty({ type: PatientResponseDto })
//   patient: PatientResponseDto;

//   @ApiProperty({ type: DeviceResponseDto })
//   device: DeviceResponseDto;

//   @ApiProperty({ type: [AlertResponseDto] })
//   alerts: AlertResponseDto[];
// }

// export class PaginatedReadingsResponseDto {
//   @ApiProperty({ type: [ReadingResponseDto] })
//   items: ReadingResponseDto[];

//   @ApiProperty()
//   pagination: {
//     limit: number;
//     hasNextPage: boolean;
//     nextCursor: string | null;
//   };
// }
