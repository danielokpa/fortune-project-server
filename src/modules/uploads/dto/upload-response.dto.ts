import { ApiProperty } from '@nestjs/swagger';

export class UploadResponseDto {
  @ApiProperty({
    description: 'The storage key that uniquely identifies the uploaded file in Cloudflare R2.',
    example: 'candidate-documents/temp/8f5a2b4d-6c91-4f8f-8d56-2c5d4f8d9a21/cv.pdf',
  })
  key: string;

  @ApiProperty({
    example: 'PUT',
    description: 'HTTP method to use when uploading the file.',
  })
  method: 'PUT';

  @ApiProperty({
    description: 'Pre-signed URL used by the client to upload the file directly to Cloudflare R2.',
    example:
      'https://<account-id>.r2.cloudflarestorage.com/recruitment/candidate-documents/temp/8f5a2b4d-6c91-4f8f-8d56-2c5d4f8d9a21/cv.pdf?...',
  })
  uploadUrl: string;

  @ApiProperty({
    description: 'Number of seconds before the pre-signed URL expires.',
    example: 600,
  })
  expiresIn: number;
}