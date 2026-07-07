import {
  Controller,
  Get,
  Patch,
  HttpCode,
  HttpStatus,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserType } from '../../../enums/user-type.enum';
import { JwtAuthPayload } from '../../auth/auth.interface';
import { Validators } from 'src/utils/validators.utils';
import { ApplicationService } from '../services/application.service';
import { GetApplicationsDto, UpdateHrDecisionDto } from '../dto/application.dto';
import { ResponseUtil } from 'src/utils/response.utils';
import { UuidValidationPipe } from '../../../shared/pipes/uuid.validator.pipe';

@ApiTags('Applications')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserType.SUPER_ADMIN, UserType.HIRING_MANAGER)
@Controller('applications')
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
  ) {}

  /*
   |--------------------------------------------------------------------------
   | Dashboard Summary
   |--------------------------------------------------------------------------
   */

  @Get('summary')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get application dashboard summary',
  })
  @ApiResponse({
    status: 200,
    description: 'Dashboard summary fetched successfully',
  })
  async getDashboardSummary() {
    const data =
      await this.applicationService.getDashboardSummary();

    return ResponseUtil.handleResponse(
      data,
      'Dashboard summary fetched successfully.',
      HttpStatus.OK,
    );
  }

  /*
   |--------------------------------------------------------------------------
   | List Applications
   |--------------------------------------------------------------------------
   */

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get paginated applications',
  })
  @ApiResponse({
    status: 200,
    description: 'Applications fetched successfully',
  })
  async getApplications(
    @Query() query: GetApplicationsDto,
  ) {
    const data =
      await this.applicationService.getApplications(query);

    return ResponseUtil.handleResponse(
      data,
      'Applications fetched successfully.',
      HttpStatus.OK,
    );
  }

  /*
   |--------------------------------------------------------------------------
   | Get Application Details
   |--------------------------------------------------------------------------
   */

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get application details',
  })
  @ApiResponse({
    status: 200,
    description: 'Application fetched successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Application not found',
  })
  async getApplication(
    @Param('id', UuidValidationPipe)
    id: string,
  ) {
    const data =
      await this.applicationService.getApplication(id);

    return ResponseUtil.handleResponse(
      data,
      'Application fetched successfully.',
      HttpStatus.OK,
    );
  }

  @Patch(':id/review')
  @ApiOperation({
    summary: 'Update HR decision',
  })
  @ApiResponse({
    status: 200,
    description:
      'HR decision updated successfully',
  })
  async updateHrDecision(
    @Param('id', UuidValidationPipe)
    id: string,

    @Body()
    dto: UpdateHrDecisionDto,
  ) {
    const data =
      await this.applicationService.updateHrDecision(
        id,
        dto,
      );

    return ResponseUtil.handleResponse(
      data,
      'HR decision updated successfully.',
      HttpStatus.OK,
    );
  }
}