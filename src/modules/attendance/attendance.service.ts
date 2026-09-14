import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Role,
  SessionStatus,
  VerificationMethod,
} from '@prisma/client';
import { randomBytes } from 'crypto';
import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
  type AuthenticationResponseJSON,
  type RegistrationResponseJSON,
} from '@simplewebauthn/server';
import { PrismaService } from 'src/prisma/prisma.service';
import { PasswordUtil } from 'src/utils/password.util';
import { JwtAuthPayload } from '../auth/auth.interface';
import {
  MarkPinDto,
  OpenSessionDto,
  WebAuthnVerifyDto,
} from './dto/attendance.dto';

const MAX_BIOMETRIC_FAILS = 3;

@Injectable()
export class AttendanceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  private rpID() {
    return this.configService.get<string>('app.webauthnRpId') || 'localhost';
  }

  private rpName() {
    return (
      this.configService.get<string>('app.webauthnRpName') ||
      'UNICAL QR Attendance'
    );
  }

  private origin() {
    return (
      this.configService.get<string>('app.webauthnOrigin') ||
      'http://localhost:5173'
    );
  }

  async openSession(dto: OpenSessionDto, actor: JwtAuthPayload) {
    const course = await this.prisma.course.findUnique({
      where: { id: dto.courseId },
    });
    if (!course) throw new NotFoundException('Course not found');
    this.assertLecturer(course.lecturerId, actor);

    const ttl = dto.ttlSeconds || 120;
    const session = await this.prisma.attendanceSession.create({
      data: {
        courseId: course.id,
        lecturerId: actor.userId,
        qrToken: this.newQrToken(),
        tokenExpiry: new Date(Date.now() + ttl * 1000),
        status: SessionStatus.OPEN,
      },
    });

    await this.audit(actor.userId, 'OPEN_SESSION', 'AttendanceSession', {
      sessionId: session.id,
      courseId: course.id,
    });
    return session;
  }

  async refreshQr(sessionId: number, actor: JwtAuthPayload, ttlSeconds = 120) {
    const session = await this.getSessionOrThrow(sessionId);
    this.assertLecturer(session.lecturerId, actor);
    if (session.status !== SessionStatus.OPEN) {
      throw new BadRequestException('Session is closed');
    }

    return this.prisma.attendanceSession.update({
      where: { id: sessionId },
      data: {
        qrToken: this.newQrToken(),
        tokenExpiry: new Date(Date.now() + ttlSeconds * 1000),
      },
    });
  }

  async closeSession(sessionId: number, actor: JwtAuthPayload) {
    const session = await this.getSessionOrThrow(sessionId);
    this.assertLecturer(session.lecturerId, actor);
    const updated = await this.prisma.attendanceSession.update({
      where: { id: sessionId },
      data: { status: SessionStatus.CLOSED },
    });
    await this.audit(actor.userId, 'CLOSE_SESSION', 'AttendanceSession', {
      sessionId,
    });
    return updated;
  }

  async listByCourse(courseId: number, actor: JwtAuthPayload) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });
    if (!course) throw new NotFoundException('Course not found');
    if (
      actor.userType === Role.LECTURER &&
      course.lecturerId !== actor.userId
    ) {
      throw new ForbiddenException('You cannot view these sessions');
    }

    return this.prisma.attendanceSession.findMany({
      where: { courseId },
      include: { _count: { select: { records: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getSession(sessionId: number, actor: JwtAuthPayload) {
    const session = await this.prisma.attendanceSession.findUnique({
      where: { id: sessionId },
      include: {
        records: {
          include: {
            student: {
              include: {
                user: { select: { fullName: true, email: true } },
              },
            },
          },
        },
        course: true,
      },
    });
    if (!session) throw new NotFoundException('Session not found');
    this.assertLecturer(session.lecturerId, actor);
    return session;
  }

  async markWithPin(dto: MarkPinDto, actor: JwtAuthPayload) {
    const { session, student } = await this.prepareMarking(dto.qrToken, actor);
    if (!student.pinHash) {
      throw new BadRequestException('No PIN is registered for this student');
    }
    const ok = await PasswordUtil.verifyPassword(dto.pin, student.pinHash);
    if (!ok) {
      throw new UnauthorizedException('Invalid PIN');
    }
    return this.createRecord(
      session.id,
      student.id,
      actor.userId,
      VerificationMethod.QR_PIN,
    );
  }

  async registrationOptions(actor: JwtAuthPayload) {
    const student = await this.requireStudent(actor);
    const existing = await this.prisma.webAuthnCredential.findMany({
      where: { studentId: student.id },
    });

    const options = await generateRegistrationOptions({
      rpName: this.rpName(),
      rpID: this.rpID(),
      userName: student.matricNumber,
      userDisplayName: student.user.fullName,
      userID: new TextEncoder().encode(String(student.id)),
      excludeCredentials: existing.map((cred) => ({
        id: cred.credentialId,
        type: 'public-key' as const,
      })),
      authenticatorSelection: {
        authenticatorAttachment: 'platform',
        userVerification: 'required',
      },
    });

    await this.prisma.webAuthnChallenge.create({
      data: {
        userId: actor.userId,
        type: 'registration',
        challenge: options.challenge,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    });
    return options;
  }

  async verifyRegistration(
    credential: RegistrationResponseJSON,
    actor: JwtAuthPayload,
  ) {
    const student = await this.requireStudent(actor);
    const challenge = await this.takeChallenge(actor.userId, 'registration');
    const verification = await verifyRegistrationResponse({
      response: credential,
      expectedChallenge: challenge.challenge,
      expectedOrigin: this.origin(),
      expectedRPID: this.rpID(),
    });

    if (!verification.verified || !verification.registrationInfo) {
      throw new BadRequestException('Fingerprint registration failed');
    }

    const info = verification.registrationInfo;
    await this.prisma.webAuthnCredential.create({
      data: {
        credentialId: info.credential.id,
        studentId: student.id,
        publicKey: Buffer.from(info.credential.publicKey).toString('base64url'),
        signCount: info.credential.counter,
        deviceInfo: info.credentialDeviceType,
      },
    });
    return { verified: true };
  }

  async authenticationOptions(qrToken: string, actor: JwtAuthPayload) {
    const { session, student } = await this.prepareMarking(qrToken, actor);
    await this.assertBiometricAllowed(session.id, student.id);

    const credentials = await this.prisma.webAuthnCredential.findMany({
      where: { studentId: student.id },
    });
    if (!credentials.length) {
      throw new BadRequestException(
        'No fingerprint enrolled. Register a credential first.',
      );
    }

    const options = await generateAuthenticationOptions({
      rpID: this.rpID(),
      userVerification: 'required',
      allowCredentials: credentials.map((cred) => ({
        id: cred.credentialId,
        type: 'public-key' as const,
      })),
    });

    await this.prisma.webAuthnChallenge.create({
      data: {
        userId: actor.userId,
        type: 'authentication',
        challenge: options.challenge,
        sessionId: session.id,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    });
    return options;
  }

  async verifyAuthentication(dto: WebAuthnVerifyDto, actor: JwtAuthPayload) {
    const { session, student } = await this.prepareMarking(dto.qrToken, actor);
    await this.assertBiometricAllowed(session.id, student.id);

    const challenge = await this.takeChallenge(actor.userId, 'authentication');
    const response = dto.credential as unknown as AuthenticationResponseJSON;
    const credentialId =
      typeof response.id === 'string' ? response.id : '';
    const stored = await this.prisma.webAuthnCredential.findUnique({
      where: { credentialId },
    });
    if (!stored || stored.studentId !== student.id) {
      await this.bumpBiometricFail(session.id, student.id, actor.userId);
      throw new UnauthorizedException('Unknown fingerprint credential');
    }

    try {
      const verification = await verifyAuthenticationResponse({
        response,
        expectedChallenge: challenge.challenge,
        expectedOrigin: this.origin(),
        expectedRPID: this.rpID(),
        credential: {
          id: stored.credentialId,
          publicKey: Buffer.from(stored.publicKey, 'base64url'),
          counter: stored.signCount,
        },
      });
      if (!verification.verified) {
        throw new Error('not verified');
      }
      await this.prisma.webAuthnCredential.update({
        where: { credentialId: stored.credentialId },
        data: {
          signCount: verification.authenticationInfo.newCounter,
        },
      });
    } catch {
      await this.bumpBiometricFail(session.id, student.id, actor.userId);
      throw new UnauthorizedException(
        'Fingerprint verification failed. Use PIN after 3 failures.',
      );
    }

    return this.createRecord(
      session.id,
      student.id,
      actor.userId,
      VerificationMethod.QR_FINGERPRINT,
    );
  }

  private async prepareMarking(qrToken: string, actor: JwtAuthPayload) {
    const student = await this.requireStudent(actor);
    const session = await this.prisma.attendanceSession.findUnique({
      where: { qrToken },
      include: { course: true },
    });
    if (!session) throw new NotFoundException('Invalid QR code');
    if (session.status !== SessionStatus.OPEN) {
      throw new BadRequestException('Attendance session is closed');
    }
    if (session.tokenExpiry.getTime() < Date.now()) {
      throw new BadRequestException('QR code has expired');
    }

    const enrolled = await this.prisma.enrollment.findFirst({
      where: { courseId: session.courseId, studentId: student.id },
    });
    if (!enrolled) {
      throw new ForbiddenException('You are not enrolled in this course');
    }

    const existing = await this.prisma.attendanceRecord.findUnique({
      where: {
        sessionId_studentId: {
          sessionId: session.id,
          studentId: student.id,
        },
      },
    });
    if (existing) {
      throw new BadRequestException('Attendance already marked');
    }

    return { session, student };
  }

  private async createRecord(
    sessionId: number,
    studentId: number,
    actorId: number,
    method: VerificationMethod,
  ) {
    const record = await this.prisma.attendanceRecord.create({
      data: {
        sessionId,
        studentId,
        verificationMethod: method,
      },
    });
    await this.audit(actorId, 'MARK_ATTENDANCE', 'AttendanceRecord', {
      sessionId,
      studentId,
      method,
    });
    return record;
  }

  private async requireStudent(actor: JwtAuthPayload) {
    if (actor.userType !== Role.STUDENT) {
      throw new ForbiddenException('Only students can mark attendance');
    }
    const student = await this.prisma.student.findUnique({
      where: { userId: actor.userId },
      include: { user: true },
    });
    if (!student) throw new NotFoundException('Student profile not found');
    return student;
  }

  private async takeChallenge(userId: number, type: string) {
    // 1. Fetch the latest challenge for this user regardless of its time status
    const challenge = await this.prisma.webAuthnChallenge.findFirst({
      where: { userId, type },
      orderBy: { id: 'desc' }, // Order by id or createdAt (whichever is your primary identifier)
    });

    // 2. If no challenge exists at all in the database
    if (!challenge) {
      throw new BadRequestException('WebAuthn challenge not found. Please retry.');
    }

    // 3. Add a 60-second clock-drift grace period to handle server-database time differences
    const now = new Date();
    const gracePeriodMs = 60 * 1000; // 1 minute grace period
    const absoluteExpiry = new Date(challenge.expiresAt.getTime() + gracePeriodMs);

    if (absoluteExpiry < now) {
      throw new BadRequestException('WebAuthn challenge expired');
    }

    // 4. Delete the challenge right after validation to prevent replay attacks
    await this.prisma.webAuthnChallenge.delete({ where: { id: challenge.id } });
    
    return challenge;
  }

  private async assertBiometricAllowed(sessionId: number, studentId: number) {
    const attempt = await this.prisma.biometricAttempt.findUnique({
      where: { sessionId_studentId: { sessionId, studentId } },
    });
    if (attempt && attempt.failCount >= MAX_BIOMETRIC_FAILS) {
      throw new ForbiddenException(
        'Fingerprint locked for this session. Use PIN instead.',
      );
    }
  }

  private async bumpBiometricFail(
    sessionId: number,
    studentId: number,
    actorId: number,
  ) {
    const attempt = await this.prisma.biometricAttempt.upsert({
      where: { sessionId_studentId: { sessionId, studentId } },
      create: { sessionId, studentId, failCount: 1 },
      update: { failCount: { increment: 1 } },
    });
    if (attempt.failCount >= MAX_BIOMETRIC_FAILS) {
      await this.audit(actorId, 'BIOMETRIC_LOCK', 'BiometricAttempt', {
        sessionId,
        studentId,
      });
    }
  }

  private async getSessionOrThrow(id: number) {
    const session = await this.prisma.attendanceSession.findUnique({
      where: { id },
    });
    if (!session) throw new NotFoundException('Session not found');
    return session;
  }

  private assertLecturer(lecturerId: number, actor: JwtAuthPayload) {
    if (actor.userType === Role.ADMIN) return;
    if (actor.userType === Role.LECTURER && actor.userId === lecturerId) return;
    throw new ForbiddenException('Only the course lecturer can manage sessions');
  }

  private newQrToken() {
    return randomBytes(32).toString('hex');
  }

  private async audit(
    actorId: number,
    action: string,
    entity: string,
    metadata: unknown,
  ) {
    await this.prisma.auditLog.create({
      data: {
        actorId,
        action,
        entity,
        metadata: JSON.stringify(metadata),
      },
    });
  }
}
