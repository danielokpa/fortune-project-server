import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';
import { ResponseUtil } from 'src/utils/response.utils';
import { JwtAuthPayload } from 'src/modules/auth/auth.interface';
import type { Request as ExpressRequest } from 'express';
import { Validators } from 'src/utils/validators.utils';
import { UserType } from 'src/enums';
import { CivilServantInstallmentVerificationService } from '../services/civil-servant-installment-verification.service';
import {
  CreateCivilServantInstallmentUserInfoDto,
  UpdateCivilServantInstallmentUserInfoDto,
  UpdateCivilServantInstallmentStatusDto,
} from '../dto/civil-servant-installment-verification.dto';
import { CivilServantInstallmentVerificationStatus } from 'src/enums/civil-servant-installment-verification-status.enum';

@ApiTags('CNG Installment — Civil servant verification')
@Controller('cng-conversion/installment')
@ApiBearerAuth()
export class CngInstallmentUserInfoController {
  constructor(
    private readonly verificationService: CivilServantInstallmentVerificationService,
  ) {}

  @Post()
  @Auth([UserType.USER, UserType.DRIVER])
  @ApiOperation({
    summary: 'Submit civil servant installment verification (one per user)',
  })
  @ApiResponse({ status: 201, description: 'Verification record created' })
  async create(
    @Body() dto: CreateCivilServantInstallmentUserInfoDto,
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
  ) {
    const userId = Validators.validateUuid(req.user.userId);
    const data = await this.verificationService.create(userId, dto);
    return ResponseUtil.handleResponse(
      data,
      'Civil servant installment verification submitted',
      HttpStatus.CREATED,
    );
  }

  @Get()
  @Auth([UserType.USER, UserType.DRIVER])
  @ApiOperation({ summary: 'Get current user civil servant verification record' })
  @ApiResponse({ status: 200, description: 'Record returned or null' })
  async fetchUser(
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
  ) {
    const userId = Validators.validateUuid(req.user.userId);
    const data = await this.verificationService.fetchUser(userId);
    return ResponseUtil.handleResponse(
      data,
      data
        ? 'Civil servant installment verification retrieved'
        : 'No verification record yet',
      HttpStatus.OK,
    );
  }

  // @Put()
  // @Auth([UserType.USER, UserType.DRIVER])
  // @ApiOperation({
  //   summary:
  //     'Update own verification while status is PENDING (documents / salary)',
  // })
  // @ApiResponse({ status: 200, description: 'Verification updated' })
  // async updateUser(
  //   @Body() dto: UpdateCivilServantInstallmentUserInfoDto,
  //   @Request() req: ExpressRequest & { user: JwtAuthPayload },
  // ) {
  //   const userId = Validators.validateUuid(req.user.userId);
  //   const data = await this.verificationService.updateUser(userId, dto);
  //   return ResponseUtil.handleResponse(
  //     data,
  //     'Civil servant installment verification updated',
  //     HttpStatus.OK,
  //   );
  // }

  @Delete()
  @Auth([UserType.USER, UserType.DRIVER])
  @ApiOperation({
    summary:
      'Soft-delete own verification (only while status is PENDING)',
  })
  @ApiResponse({ status: 200, description: 'Verification deleted' })
  @ApiResponse({
    status: 400,
    description: 'Record is not PENDING',
  })
  async deleteUser(
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
  ) {
    const userId = Validators.validateUuid(req.user.userId);
    await this.verificationService.deleteUser(userId);
    return ResponseUtil.handleResponse(
      null,
      'Civil servant installment verification deleted',
      HttpStatus.OK,
    );
  }

  @Get('admin/list')
  @Auth([UserType.SUPER_ADMIN, UserType.PEPP_ADMIN, UserType.PEPP_MANAGER])
  @ApiOperation({
    summary: 'List civil servant verification submissions (paginated, optional status)',
  })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: CivilServantInstallmentVerificationStatus,
  })
  @ApiResponse({ status: 200, description: 'Paginated list' })
  async adminList(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('status') status?: CivilServantInstallmentVerificationStatus,
  ) {
    const data = await this.verificationService.findAllForAdmin({
      page: Number(page),
      limit: Number(limit),
      status,
    });
    return ResponseUtil.handleResponse(
      data,
      'Civil servant installment verifications fetched',
      HttpStatus.OK,
    );
  }

  @Patch(':id/status')
  @Auth([UserType.SUPER_ADMIN, UserType.PEPP_ADMIN, UserType.PEPP_MANAGER])
  @ApiOperation({
    summary: 'Set verification status (VERIFIED / UNVERIFIED / PENDING)',
  })
  @ApiResponse({ status: 200, description: 'Status updated' })
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCivilServantInstallmentStatusDto,
  ) {
    const data = await this.verificationService.updateStatusById(id, dto);
    return ResponseUtil.handleResponse(
      data,
      'Verification status updated',
      HttpStatus.OK,
    );
  }

  @Delete(':id')
  @Auth([UserType.SUPER_ADMIN, UserType.PEPP_ADMIN, UserType.PEPP_MANAGER])
  @ApiOperation({
    summary:
      'Soft-delete a verification by id (admin; only while PENDING)',
  })
  @ApiResponse({ status: 200, description: 'Verification deleted' })
  @ApiResponse({
    status: 400,
    description: 'Record is not PENDING',
  })
  async adminDelete(@Param('id', ParseUUIDPipe) id: string) {
    await this.verificationService.deleteByIdForAdmin(id);
    return ResponseUtil.handleResponse(
      null,
      'Civil servant installment verification deleted',
      HttpStatus.OK,
    );
  }
}
