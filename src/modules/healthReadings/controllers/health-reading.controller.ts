// health-reading.controller.ts
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { HealthReadingService } from '../services/health-reading.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ResponseUtil } from 'src/utils/response.utils';
import { CreateReadingDto, GetReadingsDto } from '../dto/health-reading.dto';
import { UuidValidationPipe } from 'src/shared/pipes/uuid.validator.pipe';

@ApiTags('Health Readings')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('readings')
export class HealthReadingController {
  constructor(private readonly healthReadingService: HealthReadingService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit a new health reading' })
  @ApiResponse({ status: 201, description: 'Reading submitted successfully' })
  @ApiResponse({ status: 404, description: 'Patient or device not found' })
  async createReading(@Body() createReadingDto: CreateReadingDto) {
    const data = await this.healthReadingService.createReading(createReadingDto);
    return ResponseUtil.handleResponse(
      data,
      'Reading submitted successfully',
      HttpStatus.CREATED,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all readings (supports ?patientId=)' })
  @ApiResponse({ status: 200, description: 'Readings retrieved successfully' })
  @ApiResponse({ status: 404, description: 'No readings found' })
  async getAll(@Query() query: GetReadingsDto) {
    const data = await this.healthReadingService.findAll(query);
    return ResponseUtil.handleResponse(
      data,
      'Readings retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a single reading by ID' })
  @ApiResponse({ status: 200, description: 'Reading retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Reading not found' })
  async getReadingById(@Param('id', UuidValidationPipe) id: string) {
    const data = await this.healthReadingService.fetchReading(id);
    return ResponseUtil.handleResponse(
      data,
      'Reading retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Get('patient/:patientId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all readings for a patient' })
  @ApiResponse({ status: 200, description: 'Patient readings retrieved successfully' })
  @ApiResponse({ status: 404, description: 'No readings found for patient' })
  async getReadingsByPatient(@Param('patientId', UuidValidationPipe) patientId: string) {
    const data = await this.healthReadingService.findByPatientId(patientId);
    return ResponseUtil.handleResponse(
      data,
      'Patient readings retrieved successfully',
      HttpStatus.OK,
    );
  }
}
