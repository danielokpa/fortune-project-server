import {
  Controller,
  Get,
  Param,
  Put,
  Delete,
  Body,
  Query,
  Patch,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
} from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserType } from '../../../enums/user-type.enum';
import { ResponseUtil } from 'src/utils/response.utils';
import { JwtAuthPayload } from '../../auth/auth.interface';
import { Validators } from 'src/utils/validators.utils';
import {
  DashboardDto,
//   UpdateImageUrlDto,
  UpdateUserDto,
  GetUsersDto,
} from '../dto/user.dto';
import { UuidValidationPipe } from 'src/shared/pipes/uuid.validator.pipe';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  @ApiResponse({ status: 404, description: 'No users not found' })
  async getAll(@Query() query: GetUsersDto) {
    const data = await this.userService.findAll(query);
    return ResponseUtil.handleResponse(
      data,
      'User info retrieved successfully',
      HttpStatus.OK,
    );
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get current user info' })
  @ApiResponse({ status: 200, description: 'User info retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getProfile(@Request() req: ExpressRequest & { user: JwtAuthPayload }) {
    const userId = Validators.validateUuid(req.user.userId);
    const data = await this.userService.fetchUser(userId);
    return ResponseUtil.handleResponse(
      data,
      'User info retrieved successfully',
      HttpStatus.OK,
    );
  }
  
  @Roles(UserType.ADMIN)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get current user info' })
  @ApiResponse({ status: 200, description: 'User info retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserById(@Param('id', UuidValidationPipe) id: string ) {
    const data = await this.userService.fetchUser(id);
    return ResponseUtil.handleResponse(
      data,
      'User retrieved successfully',
      HttpStatus.OK,
    );
  }
  
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update user details' })
  @ApiResponse({ status: 200, description: 'User details updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async updateUser(
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
    @Param('id', UuidValidationPipe) id: string, 
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userId = Validators.validateUuid(req.user.userId);
    const data = await this.userService.update(userId, updateUserDto);
    return ResponseUtil.handleResponse(
      data,
      'User updated successfully',
      HttpStatus.OK,
    );
  }
  
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete user account' })
  @ApiResponse({ status: 200, description: 'User account deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async deleteUser(
    @Request() req: ExpressRequest & { user: JwtAuthPayload },
    @Param('id', UuidValidationPipe) id: string, 
  ) {
    const adminId = Validators.validateUuid(req.user.userId);
    const data = await this.userService.deleteUser(id, adminId);
    return ResponseUtil.handleResponse(
      data,
      'User deleted successfully',
      HttpStatus.OK,
    );
  }

//   @Patch()
//   @HttpCode(HttpStatus.OK)
//   @ApiOperation({ summary: 'Update user image URL' })
//   @ApiResponse({ status: 200, description: 'Image URL updated successfully' })
//   @ApiResponse({ status: 404, description: 'User not found' })
//   async updateUser(
//     @Request() req: ExpressRequest & { user: JwtAuthPayload },
//     @Body() updateUserDto: UpdateUserDto,
//   ) {
//     const userId = Validators.validateUuid(req.user.userId);
//     const data = await this.userService.updateUser(userId, updateUserDto);
//     return ResponseUtil.handleResponse(
//       data,
//       'User updated successfully',
//       HttpStatus.OK,
//     );
//   }
}
