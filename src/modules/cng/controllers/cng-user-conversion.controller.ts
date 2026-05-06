import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Request,
  HttpStatus,
  Query,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { CngConversionService as CngUserConversionService } from '../services/cng-conversion.service';
import {
  CreateCngConversionDto,
  UpdateUserCngConversionInspectionDto,
} from '../dto/cng-conversion.dto';
import { ResponseUtil } from 'src/utils/response.utils';
import { JwtAuthPayload } from 'src/modules/auth/auth.interface';
import type { Request as ExpressRequest } from 'express';
import { Validators } from 'src/utils/validators.utils';
import { UserType } from 'src/enums';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';

@ApiTags('CNG Conversion')
@Controller('cng-conversion/users')
@ApiBearerAuth()
@Auth([UserType.USER, UserType.DRIVER])
export class CngUserConversionController {
  constructor(
    private readonly cngConversionService: CngUserConversionService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a CNG conversion request' })
  @ApiResponse({ status: 201, description: 'CNG conversion request created successfully' })
  async create(@Body() cngConversionData: CreateCngConversionDto, @Request() req: ExpressRequest & { user: JwtAuthPayload }) {
    const userId = Validators.validateUuid(req.user.userId);
    const data = await this.cngConversionService.create(userId, req.user.userType, cngConversionData);
    return ResponseUtil.handleResponse(data, 'CNG conversion request created successfully', HttpStatus.CREATED);
  }

  @Put()
  @ApiOperation({
    summary:
      'Update CNG conversion inspection images / file URLs and optional step flags',
  })
  @ApiResponse({
    status: 200,
    description: 'CNG conversion inspection updated successfully',
  })
  async updateInspection(
    @Body() body: UpdateUserCngConversionInspectionDto,
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
  ) {
    const userId = Validators.validateUuid(req.user.userId);
    const data = await this.cngConversionService.updateInspectionForUser(
      userId,
      body,
    );
    return ResponseUtil.handleResponse(
      data,
      'CNG conversion inspection updated successfully',
      HttpStatus.OK,
    );
  }

  @Get('vehicle-transmissions')
  @ApiOperation({ summary: 'Get list of transmission types' })
  @ApiResponse({ status: 200, description: 'Transmission types retrieved successfully' })
  async getTransmissions() {
    const data = await this.cngConversionService.fetchTransmission();
    return ResponseUtil.handleResponse(data, 'Transmission types retrieved successfully', HttpStatus.OK);
  }


  @Get()
  @ApiOperation({
    summary: 'List current user’s CNG conversion requests (paginated, optional search)',
  })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({
    name: 'search',
    required: false,
    description:
      'Substring match on plate (vehicle registration no.), VIN, NIN, name, email, phone, vehicle fields, route, address, status, id',
  })
  @ApiResponse({
    status: 200,
    description: 'CNG conversion requests retrieved successfully',
  })
  async fetchUserCngConversions(
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ) {
    const userId = Validators.validateUuid(req.user.userId);
    const data = await this.cngConversionService.fetchUserCngConversions(
      userId,
      page,
      limit,
      search,
    );
    return ResponseUtil.handleResponse(
      data,
      'Fetch cng conversions retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Get('/stats')
  @ApiOperation({
    summary:
      'User CNG conversion dashboard counts and 4 most recent conversion requests',
  })
  @ApiResponse({
    status: 200,
    description:
      'pendingConversions, completedConversions, myDrafts, totalConversions, civilServantProof (joined civil servant installment row by userId, or null), recentConversions (up to 4, newest first)',
  })
  async fetchUserCngConversionsStats(
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
  ) {
    const userId = Validators.validateUuid(req.user.userId);
    const data = await this.cngConversionService.fetchUserCngConversionsStats(userId);
    return ResponseUtil.handleResponse(data, 'Fetch cng conversions retrieved successfully', HttpStatus.OK);
  }

  @Get(':id')
  @ApiOperation({
    summary:
      'Get one CNG conversion request for the current user (includes conversion center / station when set)',
  })
  @ApiResponse({
    status: 200,
    description:
      'User CNG conversion with nested conversionStation (CngConversionStation) when conversionCenter is set',
  })
  async fetchUserCngConversionById(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
  ) {
    const userId = Validators.validateUuid(req.user.userId);
    const data = await this.cngConversionService.fetchUserCngConversionById(
      userId,
      id,
    );
    return ResponseUtil.handleResponse(
      data,
      'CNG conversion request retrieved successfully',
      HttpStatus.OK,
    );
  }
}

