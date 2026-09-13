import { Injectable } from '@nestjs/common';
import { Prisma, Role, User } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { handleDatabaseError } from 'src/utils/db-error-handler.util';
import { UserFilters } from '../interfaces/user.interface';

const safeUserSelect = {
  id: true,
  fullName: true,
  email: true,
  role: true,
  createdAt: true,
  student: true,
} satisfies Prisma.UserSelect;

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number) {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
        select: safeUserSelect,
      });
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { email: email.toLowerCase() },
        include: { student: true },
      });
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findAll(filters: UserFilters) {
    const take = (filters.limit || 20) + 1;
    const cursorId = filters.cursor ? parseInt(filters.cursor, 10) : undefined;

    try {
      return await this.prisma.user.findMany({
        where: {
          role: filters.role,
          OR: filters.search
            ? [
                {
                  fullName: {
                    contains: filters.search,
                  },
                },
                {
                  email: {
                    contains: filters.search,
                  },
                },
              ]
            : undefined,
        },
        select: safeUserSelect,
        orderBy: { id: 'desc' },
        take,
        skip: cursorId ? 1 : 0,
        cursor: cursorId ? { id: cursorId } : undefined,
      });
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async createLecturer(data: {
    fullName: string;
    email: string;
    passwordHash: string;
  }) {
    try {
      return await this.prisma.user.create({
        data: {
          fullName: data.fullName,
          email: data.email.toLowerCase(),
          passwordHash: data.passwordHash,
          role: Role.LECTURER,
        },
        select: safeUserSelect,
      });
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async createStudent(data: {
    fullName: string;
    email: string;
    passwordHash: string;
    matricNumber: string;
    department: string;
    pinHash?: string;
  }) {
    try {
      return await this.prisma.user.create({
        data: {
          fullName: data.fullName,
          email: data.email.toLowerCase(),
          passwordHash: data.passwordHash,
          role: Role.STUDENT,
          student: {
            create: {
              matricNumber: data.matricNumber,
              department: data.department,
              pinHash: data.pinHash,
            },
          },
        },
        select: safeUserSelect,
      });
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
        select: safeUserSelect,
      });
    } catch (error) {
      handleDatabaseError(error);
    }
  }
}
