// threshold.controller.ts
import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Body,
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
import { ThresholdService } from '../services/threshold.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserType } from '../../../enums/user-type.enum';
import { ResponseUtil } from 'src/utils/response.utils';
import { CreateThresholdDto, ThresholdResponseDto, UpdateThresholdDto } from '../dto/threshold.dto';
import { UuidValidationPipe } from 'src/shared/pipes/uuid.validator.pipe';

@ApiTags('Thresholds')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('thresholds')
export class ThresholdController {
  constructor(private readonly thresholdService: ThresholdService) {}

  @Roles(UserType.ADMIN, UserType.DOCTOR)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create threshold for a patient' })
  @ApiResponse({ status: 201, description: 'Threshold created successfully', type: ThresholdResponseDto })
  @ApiResponse({ status: 500, description: 'Failed to create threshold' })
  async createThreshold(@Body() createThresholdDto: CreateThresholdDto) {
    const data = await this.thresholdService.createThreshold(createThresholdDto);
    return ResponseUtil.handleResponse(
      data,
      'Threshold created successfully',
      HttpStatus.CREATED,
    );
  }

  @Get(':patientId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get threshold for a patient' })
  @ApiResponse({ status: 200, description: 'Threshold retrieved successfully', type: ThresholdResponseDto })
  @ApiResponse({ status: 404, description: 'Threshold not found' })
  async getThreshold(@Param('patientId', UuidValidationPipe) patientId: string) {
    const data = await this.thresholdService.getThreshold(patientId);
    return ResponseUtil.handleResponse(
      data,
      'Threshold retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Roles(UserType.ADMIN, UserType.DOCTOR)
  @Patch(':patientId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update threshold values for a patient' })
  @ApiResponse({ status: 200, description: 'Threshold updated successfully', type: ThresholdResponseDto })
  @ApiResponse({ status: 404, description: 'Threshold not found' })
  async updateThreshold(
    @Param('patientId', UuidValidationPipe) patientId: string,
    @Body() updateThresholdDto: UpdateThresholdDto,
  ) {
    const data = await this.thresholdService.updateThreshold(patientId, updateThresholdDto);
    return ResponseUtil.handleResponse(
      data,
      'Threshold updated successfully',
      HttpStatus.OK,
    );
  }
}
