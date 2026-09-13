import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtAuthPayload } from '../auth/auth.interface';

@Injectable()
export class ReportService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  private threshold() {
    return this.configService.get<number>('app.attendanceThreshold') || 75;
  }

  async courseReport(courseId: number, actor: JwtAuthPayload) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      include: {
        sessions: true,
        enrollments: {
          include: {
            student: {
              include: {
                user: { select: { id: true, fullName: true, email: true } },
                records: { where: { session: { courseId } } },
              },
            },
          },
        },
      },
    });
    if (!course) throw new NotFoundException('Course not found');
    if (actor.userType === Role.LECTURER && course.lecturerId !== actor.userId) {
      throw new ForbiddenException('You cannot view this report');
    }
    if (actor.userType === Role.STUDENT) {
      throw new ForbiddenException('Students should use /reports/me');
    }

    const sessionCount = course.sessions.length;
    const threshold = this.threshold();

    const students = course.enrollments.map((enrollment) => {
      const present = enrollment.student.records.length;
      const percentage =
        sessionCount === 0 ? 0 : Math.round((present / sessionCount) * 1000) / 10;
      return {
        studentId: enrollment.student.id,
        matricNumber: enrollment.student.matricNumber,
        fullName: enrollment.student.user.fullName,
        email: enrollment.student.user.email,
        present,
        sessionCount,
        percentage,
        belowThreshold: percentage < threshold,
      };
    });

    return {
      course: {
        id: course.id,
        courseCode: course.courseCode,
        title: course.title,
      },
      threshold,
      sessionCount,
      students,
    };
  }

  async myReport(actor: JwtAuthPayload) {
    if (actor.userType !== Role.STUDENT) {
      throw new ForbiddenException('Only students have a personal report');
    }
    const student = await this.prisma.student.findUnique({
      where: { userId: actor.userId },
      include: {
        enrollments: { include: { course: { include: { sessions: true } } } },
        records: true,
      },
    });
    if (!student) throw new NotFoundException('Student profile not found');
    const threshold = this.threshold();

    return {
      threshold,
      courses: student.enrollments.map((enrollment) => {
        const sessionCount = enrollment.course.sessions.length;
        const present = student.records.filter((record) =>
          enrollment.course.sessions.some((session) => session.id === record.sessionId),
        ).length;
        const percentage =
          sessionCount === 0
            ? 0
            : Math.round((present / sessionCount) * 1000) / 10;
        return {
          courseId: enrollment.course.id,
          courseCode: enrollment.course.courseCode,
          title: enrollment.course.title,
          present,
          sessionCount,
          percentage,
          belowThreshold: percentage < threshold,
        };
      }),
    };
  }
}
