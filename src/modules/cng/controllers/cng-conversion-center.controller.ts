import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserType } from 'src/enums';
import { JwtAuthPayload } from 'src/modules/auth/auth.interface';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { ResponseUtil } from 'src/utils/response.utils';
import type { Request as ExpressRequest } from 'express';
import {
  CreateCngConversionCenterDto,
  FindCngConversionCentersQueryDto,
  UpdateCngConversionCenterDto,
} from '../dto/cng-conversion-center.dto';
import { CngConversionCenterService } from '../services/cng-conversion-center.service';

@ApiTags('CNG Conversion Centers')
@Controller('cng-conversion/centers')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class CngConversionCenterController {
  constructor(
    private readonly centerService: CngConversionCenterService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Fetch/search CNG conversion centers (paginated)' })
  @ApiResponse({
    status: 200,
    description: 'CNG conversion centers fetched successfully',
  })
  async findAll(
    @Query() query: FindCngConversionCentersQueryDto,
    @Request() _req: ExpressRequest & { user: JwtAuthPayload },
  ) {
    const data = await this.centerService.findAll(query);
    return ResponseUtil.handleResponse(
      data,
      'CNG conversion centers fetched successfully',
      HttpStatus.OK,
    );
  }

  @Post()
  @Roles(UserType.SUPER_ADMIN, UserType.PEPP_ADMIN, UserType.PEPP_MANAGER)
  @ApiOperation({ summary: 'Create CNG conversion center' })
  @ApiResponse({
    status: 201,
    description: 'CNG conversion center created successfully',
  })
  async create(
    @Body() payload: CreateCngConversionCenterDto,
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
  ) {
    const data = await this.centerService.create(
      payload,
      req.headers.authorization,
    );
    return ResponseUtil.handleResponse(
      data,
      'CNG conversion center created successfully',
      HttpStatus.CREATED,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Fetch one CNG conversion center',
  })
  @ApiResponse({
    status: 200,
    description: 'CNG conversion center fetched successfully',
  })
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() _req: ExpressRequest & { user: JwtAuthPayload },
  ) {
    const data = await this.centerService.findById(id);
    return ResponseUtil.handleResponse(
      data,
      'CNG conversion center fetched successfully',
      HttpStatus.OK,
    );
  }

  @Put(':id')
  @Roles(UserType.SUPER_ADMIN, UserType.PEPP_ADMIN, UserType.PEPP_MANAGER)
  @ApiOperation({ summary: 'Update CNG conversion center' })
  @ApiResponse({
    status: 200,
    description: 'CNG conversion center updated successfully',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateCngConversionCenterDto,
    @Request() _req: ExpressRequest & { user: JwtAuthPayload },
  ) {
    const data = await this.centerService.update(id, payload);
    return ResponseUtil.handleResponse(
      data,
      'CNG conversion center updated successfully',
      HttpStatus.OK,
    );
  }

  @Delete(':id')
  @Roles(UserType.SUPER_ADMIN, UserType.PEPP_ADMIN, UserType.PEPP_MANAGER)
  @ApiOperation({ summary: 'Delete CNG conversion center' })
  @ApiResponse({
    status: 200,
    description: 'CNG conversion center deleted successfully',
  })
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() _req: ExpressRequest & { user: JwtAuthPayload },
  ) {
    await this.centerService.delete(id);
    return ResponseUtil.handleResponse(
      null,
      'CNG conversion center deleted successfully',
      HttpStatus.OK,
    );
  }
}
