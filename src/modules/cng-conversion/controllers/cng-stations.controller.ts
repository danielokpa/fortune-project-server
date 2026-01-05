import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  UseGuards,
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
import { CngStationsService } from '../services/cng-stations.service';
import { UserCngStationService } from '../services/user-cng-station.service';
import {
  FindCngStationsDto,
  SearchCngStationsDto,
  StartCngTripDto,
  EndCngTripDto,
  CancelCngTripDto,
  FindCngStationsQueryDto,
} from '../dto/cng-station.dto';
import { ResponseUtil } from 'src/utils/response.utils';
import { JwtAuthPayload } from 'src/modules/auth/auth.interface';
import type { Request as ExpressRequest } from 'express';
import { Validators } from 'src/utils/validators.utils';
import { UserType } from 'src/enums';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@ApiTags('CNG Stations')
@Controller('cng-stations')
@ApiBearerAuth()
export class CngStationsController {
  constructor(
    private readonly cngStationsService: CngStationsService,
    private readonly userCngStationService: UserCngStationService,
  ) {}

  @Get()
  @Roles(
    UserType.PEPP_ADMIN,
    UserType.SUPER_ADMIN,
    UserType.USER,
    UserType.DRIVER,
  )
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get all CNG stations',
    description: 'Returns paginated list of CNG stations with optional filters',
  })
  @ApiResponse({
    status: 200,
    description: 'CNG stations retrieved successfully',
  })
  async findAll(
    @Query() findDto: FindCngStationsQueryDto,
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
  ) {
    const userId = req.user?.userId;
    const data = await this.cngStationsService.findAll(findDto, userId);
    return ResponseUtil.handleResponse(
      data,
      'CNG stations retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Get('active')
  @Roles(
    UserType.PEPP_ADMIN,
    UserType.SUPER_ADMIN,
    UserType.USER,
    UserType.DRIVER,
  )
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all active CNG stations' })
  @ApiResponse({
    status: 200,
    description: 'Active CNG stations retrieved successfully',
  })
  async findActiveStations(
    @Query() findDto: FindCngStationsQueryDto,
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
  ) {
    const userId = req.user?.userId;
    const data = await this.cngStationsService.findActiveStations(
      findDto,
      userId,
    );
    return ResponseUtil.handleResponse(
      data,
      'Active CNG stations retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Get('nearby')
  @Roles(
    UserType.PEPP_ADMIN,
    UserType.SUPER_ADMIN,
    UserType.USER,
    UserType.DRIVER,
  )
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Find nearby CNG stations' })
  @ApiResponse({
    status: 200,
    description: 'Nearby CNG stations retrieved successfully',
  })
  async findNearby(
    @Query() findNearbyDto: FindCngStationsDto,
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
  ) {
    const userId = req.user?.userId;
    const data = await this.cngStationsService.findNearbyStations({
      ...findNearbyDto,
      userId,
    });
    return ResponseUtil.handleResponse(
      data,
      'Nearby CNG stations retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Get('search')
  @Roles(
    UserType.PEPP_ADMIN,
    UserType.SUPER_ADMIN,
    UserType.USER,
    UserType.DRIVER,
  )
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Search CNG stations',
    description:
      'Search by name or address. If latitude and longitude are provided, results are ordered by distance (nearest first).',
  })
  @ApiResponse({
    status: 200,
    description: 'CNG stations retrieved successfully',
  })
  async search(
    @Query() searchDto: SearchCngStationsDto,
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
  ) {
    const userId = req.user?.userId;
    const data = await this.cngStationsService.search(searchDto, userId);
    return ResponseUtil.handleResponse(
      data,
      'CNG stations retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Get(':id')
  @Roles(
    UserType.PEPP_ADMIN,
    UserType.SUPER_ADMIN,
    UserType.USER,
    UserType.DRIVER,
  )
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get a CNG station by ID' })
  @ApiResponse({
    status: 200,
    description: 'CNG station retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'CNG station not found' })
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
  ) {
    const userId = req.user?.userId;
    const data = await this.cngStationsService.findById(id, userId);
    return ResponseUtil.handleResponse(
      data,
      'CNG station retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Put(':cngStationId/favorite')
  @Roles(
    UserType.PEPP_ADMIN,
    UserType.SUPER_ADMIN,
    UserType.USER,
    UserType.DRIVER,
  )
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Toggle favorite status' })
  @ApiResponse({
    status: 200,
    description: 'Favorite status toggled successfully',
  })
  @ApiResponse({ status: 404, description: 'CNG station not found' })
  async toggleFavorite(
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
    @Param('cngStationId', ParseUUIDPipe) cngStationId: string,
  ) {
    const userId = Validators.validateUuid(req.user.userId);
    const data = await this.cngStationsService.toggleFavorite(
      userId,
      cngStationId,
    );
    return ResponseUtil.handleResponse(
      data,
      data.message,
      HttpStatus.OK,
    );
  }

  @Get('user/recents')
  @Roles(UserType.USER, UserType.DRIVER)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get user recent CNG stations' })
  @ApiResponse({
    status: 200,
    description: 'Recent CNG stations retrieved successfully',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  async getRecentStations(
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const userId = Validators.validateUuid(req.user.userId);
    const data = await this.userCngStationService.getRecentStations(
      userId,
      {
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
      },
    );
    return ResponseUtil.handleResponse(
      data,
      'Recent CNG stations retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Delete('user/recents/:cngStationId')
  @Roles(UserType.USER, UserType.DRIVER)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Remove station from recent' })
  @ApiResponse({
    status: 200,
    description: 'Station removed from recent successfully',
  })
  @ApiResponse({ status: 404, description: 'Station not found in recent list' })
  async removeFromRecent(
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
    @Param('cngStationId', ParseUUIDPipe) cngStationId: string,
  ) {
    const userId = Validators.validateUuid(req.user.userId);
    const data = await this.userCngStationService.removeFromRecent(
      userId,
      cngStationId,
    );
    return ResponseUtil.handleResponse(
      data,
      data.message,
      HttpStatus.OK,
    );
  }

  @Get('user/favorites')
  @Roles(UserType.USER, UserType.DRIVER)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get user favorite CNG stations' })
  @ApiResponse({
    status: 200,
    description: 'Favorite CNG stations retrieved successfully',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  async getUserFavoriteStations(
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const userId = Validators.validateUuid(req.user.userId);
    const data = await this.userCngStationService.getUserFavoriteStations(
      userId,
      {
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
      },
    );
    return ResponseUtil.handleResponse(
      data,
      'Favorite CNG stations retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Post('user/start-trip')
  @Roles(UserType.USER, UserType.DRIVER)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Start a trip to a CNG station' })
  @ApiResponse({
    status: 200,
    description: 'Trip started successfully',
  })
  @ApiResponse({ status: 404, description: 'CNG station not found' })
  async startTrip(
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
    @Body() startTripDto: StartCngTripDto,
  ) {
    const userId = Validators.validateUuid(req.user.userId);
    const data = await this.userCngStationService.startTrip(
      userId,
      startTripDto,
    );
    return ResponseUtil.handleResponse(
      data,
      'Trip started successfully',
      HttpStatus.OK,
    );
  }

  @Put('user/end-trip')
  @Roles(UserType.USER, UserType.DRIVER)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'End a trip to a CNG station' })
  @ApiResponse({
    status: 200,
    description: 'Trip ended successfully',
  })
  @ApiResponse({ status: 404, description: 'Trip record not found' })
  async endTrip(
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
    @Body() endTripDto: EndCngTripDto,
  ) {
    const userId = Validators.validateUuid(req.user.userId);
    const data = await this.userCngStationService.endTrip(
      userId,
      endTripDto,
    );
    return ResponseUtil.handleResponse(
      data,
      'Trip ended successfully',
      HttpStatus.OK,
    );
  }

  @Put('user/cancel-trip')
  @Roles(UserType.USER, UserType.DRIVER)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Cancel a trip to a CNG station' })
  @ApiResponse({
    status: 200,
    description: 'Trip cancelled successfully',
  })
  @ApiResponse({ status: 404, description: 'Trip record not found' })
  async cancelTrip(
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
    @Body() cancelTripDto: CancelCngTripDto,
  ) {
    const userId = Validators.validateUuid(req.user.userId);
    await this.userCngStationService.cancelTrip(userId, cancelTripDto);
    return ResponseUtil.handleResponse(
      null,
      'Trip cancelled successfully',
      HttpStatus.OK,
    );
  }
}

