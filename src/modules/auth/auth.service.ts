import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordUtil } from 'src/utils/password.util';
import { UserRepository } from '../users/repositories/user.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangePasswordDto, LoginUserDto } from './dto/auth.dto';
import { JwtAuthPayload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async login(input: LoginUserDto) {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const valid = await PasswordUtil.verifyPassword(
      input.password,
      user.passwordHash,
    );
    if (!valid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload: JwtAuthPayload = {
      sub: user.id,
      userId: user.id,
      email: user.email,
      userType: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    await this.prisma.auditLog.create({
      data: {
        actorId: user.id,
        action: 'LOGIN',
        entity: 'User',
        metadata: JSON.stringify({ email: user.email }),
      },
    });

    const { passwordHash: _, ...safeUser } = user;
    return { accessToken, user: safeUser };
  }

  async me(userId: number) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async changePassword(userId: number, dto: ChangePasswordDto) {
    const user = await this.userRepository.findByEmail(
      (await this.me(userId)).email,
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const valid = await PasswordUtil.verifyPassword(
      dto.currentPassword,
      user.passwordHash,
    );
    if (!valid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    await this.userRepository.update(userId, {
      passwordHash: await PasswordUtil.hashPassword(dto.newPassword),
    });

    return { updated: true };
  }
}
