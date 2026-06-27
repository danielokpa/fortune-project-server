import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UploadService } from '../services/upload.service';
import { GenerateUploadUrlDto } from '../dto/generate-upload-url.dto';
import { UploadResponseDto } from '../dto/upload-response.dto';

@ApiTags('Uploads')
@Controller('uploads')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
  ) {}

  @Post('candidate')
  @ApiOkResponse({
    type: UploadResponseDto,
  })
  generateCandidateUploadUrl(
    @Body() dto: GenerateUploadUrlDto,
  ) {
    return this.uploadService.generateCandidateUploadUrl(
      dto.documentType,
      dto.contentType,
    );
  }
}