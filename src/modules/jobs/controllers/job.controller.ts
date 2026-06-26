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
import { JobService } from '../services/job.service';
import { UuidValidationPipe } from '../../../shared/pipes/uuid.validator.pipe';
import { ResponseUtil } from 'src/utils/response.utils';

@ApiTags('Jobs')
@Controller('jobs')
export class JobController {
  constructor(
    private readonly jobService: JobService,
  ) {}


  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all jobs' })
  @ApiResponse({ status: 200, description: 'Jobs retrieved successfully' })
  async getJobs() {
    const data = await this.jobService.getJobs();
    return ResponseUtil.handleResponse(
      data,
      'Jobs retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get job' })
  @ApiResponse({ status: 200, description: 'Job retrieved successfully' })
  async getJob(
    @Param('id', UuidValidationPipe) id: string,
  ) {
    const data = await this.jobService.getJobById(id);
    return ResponseUtil.handleResponse(
      data,
      'Job retrieved successfully',
      HttpStatus.OK,
    );
  }
}