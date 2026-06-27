import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMimeType } from 'class-validator';

export enum CandidateDocumentType {
  PHOTO = 'photo',
  CV = 'cv',
  DRIVERS_LICENSE = 'drivers-license',
  NYSC = 'nysc',
}

export class GenerateUploadUrlDto {
  @ApiProperty({
    enum: CandidateDocumentType,
  })
  @IsEnum(CandidateDocumentType)
  documentType: CandidateDocumentType;

  @ApiProperty({
    example: 'application/pdf',
  })
  @IsMimeType()
  contentType: string;
}