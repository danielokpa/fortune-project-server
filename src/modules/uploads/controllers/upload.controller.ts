import {
  Body,
  Controller,
  Post,
  HttpStatus,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UploadService } from '../services/upload.service';
import { GenerateUploadUrlDto } from '../dto/generate-upload-url.dto';
import { UploadResponseDto } from '../dto/upload-response.dto';
import { ResponseUtil } from 'src/utils/response.utils';

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
  async generateCandidateUploadUrl(
    @Body() dto: GenerateUploadUrlDto,
  ) {
    const data = await this.uploadService.generateCandidateUploadUrl(
      dto.documentType,
      dto.contentType,
    );
    return ResponseUtil.handleResponse(
      data,
      'Pre-signed url generated successfully',
      HttpStatus.CREATED,
    )
  }
}