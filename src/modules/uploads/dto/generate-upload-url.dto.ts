import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMimeType } from 'class-validator';

export enum CandidateDocumentType {
  PHOTO = 'photo',
  CV = 'cv',
  DRIVERS_LICENSE = 'drivers-license',
  NYSC = 'nysc',
  PROOF_OF_EXPERIENCE = 'proof_of_experience',
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