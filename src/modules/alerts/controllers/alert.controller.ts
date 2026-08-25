// alert.controller.ts
import {
  Controller,
  Get,
  Param,
  Patch,
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
import { AlertService } from '../services/alert.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserType } from '../../../enums/user-type.enum';
import { ResponseUtil } from 'src/utils/response.utils';
import { GetAlertsDto, AlertResponseDto } from '../dto/alert.dto';
import { UuidValidationPipe } from 'src/shared/pipes/uuid.validator.pipe';

@ApiTags('Alerts')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('alerts')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all alerts (supports ?patientId=&status=)' })
  @ApiResponse({ status: 200, description: 'Alerts retrieved successfully', type: [AlertResponseDto] })
  @ApiResponse({ status: 404, description: 'No alerts found' })
  async getAll(@Query() query: GetAlertsDto) {
    const data = await this.alertService.findAll(query);
    return ResponseUtil.handleResponse(
      data,
      'Alerts retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a single alert by ID' })
  @ApiResponse({ status: 200, description: 'Alert retrieved successfully', type: AlertResponseDto })
  @ApiResponse({ status: 404, description: 'Alert not found' })
  async getAlertById(@Param('id', UuidValidationPipe) id: string) {
    const data = await this.alertService.fetchAlert(id);
    return ResponseUtil.handleResponse(
      data,
      'Alert retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Roles(UserType.ADMIN, UserType.DOCTOR)
  @Patch(':id/resolve')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Resolve an alert (mark as RESOLVED)' })
  @ApiResponse({ status: 200, description: 'Alert resolved successfully', type: AlertResponseDto })
  @ApiResponse({ status: 404, description: 'Alert not found' })
  async resolveAlert(@Param('id', UuidValidationPipe) id: string) {
    const data = await this.alertService.resolveAlert(id);
    return ResponseUtil.handleResponse(
      data,
      'Alert resolved successfully',
      HttpStatus.OK,
    );
  }
}
