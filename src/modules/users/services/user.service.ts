import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, User } from '@prisma/client';
import { UserType } from 'src/enums/user-type.enum';
import { UserRepository } from '../repositories/user.repository';
// import { ClientDeviceService } from 'src/modules/client-devices/services/client-device.service';
import { DashboardDto, GetUsersDto, UpdateUserDto } from '../dto/user.dto';
import { CursorUtil } from 'src/utils/cursor.util';
import { UserFilters } from '../interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,

    // private readonly clientDeviceService: ClientDeviceService,

    private readonly configService: ConfigService,
  ) {}

  async fetchUser(id: string): Promise<Partial<User>> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async findAll(params: GetUsersDto) {
    const filters: UserFilters = {
      cursor: params.cursor,
      limit: params.limit,
      search: params.search,
    }
    const users = await this.userRepository.findAll(filters);
    const hasNextPage = users.length > filters.limit;

    if (hasNextPage) users.pop();
    const lastItem = users[users.length - 1];

    const nextCursor =
      hasNextPage && lastItem
        ? CursorUtil.encode({
            createdAt: lastItem.createdAt.toISOString(),
            id: lastItem.id,
          })
        : null;

    return {
      items: users,
      pagination: {
        limit: filters.limit,
        hasNextPage,
        nextCursor,
      }
    }
  }

  async updateImageUrl(userId: string, imageUrl: string): Promise<User> {
    const updatedUser = await this.userRepository.update(userId, {
      imageUrl,
    });

    if (!updatedUser) {
      throw new NotFoundException('Failed to update image URL');
    }

    return updatedUser;
  }

  async update(
    id: string,
    userData: Prisma.UserUncheckedUpdateInput,
  ): Promise<User> {
    const data = await this.userRepository.update(id, userData);
    if (!data) throw new NotFoundException('Failed to update user');
    return data;
  }

  async deleteUser(userId: string, adminId: string): Promise<boolean> {
    const admin = await this.fetchUser(adminId);
    if (!admin || admin.role !== UserType.ADMIN) throw new NotFoundException('Admin not found');

    const deleted = await this.userRepository.delete(userId);
    if (!deleted) return false;
    return true;
  }
}
