import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { ChargingStationService } from '../services/charging-station.service';
import { UserChargingStationService } from '../services/user-charging-station.service';
import {
  CreateChargingStationDto,
  UpdateChargingStationDto,
  AddUserChargingStationDto,
  UpdateUserChargingStationDto,
  FindNearbyStationsDto,
  FindChargingStationsDto,
  SearchChargingStationsDto,
  StartTripDto,
  EndTripDto,
  CancelTripDto,
} from '../dto/charging-station.dto';
import { ResponseUtil } from 'src/utils/response.utils';
import { JwtAuthPayload } from 'src/modules/auth/auth.interface';
import type { Request as ExpressRequest } from 'express';
import { Validators } from 'src/utils/validators.utils';
import { UserType } from 'src/enums';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@ApiTags('Charging Stations')
@Controller('charging-stations')
@ApiBearerAuth()
export class ChargingStationController {
  constructor(
    private readonly chargingStationService: ChargingStationService,
    private readonly userChargingStationService: UserChargingStationService,
  ) {}

  @Post()
  @Roles(UserType.PEPP_ADMIN, UserType.SUPER_ADMIN)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new charging station' })
  @ApiResponse({
    status: 201,
    description: 'Charging station created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createDto: CreateChargingStationDto) {
    const data = await this.chargingStationService.create(createDto);
    return ResponseUtil.handleResponse(
      data,
      'Charging station created successfully',
      HttpStatus.CREATED,
    );
  }

  @Get()
  @Roles(
    UserType.PEPP_ADMIN,
    UserType.SUPER_ADMIN,
    UserType.USER,
    UserType.DRIVER,
  )
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get all charging stations',
    description: 'If latitude and longitude are provided, returns nearby stations within the specified radius. Otherwise, returns filtered stations.',
  })
  @ApiResponse({
    status: 200,
    description: 'Charging stations retrieved successfully',
  })
  async findAll(
    @Query() findDto: FindChargingStationsDto,
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
  ) {
    const userId = req.user?.userId;
    const data = await this.chargingStationService.findAll(findDto, userId);
    return ResponseUtil.handleResponse(
      data,
      'Charging stations retrieved successfully',
      HttpStatus.OK,
    );
  }

  // @Get('active')
  // @Roles(
  //   UserType.PEPP_ADMIN,
  //   UserType.SUPER_ADMIN,
  //   UserType.USER,
  //   UserType.DRIVER,
  // )
  // @UseGuards(AuthGuard)
  // @ApiOperation({ summary: 'Get all active charging stations' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Active charging stations retrieved successfully',
  // })
  // @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  // @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  // @ApiQuery({ name: 'country', required: false, type: String })
  // @ApiQuery({ name: 'state', required: false, type: String })
  // async findActive(
  //   @Request() req: ExpressRequest & { user: JwtAuthPayload },
  //   @Query('page') page?: number,
  //   @Query('limit') limit?: number,
  //   @Query('country') country?: string,
  //   @Query('state') state?: string,
  // ) {
  //   const userId = req.user?.userId;
  //   const data = await this.chargingStationService.findActiveStations(
  //     {
  //       page: page ? Number(page) : undefined,
  //       limit: limit ? Number(limit) : undefined,
  //       country,
  //       state,
  //     },
  //     userId,
  //   );
  //   return ResponseUtil.handleResponse(
  //     data,
  //     'Active charging stations retrieved successfully',
  //     HttpStatus.OK,
  //   );
  // }

  @Get('nearby')
  @Roles(
    UserType.PEPP_ADMIN,
    UserType.SUPER_ADMIN,
    UserType.USER,
    UserType.DRIVER,
  )
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Find nearby charging stations' })
  @ApiResponse({
    status: 200,
    description: 'Nearby charging stations retrieved successfully',
  })
  async findNearby(
    @Query() findNearbyDto: FindNearbyStationsDto,
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
  ) {
    const userId = req.user?.userId;
    const data = await this.chargingStationService.findNearbyStations({
      latitude: findNearbyDto.latitude,
      longitude: findNearbyDto.longitude,
      radiusKm: findNearbyDto.radiusKm,
      page: findNearbyDto.page,
      limit: findNearbyDto.limit,
      userId,
    });
    return ResponseUtil.handleResponse(
      data,
      'Nearby charging stations retrieved successfully',
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
    summary: 'Search charging stations',
    description: 'Search by name or address. If latitude and longitude are provided, results are ordered by distance (nearest first).',
  })
  @ApiResponse({
    status: 200,
    description: 'Charging stations retrieved successfully',
  })
  async search(
    @Query() searchDto: SearchChargingStationsDto,
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
  ) {
    const userId = req.user?.userId;
    const data = await this.chargingStationService.search(searchDto, userId);
    return ResponseUtil.handleResponse(
      data,
      'Charging stations retrieved successfully',
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
  @ApiOperation({ 
    summary: 'Get a charging station by ID',
    description: 'If latitude and longitude are provided, distance will be calculated and included in the response.',
  })
  @ApiQuery({ 
    name: 'latitude', 
    required: false, 
    type: Number, 
    example: 6.5244,
    description: 'User\'s current latitude for distance calculation',
  })
  @ApiQuery({ 
    name: 'longitude', 
    required: false, 
    type: Number, 
    example: 3.3792,
    description: 'User\'s current longitude for distance calculation',
  })
  @ApiResponse({
    status: 200,
    description: 'Charging station retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Charging station not found' })
  async findById(
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
    @Param('id', ParseUUIDPipe) id: string,
    @Query('latitude') latitude?: number,
    @Query('longitude') longitude?: number,
  ) {
    const userId = req.user?.userId;
    const data = await this.chargingStationService.findById(
      id, 
      userId,
      latitude ? Number(latitude) : undefined,
      longitude ? Number(longitude) : undefined,
    );
    return ResponseUtil.handleResponse(
      data,
      'Charging station retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Post('user/start-trip')
  @Roles(UserType.USER, UserType.DRIVER)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Start a trip to a charging station' })
  @ApiResponse({
    status: 200,
    description: 'Trip started successfully',
  })
  @ApiResponse({ status: 404, description: 'Charging station not found' })
  async startTrip(
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
    @Body() startTripDto: StartTripDto,
  ) {
    const userId = Validators.validateUuid(req.user.userId);
    const data = await this.userChargingStationService.startTrip(
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
  @ApiOperation({ summary: 'End a trip to a charging station' })
  @ApiResponse({
    status: 200,
    description: 'Trip ended successfully',
  })
  @ApiResponse({ status: 404, description: 'Trip record not found' })
  async endTrip(
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
    @Body() endTripDto: EndTripDto,
  ) {
    const userId = Validators.validateUuid(req.user.userId);
    const data = await this.userChargingStationService.endTrip(
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
  @ApiOperation({ summary: 'Cancel a trip to a charging station' })
  @ApiResponse({
    status: 200,
    description: 'Trip cancelled successfully',
  })
  @ApiResponse({ status: 404, description: 'Trip record not found' })
  async cancelTrip(
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
    @Body() cancelTripDto: CancelTripDto,
  ) {
    const userId = Validators.validateUuid(req.user.userId);
    const data = await this.userChargingStationService.cancelTrip(
      userId,
      cancelTripDto,
    );
    return ResponseUtil.handleResponse(
      data,
      'Trip cancelled successfully',
      HttpStatus.OK,
    );
  }

  // @Delete(':id')
  // @Roles(UserType.PEPP_ADMIN, UserType.SUPER_ADMIN)
  // @UseGuards(AuthGuard)
  // @ApiOperation({ summary: 'Delete a charging station' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Charging station deleted successfully',
  // })
  // @ApiResponse({ status: 404, description: 'Charging station not found' })
  // async delete(@Param('id', ParseUUIDPipe) id: string) {
  //   await this.chargingStationService.delete(id);
  //   return ResponseUtil.handleResponse(
  //     null,
  //     'Charging station deleted successfully',
  //     HttpStatus.OK,
  //   );
  // }

  // User Charging Station Endpoints

  // @Post('user/add')
  // @Roles(UserType.USER, UserType.DRIVER)
  // @UseGuards(AuthGuard)
  // @ApiOperation({ summary: 'Add a charging station to user list' })
  // @ApiResponse({
  //   status: 201,
  //   description: 'Charging station added to user list successfully',
  // })
  // @ApiResponse({ status: 404, description: 'Charging station not found' })
  // @ApiResponse({ status: 409, description: 'Already added to user list' })
  // async addUserChargingStation(
  //   @Request() req: ExpressRequest & { user: JwtAuthPayload },
  //   @Body() addDto: AddUserChargingStationDto,
  // ) {
  //   const userId = Validators.validateUuid(req.user.userId);
  //   const data = await this.userChargingStationService.addUserChargingStation(
  //     userId,
  //     addDto,
  //   );
  //   return ResponseUtil.handleResponse(
  //     data,
  //     'Charging station added to user list successfully',
  //     HttpStatus.CREATED,
  //   );
  // }

  @Get('user/recents')
  @Roles(UserType.USER, UserType.DRIVER)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get user recent charging stations' })
  @ApiResponse({
    status: 200,
    description: 'Recent charging stations retrieved successfully',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  async getRecentStations(
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const userId = Validators.validateUuid(req.user.userId);
    const data = await this.userChargingStationService.getRecentStations(
      userId,
      {
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
      },
    );
    return ResponseUtil.handleResponse(
      data,
      'Recent charging stations retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Delete('user/recents/:chargingStationId')
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
    @Param('chargingStationId', ParseUUIDPipe) chargingStationId: string,
  ) {
    const userId = Validators.validateUuid(req.user.userId);
    const data = await this.userChargingStationService.removeFromRecent(
      userId,
      chargingStationId,
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
  @ApiOperation({ summary: 'Get user favorite charging stations' })
  @ApiResponse({
    status: 200,
    description: 'Favorite charging stations retrieved successfully',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  async getUserFavoriteStations(
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const userId = Validators.validateUuid(req.user.userId);
    console.log(userId)
    const data = await this.userChargingStationService.getUserFavoriteStations(
      userId,
      {
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
      },
    );
    return ResponseUtil.handleResponse(
      data,
      'Favorite charging stations retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Put('user/:chargingStationId/favorite')
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
  @ApiResponse({ status: 404, description: 'Charging station not found' })
  async toggleFavorite(
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
    @Param('chargingStationId', ParseUUIDPipe) chargingStationId: string,
  ) {
    const userId = Validators.validateUuid(req.user.userId);
    const data = await this.chargingStationService.toggleFavorite(
      userId,
      chargingStationId,
    );
    return ResponseUtil.handleResponse(
      data,
      data.message,
      HttpStatus.OK,
    );
  }

 
}

