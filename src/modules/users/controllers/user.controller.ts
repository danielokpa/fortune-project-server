import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';
import { ResponseUtil } from 'src/utils/response.utils';
import { UserService } from '../services/user.service';
import {
  CreateLecturerDto,
  CreateStudentDto,
  GetUsersDto,
  UpdateUserDto,
} from '../dto/user.dto';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth([Role.ADMIN])
  @ApiOperation({ summary: 'List users' })
  async findAll(@Query() query: GetUsersDto) {
    const data = await this.userService.findAll(query);
    return ResponseUtil.handleResponse(data, 'Users retrieved', HttpStatus.OK);
  }

  @Get(':id')
  @Auth([Role.ADMIN])
  @ApiOperation({ summary: 'Get user by id' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.userService.fetchUser(id);
    return ResponseUtil.handleResponse(data, 'User retrieved', HttpStatus.OK);
  }

  @Post('lecturers')
  @Auth([Role.ADMIN])
  @ApiOperation({ summary: 'Create lecturer' })
  async createLecturer(@Body() dto: CreateLecturerDto) {
    const data = await this.userService.createLecturer(dto);
    return ResponseUtil.handleResponse(
      data,
      'Lecturer created',
      HttpStatus.CREATED,
    );
  }

  @Post('students')
  @Auth([Role.ADMIN])
  @ApiOperation({ summary: 'Create student' })
  async createStudent(@Body() dto: CreateStudentDto) {
    const data = await this.userService.createStudent(dto);
    return ResponseUtil.handleResponse(
      data,
      'Student created',
      HttpStatus.CREATED,
    );
  }

  @Patch(':id')
  @Auth([Role.ADMIN])
  @ApiOperation({ summary: 'Update user' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    const data = await this.userService.update(id, dto);
    return ResponseUtil.handleResponse(data, 'User updated', HttpStatus.OK);
  }
}
