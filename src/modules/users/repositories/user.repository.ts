import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { CursorUtil } from 'src/utils/cursor.util';
import { UserType } from 'src/enums';
import { UserFilters, SafeUser } from '../interfaces/user.interface';
import { handleDatabaseError } from 'src/utils/db-error-handler.util';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Partial<User> | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        omit: {
          password: true
        },
      });

      return user;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  // async fetchUser(id: string): Promise<Partial<User> | null> {
  //   try {
  //     const user = await this.prisma.user.findUnique({
  //       where: { id },

  //       omit: {
  //         password: true,
  //       },
  //     });

  //     return user;
  //   } catch (error) {
  //     handleDatabaseError(error);
  //   }
  // }

  // async fetchAndUpdateUser(
  //   id: string,
  //   data: Prisma.UserUpdateInput,
  // ): Promise<User> {
  //   try {
  //     const existingUser = await this.prisma.user.findUnique({
  //       where: { id },
  //     });

  //     if (!existingUser) {
  //       throw new NotFoundException('User not found');
  //     }

  //     const updatedUser = await this.prisma.user.update({
  //       where: { id },
  //       data,
  //     });

  //     return updatedUser;
  //   } catch (error) {
  //     handleDatabaseError(error);
  //   }
  // }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      return user;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  // async findByPhone(phoneNo: string): Promise<User | null> {
  //   try {
  //     const user = await this.prisma.user.findFirst({
  //       where: { phone: phoneNo },
  //     });

  //     return user;
  //   } catch (error) {
  //     handleDatabaseError(error);
  //   }
  // }

  // async findByEmailAndRole(
  //   email: string,
  //   userType: UserType,
  // ): Promise<User | null> {
  //   try {
  //     const user = await this.prisma.user.findFirst({
  //       where: {
  //         email,
  //         role: userType,
  //       },
  //     });

  //     return user;
  //   } catch (error) {
  //     handleDatabaseError(error);
  //   }
  // }

  async create(userData: Prisma.UserUncheckedCreateInput): Promise<User> {
    try {
      const user = await this.prisma.user.create({
        data: userData,
      });

      if (!user) {
        throw new InternalServerErrorException('Failed to create user');
      }

      return user;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async update(id: string, userData: Prisma.UserUpdateInput): Promise<User> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        throw new NotFoundException('User not found');
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: userData,
      });

      return updatedUser;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        throw new NotFoundException('User not found');
      }

      await this.prisma.user.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findAll(filters: UserFilters): Promise<SafeUser[]> {
    try {
      const where = this.buildWhereClause(filters)
      const users = await this.prisma.user.findMany({
        where,
        omit: {
          password: true,
        },

        take: filters.limit + 1,

        orderBy: [
          {
            createdAt: 'desc',
          },
          {
            id: 'desc',
          },
        ]
      });

      if (!users) {
        throw new NotFoundException('Users not found');
      }

      return users;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  private buildWhereClause(
    filters: UserFilters,
  ): Prisma.UserWhereInput {
    const andConditions: Prisma.UserWhereInput[] = [];

    /**
     * ---------------------------------------------------------
     * Search
     * ---------------------------------------------------------
     */

    if (filters.search?.trim()) {
      const keyword = filters.search.trim();

      andConditions.push({
        OR: [
          {
            firstName: {
              contains: keyword,
              mode: 'insensitive',
            },

          },
          {
            lastName: {
              contains: keyword,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: keyword,
              mode: 'insensitive',
            },
          },
          {
            phoneNo: {
              contains: keyword,
              mode: 'insensitive',
            },
          },
        ],
      });
    }

    /**
     * ---------------------------------------------------------
     * Cursor Pagination (Keyset Pagination)
     * ---------------------------------------------------------
     */

    if (filters.cursor) {
      const cursor = CursorUtil.decode(filters.cursor);

      const cursorDate = cursor?.createdAt ? new Date(cursor.createdAt) : undefined;

      andConditions.push({
        OR: [
          {
            createdAt: {
              lt: cursorDate,
            },
          },
          {
            AND: [
              {
                createdAt: cursorDate,
              },
              {
                id: {
                  lt: cursor?.id,
                },
              },
            ],
          },
        ],
      });
    }

    return andConditions.length > 0 ? { AND: andConditions } : {};
  }
}
