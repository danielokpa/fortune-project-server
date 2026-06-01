import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Prisma,
  User,
} from '@prisma/client';
import { UserRepository } from '../repositories/user.repository';
import { ClientDeviceService } from 'src/modules/client-devices/services/client-device.service';
import {
  DashboardDto,
  UpdateUserDto,
} from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,

    private readonly clientDeviceService: ClientDeviceService,

    private readonly configService: ConfigService,
  ) {}

  async fetchUser(
    id: string,
  ): Promise<Partial<User>> {
    const user =
      await this.userRepository.fetchUser(id);

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    return user;
  }

  async findByIdentity(
    identity: string,
  ): Promise<User> {
    const user =
      await this.userRepository.findByIdentity(
        identity,
      );

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    return user;
  }

  async findByEmail(
    email: string,
  ): Promise<User | null> {
    return this.userRepository.findByEmail(
      email,
    );
  }

  async findByUsername(
    username: string,
  ): Promise<User | null> {
    return this.userRepository.findByUsername(
      username,
    );
  }

  async findAll(
    params?: Prisma.UserFindManyArgs,
  ): Promise<User[]> {
    return this.userRepository.findAll(
      params,
    );
  }

  async updateImageUrl(
    userId: string,
    imageUrl: string,
  ): Promise<User> {
    const updatedUser =
      await this.userRepository.update(
        userId,
        {
          imageUrl,
        },
      );

    if (!updatedUser) {
      throw new NotFoundException(
        'Failed to update image URL',
      );
    }

    return updatedUser;
  }

  async update(id: string, userData: Prisma.UserUncheckedUpdateInput): Promise<User> {
    const data =  await this.userRepository.update(id, userData);
    if (!data) throw new NotFoundException('Failed to update user');
    return data;
  }

  async updateUser(
    userId: string,
    userData: UpdateUserDto,
  ): Promise<User> {
    const updatedUser =
      await this.userRepository.update(
        userId,
        userData,
      );

    if (!updatedUser) {
      throw new NotFoundException(
        'Failed to update user',
      );
    }

    return updatedUser;
  }

  async deleteUser(
    userId: string,
  ): Promise<boolean> {
    return this.userRepository.delete(
      userId,
    );
  }
}
