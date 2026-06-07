import {
  Controller,
  Get,
  Post,
  Query,
  Delete,
  Body,
  Param,
  Patch,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  CreateProductDto,
  ProductQueryDto,
  UpdateProductDto,
} from '../dto/product.dto';
import { ProductService } from '../services/product.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserType } from '../../../enums/user-type.enum';
import { ResponseUtil } from 'src/utils/response.utils';
import { UuidValidationPipe } from '../../../shared/pipes/uuid.validator.pipe';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({
    summary: 'Get products',
  })
  @ApiResponse({
    status: 200,
    description: 'Products retrieved successfully',
  })
  async findAll(@Query() query: ProductQueryDto) {
    const data = await this.productService.findAll(query);

    return ResponseUtil.handleResponse(
      data,
      'Products retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.USER)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create product',
  })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
  })
  async create(@Body() dto: CreateProductDto) {
    const data = await this.productService.create(dto);

    return ResponseUtil.handleResponse(
      data,
      'Product created successfully',
      HttpStatus.CREATED,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get product by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Product retrieved successfully',
  })
  async getById(
    @Param('id', UuidValidationPipe)
    id: string,
  ) {
    const data = await this.productService.findById(id);

    return ResponseUtil.handleResponse(
      data,
      'Product retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.USER)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update product',
  })
  async update(
    @Param('id', UuidValidationPipe)
    id: string,

    @Body()
    payload: UpdateProductDto,
  ) {
    const data = await this.productService.update(id, payload);

    return ResponseUtil.handleResponse(
      data,
      'Product updated successfully',
      HttpStatus.OK,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.USER)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete product',
  })
  @ApiResponse({
    status: 200,
    description: 'Product deleted successfully',
  })
  async delete(@Param('id') id: string) {
    const data = await this.productService.delete(id);

    return ResponseUtil.handleResponse(
      data,
      'Product deleted successfully',
      HttpStatus.OK,
    );
  }
}
