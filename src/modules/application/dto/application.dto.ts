import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsEnum,
  IsOptional, 
  IsString, 
  IsUUID,
  Min,
  Max 
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { JobRole, AssessmentStatus, ApplicationStatus, CandidateClassification } from '@prisma/client';

export class GetApplicationsDto {
  @ApiPropertyOptional({
    description: 'Cursor for pagination',
  })
  @IsOptional()
  @IsUUID()
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

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: JobRole })
  @IsOptional()
  @IsEnum(JobRole)
  jobRole?: JobRole;

  @ApiPropertyOptional({ enum: ApplicationStatus })
  @IsOptional()
  @IsEnum(ApplicationStatus)
  applicationStatus?: ApplicationStatus;

  @ApiPropertyOptional({ enum: AssessmentStatus })
  @IsOptional()
  @IsEnum(AssessmentStatus)
  assessmentStatus?: AssessmentStatus;

  @ApiPropertyOptional()
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  passedOnly?: boolean;

  @ApiPropertyOptional({
    enum: CandidateClassification,
  })
  @IsOptional()
  @IsEnum(CandidateClassification)
  classification?: CandidateClassification;

  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
    default: 'desc',
  })
  @IsOptional()
  sortOrder: 'asc' | 'desc' = 'desc';
}