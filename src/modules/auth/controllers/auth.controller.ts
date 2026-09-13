import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth.service';
import { ChangePasswordDto, LoginUserDto } from '../dto/auth.dto';
import { Auth } from '../decorators/auth.decorator';
import { JwtAuthPayload } from '../auth.interface';
import { ResponseUtil } from 'src/utils/response.utils';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email and password' })
  async login(@Body() input: LoginUserDto) {
    const data = await this.authService.login(input);
    return ResponseUtil.handleResponse(data, 'Login successful', HttpStatus.OK);
  }

  @Get('me')
  @Auth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user' })
  async me(@Request() req: { user: JwtAuthPayload }) {
    const data = await this.authService.me(req.user.userId);
    return ResponseUtil.handleResponse(data, 'Profile retrieved', HttpStatus.OK);
  }

  @Patch('change-password')
  @Auth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change password' })
  async changePassword(
    @Request() req: { user: JwtAuthPayload },
    @Body() dto: ChangePasswordDto,
  ) {
    const data = await this.authService.changePassword(req.user.userId, dto);
    return ResponseUtil.handleResponse(
      data,
      'Password updated',
      HttpStatus.OK,
    );
  }
}
