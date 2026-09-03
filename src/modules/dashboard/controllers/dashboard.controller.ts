import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { DashboardService } from '../services/dashboard.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ResponseUtil } from 'src/utils/response.utils';

@ApiTags('Dashboard')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get dashboard summary and latest data' })
  @ApiResponse({ status: 200, description: 'Dashboard summary retrieved successfully' })
  async getSummary() {
    const data = await this.dashboardService.getDashboardSummary();
    return ResponseUtil.handleResponse(
      data,
      'Dashboard summary retrieved successfully',
      HttpStatus.OK,
    );
  }
}
