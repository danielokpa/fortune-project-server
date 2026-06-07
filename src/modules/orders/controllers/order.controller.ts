import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Request,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import type { Request as ExpressRequest } from 'express';
import { OrderService } from '../services/order.service';
import {
  CreateOrderDto,
  GetOrdersDto,
} from '../dto/order.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserType } from '../../../enums/user-type.enum';
import { ResponseUtil } from '../../../utils/response.utils';
import { JwtAuthPayload } from '../../auth/auth.interface';
import { Validators } from 'src/utils/validators.utils';
import { UuidValidationPipe } from '../../../shared/pipes/uuid.validator.pipe';


@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
  ) {}

  @Post()
  @Roles(UserType.USER)
  @ApiOperation({
    summary: 'Create order from cart',
  })
  @ApiResponse({
    status: 201,
    description: 'Order created successfully',
  })
  async create(
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
    @Body()
    payload: CreateOrderDto,
  ) {
    const userId = Validators.validateUuid(req.user.userId);
    const data =
      await this.orderService.createOrder(
        userId,
        payload,
      );

    return ResponseUtil.handleResponse(
      data,
      'Order created successfully',
      HttpStatus.CREATED,
    );
  }

  @Get()
  @Roles(UserType.USER)
  @ApiOperation({
    summary: 'Get my orders',
  })
  @ApiResponse({
    status: 200,
    description: 'Orders retrieved successfully',
  })
  async findMyOrders(
    @Request() req: ExpressRequest & { user: JwtAuthPayload },

    @Query()
    query: GetOrdersDto,
  ) {
    const userId = Validators.validateUuid(req.user.userId);
    const data =
      await this.orderService.getMyOrders(
        userId,
        query,
      );

    return ResponseUtil.handleResponse(
      data,
      'Orders retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Get(':id')
  @Roles(UserType.USER)
  @ApiOperation({
    summary: 'Get order by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Order retrieved successfully',
  })
  async findById(
    @Request() req: ExpressRequest & { user: JwtAuthPayload },

    @Param('id', UuidValidationPipe)
    id: string,
  ) {
    const userId = Validators.validateUuid(req.user.userId);
    const data =
      await this.orderService.getOrderById(
        userId,
        id,
      );

    return ResponseUtil.handleResponse(
      data,
      'Order retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Patch(':id/cancel')
  @Roles(UserType.USER)
  @ApiOperation({
    summary: 'Cancel order',
  })
  @ApiResponse({
    status: 200,
    description: 'Order cancelled successfully',
  })
  async cancel(
    @Request() req: ExpressRequest & { user: JwtAuthPayload },

    @Param('id', UuidValidationPipe)
    id: string,
  ) {
    const userId = Validators.validateUuid(req.user.userId);
    const data =
      await this.orderService.cancelOrder(
        userId,
        id,
      );

    return ResponseUtil.handleResponse(
      data,
      'Order cancelled successfully',
      HttpStatus.OK,
    );
  }

  @Get(':id/tracking')
  @Roles(UserType.USER)
  @ApiOperation({
    summary: 'Get order tracking',
  })
  @ApiResponse({
    status: 200,
    description:
      'Order tracking retrieved successfully',
  })
  async getTracking(
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
    @Param('id', UuidValidationPipe)
    id: string,
  ) {
    const userId = Validators.validateUuid(req.user.userId);
    const data =
      await this.orderService.getOrderTracking(
        userId,
        id,
      );

    return ResponseUtil.handleResponse(
      data,
      'Order tracking retrieved successfully',
      HttpStatus.OK,
    );
  }
}