import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import type {
  AuthenticationResponseJSON,
  RegistrationResponseJSON,
} from '@simplewebauthn/server';
import { Auth } from '../auth/decorators/auth.decorator';
import { JwtAuthPayload } from '../auth/auth.interface';
import { ResponseUtil } from 'src/utils/response.utils';
import { AttendanceService } from './attendance.service';
import {
  MarkPinDto,
  OpenSessionDto,
  QrTokenDto,
  WebAuthnVerifyDto,
} from './dto/attendance.dto';

@ApiTags('attendance')
@ApiBearerAuth()
@Controller()
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('sessions')
  @Auth([Role.ADMIN, Role.LECTURER])
  @ApiOperation({ summary: 'Open an attendance session and issue a QR token' })
  async open(
    @Body() dto: OpenSessionDto,
    @Request() req: { user: JwtAuthPayload },
  ) {
    const data = await this.attendanceService.openSession(dto, req.user);
    return ResponseUtil.handleResponse(
      data,
      'Session opened',
      HttpStatus.CREATED,
    );
  }

  @Post('sessions/:id/refresh-qr')
  @Auth([Role.ADMIN, Role.LECTURER])
  @ApiOperation({ summary: 'Rotate the session QR token' })
  async refresh(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user: JwtAuthPayload },
  ) {
    const data = await this.attendanceService.refreshQr(id, req.user);
    return ResponseUtil.handleResponse(data, 'QR refreshed', HttpStatus.OK);
  }

  @Post('sessions/:id/close')
  @Auth([Role.ADMIN, Role.LECTURER])
  @ApiOperation({ summary: 'Close an attendance session' })
  async close(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user: JwtAuthPayload },
  ) {
    const data = await this.attendanceService.closeSession(id, req.user);
    return ResponseUtil.handleResponse(data, 'Session closed', HttpStatus.OK);
  }

  @Get('sessions/:id')
  @Auth([Role.ADMIN, Role.LECTURER])
  @ApiOperation({ summary: 'Get session with attendance records' })
  async getSession(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user: JwtAuthPayload },
  ) {
    const data = await this.attendanceService.getSession(id, req.user);
    return ResponseUtil.handleResponse(data, 'Session retrieved', HttpStatus.OK);
  }

  @Get('courses/:id/sessions')
  @Auth([Role.ADMIN, Role.LECTURER])
  @ApiOperation({ summary: 'List sessions for a course' })
  async listByCourse(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user: JwtAuthPayload },
  ) {
    const data = await this.attendanceService.listByCourse(id, req.user);
    return ResponseUtil.handleResponse(
      data,
      'Sessions retrieved',
      HttpStatus.OK,
    );
  }

  @Post('attendance/mark/pin')
  @Auth([Role.STUDENT])
  @ApiOperation({ summary: 'Mark attendance with QR token + PIN' })
  async markPin(
    @Body() dto: MarkPinDto,
    @Request() req: { user: JwtAuthPayload },
  ) {
    const data = await this.attendanceService.markWithPin(dto, req.user);
    return ResponseUtil.handleResponse(
      data,
      'Attendance marked',
      HttpStatus.CREATED,
    );
  }

  @Post('webauthn/register/options')
  @Auth([Role.STUDENT])
  @ApiOperation({ summary: 'Get WebAuthn registration options' })
  async registerOptions(@Request() req: { user: JwtAuthPayload }) {
    const data = await this.attendanceService.registrationOptions(req.user);
    return ResponseUtil.handleResponse(data, 'Options generated', HttpStatus.OK);
  }

  @Post('webauthn/register/verify')
  @Auth([Role.STUDENT])
  @ApiOperation({ summary: 'Verify WebAuthn registration' })
  async registerVerify(
    @Body() body: { credential: RegistrationResponseJSON },
    @Request() req: { user: JwtAuthPayload },
  ) {
    const data = await this.attendanceService.verifyRegistration(
      body.credential,
      req.user,
    );
    return ResponseUtil.handleResponse(
      data,
      'Fingerprint registered',
      HttpStatus.CREATED,
    );
  }

  @Post('attendance/mark/fingerprint/options')
  @Auth([Role.STUDENT])
  @ApiOperation({ summary: 'Get WebAuthn auth options for a QR session' })
  async authOptions(
    @Body() dto: QrTokenDto,
    @Request() req: { user: JwtAuthPayload },
  ) {
    const data = await this.attendanceService.authenticationOptions(
      dto.qrToken,
      req.user,
    );
    return ResponseUtil.handleResponse(data, 'Options generated', HttpStatus.OK);
  }

  @Post('attendance/mark/fingerprint/verify')
  @Auth([Role.STUDENT])
  @ApiOperation({ summary: 'Verify fingerprint and mark attendance' })
  async authVerify(
    @Body() dto: WebAuthnVerifyDto,
    @Request() req: { user: JwtAuthPayload },
  ) {
    const data = await this.attendanceService.verifyAuthentication(
      dto,
      req.user,
    );
    return ResponseUtil.handleResponse(
      data,
      'Attendance marked',
      HttpStatus.CREATED,
    );
  }
}
