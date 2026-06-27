import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CandidateService } from '../services/candidate.service';
import { CreateCandidateDto } from '../dto/candidate.dto';
import { UuidValidationPipe } from '../../../shared/pipes/uuid.validator.pipe';
import { ResponseUtil } from 'src/utils/response.utils';

@ApiTags('Candidates')
@Controller('candidate')
export class CandidateController {
  constructor(
    private readonly candidateService: CandidateService,
  ) {}


  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a candidate' })
  @ApiResponse({ status: 201, description: 'Candidate created successfully' })
  @ApiResponse({ status: 400, description: 'Failed to create candidate' })
  async createCandidate(@Body() candidateData: CreateCandidateDto) {
    const data = await this.candidateService.createCandidate(candidateData);
    return ResponseUtil.handleResponse(
      data,
      'Candidate created successfully',
      HttpStatus.CREATED,
    );
  }
}