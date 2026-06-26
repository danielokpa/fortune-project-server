// import {
//   Body,
//   Controller,
//   Get,
//   HttpStatus,
//   Post,
//   Query,
//   UseGuards,
// } from '@nestjs/common';

// import {
//   ApiBearerAuth,
//   ApiOperation,
//   ApiResponse,
//   ApiTags,
// } from '@nestjs/swagger';

// import { CategoryService } from '../services/category.service';

// import { CreateCategoryDto, GetCategoriesDto } from '../dto/category.dto';

// import { AuthGuard } from '../../auth/guards/auth.guard';

// import { Roles } from '../../auth/decorators/roles.decorator';

// import { UserType } from '../../../enums/user-type.enum';

// import { ResponseUtil } from 'src/utils/response.utils';

// @ApiTags('Categories')
// @Controller('categories')
// export class CategoryController {
//   constructor(private readonly categoryService: CategoryService) {}

//   @Get()
//   @ApiOperation({
//     summary: 'Get all categories',
//   })
//   @ApiResponse({
//     status: 200,
//     description: 'Categories retrieved successfully',
//   })
//   async findAll(
//     @Query()
//     query: GetCategoriesDto,
//   ) {
//     const data = await this.categoryService.findAll(query);

//     return ResponseUtil.handleResponse(
//       data,
//       'Categories retrieved successfully',
//       HttpStatus.OK,
//     );
//   }

//   @Post()
//   @UseGuards(AuthGuard)
//   @Roles(UserType.ADMIN, UserType.USER)
//   @ApiBearerAuth()
//   @ApiOperation({
//     summary: 'Create category',
//   })
//   @ApiResponse({
//     status: 201,
//     description: 'Category created successfully',
//   })
//   async create(
//     @Body()
//     categoryData: CreateCategoryDto,
//   ) {
//     const data = await this.categoryService.create(categoryData);

//     return ResponseUtil.handleResponse(
//       data,
//       'Category created successfully',
//       HttpStatus.CREATED,
//     );
//   }
// }
