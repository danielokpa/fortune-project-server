import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { UserType } from 'src/enums';
import { handleDatabaseError } from 'src/utils/db-error-handler.util';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

//   async findByIdentity(identity: string): Promise<User | null> {
//     try {
//       const user = await this.prisma.user.findFirst({
//         where: {
//           OR: [
//             { email: identity },
//             { username: identity },
//             { phoneNo: identity },
//           ],
//         },
//       });

//       return user;
//     } catch (error) {
//       handleDatabaseError(error);
//     }
//   }

  async findById(id: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        // omit: {
        //   password: true
        // },
      });

      return user;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async fetchUser(id: string): Promise<Partial<User> | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },

        omit: {
          password: true,
        },
      });

      return user;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async fetchAndUpdateUser(
    id: string,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        throw new NotFoundException('User not found');
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data,
      });

      return updatedUser;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

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

//   async findByUsername(username: string): Promise<User | null> {
//     try {
//       const user = await this.prisma.user.findUnique({
//         where: { username },
//       });

//       return user;
//     } catch (error) {
//       handleDatabaseError(error);
//     }
//   }

  async findByPhone(phoneNo: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { phoneNo },
      });

      return user;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findByEmailAndRole(
    email: string,
    userType: UserType,
  ): Promise<User | null> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email,
          role: userType,
        },
      });

      return user;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

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

//   async findWithCountry(
//     email: string,
//     userType: UserType,
//   ): Promise<User | null> {
//     try {
//       const user = await this.prisma.user.findFirst({
//         where: {
//           email,
//           userType,
//         },

//         include: {
//           country: true,
//         },
//       });

//       return user;
//     } catch (error) {
//       handleDatabaseError(error);
//     }
//   }

  async findAll(params?: Prisma.UserFindManyArgs): Promise<User[]> {
    try {
      const users = await this.prisma.user.findMany(params);

      if (!users) {
        throw new NotFoundException('Users not found');
      }

      return users;
    } catch (error) {
      handleDatabaseError(error);
    }
  }
}
