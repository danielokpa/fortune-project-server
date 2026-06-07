import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import type { Request as ExpressRequest } from 'express';
import { CartService } from '../services/cart.service';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserType } from '../../../enums/user-type.enum';
import {
  AddCartItemDto,
  MergeCartDto,
  UpdateCartItemDto,
} from '../dto/cart.dto';
import { JwtAuthPayload } from '../../auth/auth.interface';
import { Validators } from 'src/utils/validators.utils';
import { ResponseUtil } from 'src/utils/response.utils';
import { UuidValidationPipe } from '../../../shared/pipes/uuid.validator.pipe';

@ApiTags('Cart')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserType.USER)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({
    summary: 'Get user cart',
  })
  @ApiResponse({
    status: 200,
  })
  async getCart(@Request() req: ExpressRequest & { user: JwtAuthPayload }) {
    const userId = Validators.validateUuid(req.user.userId);
    const data = await this.cartService.getCart(userId);

    return ResponseUtil.handleResponse(
      data,
      'Cart retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Post()
  @ApiOperation({
    summary: 'Add item to cart',
  })
  async addItem(
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
    @Body()
    payload: AddCartItemDto,
  ) {
    const userId = Validators.validateUuid(req.user.userId);
    const data = await this.cartService.addItem(userId, payload);

    return ResponseUtil.handleResponse(
      data,
      'Item added successfully',
      HttpStatus.CREATED,
    );
  }

  @Post('merge')
  async mergeCart(
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
    @Body()
    payload: MergeCartDto,
  ) {
    const userId = Validators.validateUuid(req.user.userId);
    const data = await this.cartService.mergeCart(userId, payload);

    return ResponseUtil.handleResponse(
      data,
      'Cart merged successfully',
      HttpStatus.OK,
    );
  }

  @Delete()
  async clearCart(@Request() req: ExpressRequest & { user: JwtAuthPayload }) {
    const userId = Validators.validateUuid(req.user.userId);
    const data = await this.cartService.clearCart(userId);

    return ResponseUtil.handleResponse(
      data,
      'Cart cleared successfully',
      HttpStatus.OK,
    );
  }

  @Patch('items/:id')
  @ApiOperation({
    summary: 'Update cart item quantity',
  })
  @ApiResponse({
    status: 200,
    description: 'Cart item updated successfully',
  })
  async updateItem(
    @Param('id', UuidValidationPipe)
    id: string,
    @Body()
    payload: UpdateCartItemDto,
  ) {
    const data = await this.cartService.updateItem(id, payload);

    return ResponseUtil.handleResponse(
      data,
      'Cart item updated successfully',
      HttpStatus.OK,
    );
  }

  @Delete('items/:id')
  async removeItem(
    @Param('id', UuidValidationPipe)
    id: string,
  ) {
    const data = await this.cartService.removeItem(id);

    return ResponseUtil.handleResponse(
      data,
      'Item removed successfully',
      HttpStatus.OK,
    );
  }
}
