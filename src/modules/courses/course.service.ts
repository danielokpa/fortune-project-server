import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto, EnrollStudentDto } from './dto/course.dto';
import { JwtAuthPayload } from '../auth/auth.interface';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCourseDto, actor: JwtAuthPayload) {
    const lecturerId = actor.userId;

    return this.prisma.course.create({
      data: {
        courseCode: dto.courseCode.toUpperCase(),
        title: dto.title,
        unitLoad: dto.unitLoad,
        lecturerId,
      },
    });
  }

  async findAll(actor: JwtAuthPayload) {
    return this.prisma.course.findMany({
      where:
        actor.userType === Role.LECTURER
          ? { lecturerId: actor.userId }
          : actor.userType === Role.STUDENT
            ? { enrollments: { some: { student: { userId: actor.userId } } } }
            : undefined,
      include: {
        lecturer: {
          select: { id: true, fullName: true, email: true },
        },
        _count: { select: { enrollments: true, sessions: true } },
      },
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number, actor: JwtAuthPayload) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        lecturer: { select: { id: true, fullName: true, email: true } },
        enrollments: {
          include: {
            student: {
              include: {
                user: { select: { id: true, fullName: true, email: true } },
              },
            },
          },
        },
      },
    });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    this.assertCanAccess(course, actor);
    return course;
  }

  async enroll(courseId: number, dto: EnrollStudentDto, actor: JwtAuthPayload) {
    if (!dto.studentId && !dto.matricNumber) {
      throw new BadRequestException('studentId or matricNumber is required');
    }
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    this.assertCanManage(course.lecturerId, actor);

    const student = dto.studentId
      ? await this.prisma.student.findUnique({ where: { id: dto.studentId } })
      : await this.prisma.student.findUnique({
          where: { matricNumber: dto.matricNumber || '' },
        });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return this.prisma.enrollment.create({
      data: {
        courseId,
        studentId: student.id,
        academicSession: dto.academicSession,
      },
    });
  }

  private assertCanAccess(
    course: {
      lecturerId: number;
      enrollments: { student: { userId: number } }[];
    },
    actor: JwtAuthPayload,
  ) {
    if (actor.userType === Role.ADMIN) return;
    if (actor.userType === Role.LECTURER && actor.userId === course.lecturerId) {
      return;
    }
    if (
      actor.userType === Role.STUDENT &&
      course.enrollments.some((item) => item.student.userId === actor.userId)
    ) {
      return;
    }
    throw new ForbiddenException('You cannot access this course');
  }

  private assertCanManage(lecturerId: number, actor: JwtAuthPayload) {
    if (actor.userType === Role.ADMIN) return;
    if (actor.userType === Role.LECTURER && actor.userId === lecturerId) return;
    throw new ForbiddenException('You cannot access this course');
  }
}
