import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Auth } from '../auth/decorators/auth.decorator';
import { JwtAuthPayload } from '../auth/auth.interface';
import { ResponseUtil } from 'src/utils/response.utils';
import { CourseService } from './course.service';
import { CreateCourseDto, EnrollStudentDto } from './dto/course.dto';

@ApiTags('courses')
@ApiBearerAuth()
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @Auth([Role.ADMIN, Role.LECTURER])
  @ApiOperation({ summary: 'Create a course' })
  async create(
    @Body() dto: CreateCourseDto,
    @Request() req: { user: JwtAuthPayload },
  ) {
    const data = await this.courseService.create(dto, req.user);
    return ResponseUtil.handleResponse(
      data,
      'Course created',
      HttpStatus.CREATED,
    );
  }

  @Get()
  @Auth()
  @ApiOperation({ summary: 'List courses' })
  async findAll(@Request() req: { user: JwtAuthPayload }) {
    const data = await this.courseService.findAll(req.user);
    return ResponseUtil.handleResponse(data, 'Courses retrieved', HttpStatus.OK);
  }

  @Get(':id')
  @Auth()
  @ApiOperation({ summary: 'Get course details' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user: JwtAuthPayload },
  ) {
    const data = await this.courseService.findOne(id, req.user);
    return ResponseUtil.handleResponse(data, 'Course retrieved', HttpStatus.OK);
  }

  @Post(':id/enrollments')
  @Auth([Role.ADMIN, Role.LECTURER])
  @ApiOperation({ summary: 'Enroll a student in a course' })
  async enroll(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EnrollStudentDto,
    @Request() req: { user: JwtAuthPayload },
  ) {
    const data = await this.courseService.enroll(id, dto, req.user);
    return ResponseUtil.handleResponse(
      data,
      'Student enrolled',
      HttpStatus.CREATED,
    );
  }
}
