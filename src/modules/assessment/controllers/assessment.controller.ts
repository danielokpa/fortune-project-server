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
import { AssessmentService } from '../services/assessment.service';
import { UuidValidationPipe } from '../../../shared/pipes/uuid.validator.pipe';
import { SubmitAssessmentDto } from '../dto/assessment.dto';
import { ResponseUtil } from 'src/utils/response.utils';

@ApiTags('Assessments')
@Controller('assessments')
export class AssessmentController {
  constructor(
    private readonly assessmentService: AssessmentService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary:
      'Create assessment attempt',
  })
  async createAssessmentAttempt(
    @Body()
    dto: { assessmentId: string, applicationId: string },
  ) {
    const data =
      await this.assessmentService.generateAssessmentAttempt(
        dto.assessmentId,
        dto.applicationId,
    );

    return ResponseUtil.handleResponse(
      data,
      'Assessment attempt generated successfully',
      HttpStatus.OK,
    );
  }

  @Post('submit')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary:
      'Submit assessment and application',
  })
  async submitAssessment(
    @Body()
    dto: SubmitAssessmentDto,
  ) {
    const data =
      await this.assessmentService.submitAssessment(
        dto,
    );

    return ResponseUtil.handleResponse(
      data,
      'Assessment submitted successfully',
      HttpStatus.CREATED,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all assessments' })
  @ApiResponse({ status: 200, description: 'Assessments retrieved successfully' })
  async getAssessments() {
    const data = await this.assessmentService.getAssessments();
    return ResponseUtil.handleResponse(
      data,
      'Assessments retrieved successfully',
      HttpStatus.OK,
    );
  }

  // keep
  @Get(':jobId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get assessment for job' })
  @ApiResponse({ status: 200, description: 'Assessment retrieved successfully' })
  async getAssessment(
    @Param('jobId', UuidValidationPipe) jobId: string,
  ) {
    const data = await this.assessmentService.getAssessmentForJob(jobId);
    return ResponseUtil.handleResponse(
      data,
      'Assessment retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Get(':id/questions')
  async getQuestions(
    @Param('id', UuidValidationPipe)
    id: string,
  ) {
    const data =
      await this.assessmentService.fetchQuestions(
        id,
      );

    return ResponseUtil.handleResponse(
      data,
      'Questions fetched successfully',
      HttpStatus.OK,
    );
  }

  @Get(':id/roleplay')
  async getRolePlayQuestions(
    @Param('id', UuidValidationPipe)
    id: string,
  ) {
    const data =
      await this.assessmentService.fetchRolePlayQuestions(
        id,
      );

    return ResponseUtil.handleResponse(
      data,
      'Role play questions fetched successfully',
      HttpStatus.OK,
    );
  }
}