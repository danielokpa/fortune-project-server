// patient.controller.ts
import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  Query,
  Post,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PatientService } from '../services/patient.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserType } from '../../../enums/user-type.enum';
import { ResponseUtil } from 'src/utils/response.utils';
import { JwtAuthPayload } from '../../auth/auth.interface';
import { Validators } from 'src/utils/validators.utils';
import {
  CreatePatientDto,
  UpdatePatientDto,
  GetPatientsDto,
} from '../dto/patient.dto';
import { UuidValidationPipe } from 'src/shared/pipes/uuid.validator.pipe';

@ApiTags('Patients')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Roles(UserType.ADMIN, UserType.DOCTOR)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new patient' })
  @ApiResponse({ status: 201, description: 'Patient registered successfully' })
  @ApiResponse({ status: 500, description: 'Failed to create patient' })
  async createPatient(@Body() createPatientDto: CreatePatientDto) {
    const data = await this.patientService.patientRepository.create(createPatientDto);
    return ResponseUtil.handleResponse(
      data,
      'Patient registered successfully',
      HttpStatus.CREATED,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all patients' })
  @ApiResponse({ status: 200, description: 'Patients retrieved successfully' })
  @ApiResponse({ status: 404, description: 'No patients found' })
  async getAll(@Query() query: GetPatientsDto) {
    const data = await this.patientService.findAll(query);
    return ResponseUtil.handleResponse(
      data,
      'Patients retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get patient profile' })
  @ApiResponse({ status: 200, description: 'Patient retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  async getPatientById(@Param('id', UuidValidationPipe) id: string) {
    const data = await this.patientService.fetchPatient(id);
    return ResponseUtil.handleResponse(
      data,
      'Patient retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Roles(UserType.ADMIN, UserType.DOCTOR)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update patient info' })
  @ApiResponse({ status: 200, description: 'Patient updated successfully' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  async updatePatient(
    @Param('id', UuidValidationPipe) id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    const data = await this.patientService.update(id, updatePatientDto);
    return ResponseUtil.handleResponse(
      data,
      'Patient updated successfully',
      HttpStatus.OK,
    );
  }

  @Roles(UserType.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete patient record' })
  @ApiResponse({ status: 200, description: 'Patient deleted successfully' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  async deletePatient(@Param('id', UuidValidationPipe) id: string) {
    const data = await this.patientService.deletePatient(id);
    return ResponseUtil.handleResponse(
      data,
      'Patient deleted successfully',
      HttpStatus.OK,
    );
  }

  @Get(':id/summary')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get patient summary (latest reading + active alerts)' })
  @ApiResponse({ status: 200, description: 'Patient summary retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  async getPatientSummary(@Param('id', UuidValidationPipe) id: string) {
    const data = await this.patientService.getSummary(id);
    return ResponseUtil.handleResponse(
      data,
      'Patient summary retrieved successfully',
      HttpStatus.OK,
    );
  }
}
