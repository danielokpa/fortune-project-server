import { Injectable, NotFoundException } from '@nestjs/common';
import { PasswordUtil } from 'src/utils/password.util';
import { UserRepository } from '../repositories/user.repository';
import {
  CreateLecturerDto,
  CreateStudentDto,
  GetUsersDto,
  UpdateUserDto,
} from '../dto/user.dto';
import { UserFilters } from '../interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async fetchUser(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async findAll(params: GetUsersDto) {
    const filters: UserFilters = {
      cursor: params.cursor,
      limit: params.limit || 20,
      search: params.search,
      role: params.role,
    };
    const users = (await this.userRepository.findAll(filters)) || [];
    const hasNextPage = users.length > filters.limit;
    if (hasNextPage) users.pop();
    const lastItem = users[users.length - 1];

    return {
      items: users,
      pagination: {
        limit: filters.limit,
        hasNextPage,
        nextCursor: hasNextPage && lastItem ? String(lastItem.id) : null,
      },
    };
  }

  async createLecturer(dto: CreateLecturerDto) {
    return this.userRepository.createLecturer({
      fullName: dto.fullName,
      email: dto.email,
      passwordHash: await PasswordUtil.hashPassword(dto.password),
    });
  }

  async createStudent(dto: CreateStudentDto) {
    return this.userRepository.createStudent({
      fullName: dto.fullName,
      email: dto.email,
      passwordHash: await PasswordUtil.hashPassword(dto.password),
      matricNumber: dto.matricNumber,
      department: dto.department,
      pinHash: dto.pin
        ? await PasswordUtil.hashPassword(dto.pin)
        : undefined,
    });
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.fetchUser(id);
    return this.userRepository.update(id, dto);
  }

  async updatePassword(id: number, passwordHash: string) {
    return this.userRepository.update(id, { passwordHash });
  }
}
