import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import * as jose from 'jose';
import moment from 'moment';
import { LoginType } from 'src/enums/login-type.enum';
import { TokenSubject } from 'src/enums/token.enum';
import { UserType } from 'src/enums/user-type.enum';
import { IUserLoginData } from 'src/shared/interfaces/auth.interface';
import { EmailEventService } from 'src/services/mail/email-event.service';
import { TokenService } from 'src/services/token/token.service';
import { PasswordUtil } from 'src/utils/password.util';
import { Validators } from 'src/utils/validators.utils';
import { Utils } from 'src/utils/utils';
import { JwtAuthPayload } from '../auth.interface';
import {
  AppleOAuthLoginDto,
  AppleOAuthSignUpDto,
  GoogleOAuthLoginDto,
  GoogleOAuthSignUpDto,
} from '../dto/oauth.dto';
import { CountryService } from '../../countries/services/country.service';
import { User } from '../../users/entities/user.entity';
import { UserRepository } from '../../users/repositories/user.repository';
import { UserEventService } from '../../users/services/user-event.service';
import { ClientDeviceService } from '../../client-devices/services/client-device.service';

type OAuthJwtPayload = jose.JWTPayload;

@Injectable()
export class OAuthService {
  // private readonly googleJwks = jose.createRemoteJWKSet(
  //   new URL('https://www.googleapis.com/oauth2/v3/certs'),
  // );

  // private readonly appleJwks = jose.createRemoteJWKSet(
  //   new URL('https://appleid.apple.com/auth/keys'),
  // );

  // constructor(
  //   private readonly userRepository: UserRepository,
  //   private readonly countryService: CountryService,
  //   private readonly tokenService: TokenService,
  //   private readonly emailEventService: EmailEventService,
  //   private readonly userEventService: UserEventService,
  //   private readonly configService: ConfigService,
  //   private readonly clientDeviceService: ClientDeviceService,
  // ) {}

  // async signUpWithGoogle(dto: GoogleOAuthSignUpDto) {
  //   const payload = await this.verifyGoogleJwt(dto.idToken);

  //   const tokenEmail =
  //     typeof payload.email === 'string' ? payload.email : undefined;
  //   if (!tokenEmail) {
  //     throw new BadRequestException('Google token did not include an email');
  //   }

  //   const normalizedTokenEmail = Validators.validateEmail(tokenEmail);
  //   const normalizedDtoEmail = Validators.validateEmail(dto.email);
  //   if (normalizedDtoEmail.toLowerCase() !== normalizedTokenEmail.toLowerCase()) {
  //     throw new BadRequestException('Email does not match Google account');
  //   }

  //   const fullName =
  //     dto.fullName ||
  //     (typeof payload.name === 'string' ? payload.name : '') ||
  //     normalizedTokenEmail.split('@')[0];

  //   const imageUrl =
  //     typeof payload.picture === 'string' ? payload.picture : undefined;

  //   return this.completeOAuthSignUp({
  //     loginType: LoginType.GOOGLE,
  //     email: normalizedTokenEmail,
  //     fullName,
  //     countryId: dto.country,
  //     phoneNo: dto.phoneNo,
  //     otpPhone: dto.otpPhone,
  //     referalCode: dto.referalCode,
  //     secretForPasswordField: dto.idToken,
  //     imageUrl,
  //   });
  // }

  // async signUpWithApple(dto: AppleOAuthSignUpDto) {
  //   const payload = await this.verifyAppleJwt(dto.identityToken);

  //   const tokenEmail =
  //     typeof payload.email === 'string' ? payload.email : undefined;
  //   const resolvedEmailRaw = tokenEmail ?? dto.email;
  //   if (!resolvedEmailRaw) {
  //     throw new BadRequestException(
  //       'Apple sign-in did not provide an email; pass email on first sign-up',
  //     );
  //   }

  //   const email = Validators.validateEmail(resolvedEmailRaw);

  //   if (dto.email) {
  //     const dtoEmail = Validators.validateEmail(dto.email);
  //     if (dtoEmail.toLowerCase() !== email.toLowerCase()) {
  //       throw new BadRequestException('Email does not match Apple account');
  //     }
  //   }

  //   return this.completeOAuthSignUp({
  //     loginType: LoginType.APPLE,
  //     email,
  //     fullName: dto.fullName,
  //     countryId: dto.country,
  //     phoneNo: dto.phoneNo,
  //     otpPhone: dto.otpPhone,
  //     referalCode: dto.referalCode,
  //     secretForPasswordField: dto.identityToken,
  //   });
  // }

  // /**
  //  * Sign-in via Google: JWKS verifies the ID token; user must exist with loginType GOOGLE.
  //  * Provider JWT verification is the credential (ID tokens rotate; stored password hash may not match a new token).
  //  */
  // async loginWithGoogle(
  //   dto: GoogleOAuthLoginDto,
  //   req: Request,
  // ): Promise<IUserLoginData> {
  //   const payload = await this.verifyGoogleJwt(dto.idToken);
  //   const tokenEmail =
  //     typeof payload.email === 'string' ? payload.email : undefined;
  //   if (!tokenEmail) {
  //     throw new BadRequestException('Google token did not include an email');
  //   }
  //   const email = Validators.validateEmail(tokenEmail);
  //   const user = await this.userRepository.findByEmail(email);
  //   if (!user) {
  //     throw new UnauthorizedException('Invalid Credentials');
  //   }
  //   if (user.loginType !== LoginType.GOOGLE) {
  //     throw new BadRequestException('login with associated email provider');
  //   }
  //   return this.finishOAuthLogin(user, req);
  // }

  // /**
  //  * Sign-in via Apple: JWKS verifies the identity token; user must exist with loginType APPLE.
  //  */
  // async loginWithApple(
  //   dto: AppleOAuthLoginDto,
  //   req: Request,
  // ): Promise<IUserLoginData> {
  //   const payload = await this.verifyAppleJwt(dto.identityToken);
  //   const tokenEmail =
  //     typeof payload.email === 'string' ? payload.email : undefined;
  //   const resolvedEmailRaw = tokenEmail ?? dto.email;
  //   if (!resolvedEmailRaw) {
  //     throw new BadRequestException(
  //       'Apple sign-in did not provide an email; sign in with email used at registration',
  //     );
  //   }
  //   const email = Validators.validateEmail(resolvedEmailRaw);
  //   if (dto.email) {
  //     const dtoEmail = Validators.validateEmail(dto.email);
  //     if (dtoEmail.toLowerCase() !== email.toLowerCase()) {
  //       throw new BadRequestException('Email does not match Apple account');
  //     }
  //   }

  //   const user = await this.userRepository.findByEmail(email);
  //   if (!user) {
  //     throw new UnauthorizedException('Invalid Credentials');
  //   }
  //   if (user.loginType !== LoginType.APPLE) {
  //     throw new BadRequestException('login with associated email provider');
  //   }
  //   return this.finishOAuthLogin(user, req);
  // }

  // private async verifyGoogleJwt(idToken: string): Promise<OAuthJwtPayload> {
  //   const clientIds = this.parseClientIds(
  //     this.configService.get<string>('GOOGLE_OAUTH_CLIENT_ID'),
  //     'Google OAuth is not configured',
  //   );
  //   try {
  //     const result = await jose.jwtVerify(idToken, this.googleJwks, {
  //       issuer: ['https://accounts.google.com', 'accounts.google.com'],
  //       audience: clientIds.length === 1 ? clientIds[0] : clientIds,
  //     });
  //     return result.payload;
  //   } catch {
  //     throw new UnauthorizedException('Invalid or expired Google token');
  //   }
  // }

  // private async verifyAppleJwt(identityToken: string): Promise<OAuthJwtPayload> {
  //   const clientIds = this.parseClientIds(
  //     this.configService.get<string>('APPLE_OAUTH_CLIENT_ID'),
  //     'Apple OAuth is not configured',
  //   );
  //   try {
  //     const result = await jose.jwtVerify(identityToken, this.appleJwks, {
  //       issuer: 'https://appleid.apple.com',
  //       audience: clientIds.length === 1 ? clientIds[0] : clientIds,
  //     });
  //     return result.payload;
  //   } catch {
  //     throw new UnauthorizedException('Invalid or expired Apple token');
  //   }
  // }

  // private async finishOAuthLogin(user: User, req: Request): Promise<IUserLoginData> {
  //   if (user.isDisabled) {
  //     throw new NotFoundException('Your account is disabled, contact Admin');
  //   }

  //   if (!user.isEmailVerified || !user.isPhoneVerified) {
  //     throw new UnauthorizedException('Your account is not verified');
  //   }

  //   const clientDeviceToken = req.headers['x-client-device-token'] as
  //     | string
  //     | undefined;
  //   if (clientDeviceToken) {
  //     const clientDevice =
  //       await this.clientDeviceService.findByUserIdAndDeviceToken(
  //         user.id,
  //         clientDeviceToken,
  //       );
  //     if (!clientDevice) {
  //       const otpToken = await this.tokenService.generateOTPtoken({
  //         email: user.email,
  //         expiry: moment().add(10, 'minutes').toDate(),
  //         subject: TokenSubject.NEW_DEVICE_LOGIN_OTP,
  //       });
  //       await this.emailEventService.emitNewDeviceLoginOtpEmail(
  //         user.email,
  //         otpToken.token,
  //       );
  //       throw new UnauthorizedException('Detected new device login');
  //     }
  //   }

  //   const jwtPayload: JwtAuthPayload = {
  //     sub: user.id,
  //     userType: user.userType,
  //     userId: user.id,
  //     email: user.email,
  //   };

  //   const token = await this.tokenService.generateJWTtoken(jwtPayload);

  //   return {
  //     id: user.id,
  //     token,
  //     userType: user.userType,
  //     userId: user.id,
  //     email: user.email,
  //   };
  // }

  // private parseClientIds(raw: string | undefined, missingMessage: string): string[] {
  //   if (!raw?.trim()) {
  //     throw new BadRequestException(missingMessage);
  //   }
  //   return raw
  //     .split(',')
  //     .map((s) => s.trim())
  //     .filter(Boolean);
  // }

  // private async completeOAuthSignUp(params: {
  //   loginType: LoginType.GOOGLE | LoginType.APPLE;
  //   email: string;
  //   fullName: string;
  //   countryId: string;
  //   phoneNo: string;
  //   otpPhone: string;
  //   referalCode?: string;
  //   /** Same pattern as existing social sign-up: hash provider JWT into `users.password`. */
  //   secretForPasswordField: string;
  //   imageUrl?: string;
  // }) {
  //   const country = await this.countryService.findById(params.countryId);
  //   if (!country) {
  //     throw new NotFoundException('Country not found');
  //   }

  //   const phone = Utils.normalizeCountryPhone(
  //     country.phoneCode,
  //     params.phoneNo,
  //     country.phoneLength,
  //   );

  //   const emailUser = await this.userRepository.findByEmail(params.email);
  //   if (emailUser) {
  //     throw new ConflictException('User with email already exist');
  //   }

  //   const verifyPhoneOtp = await this.tokenService.verifySignUpOTP({
  //     phoneNo: phone,
  //     token: params.otpPhone,
  //     subject: TokenSubject.SIGN_UP_PHONE,
  //   });

  //   if (!verifyPhoneOtp) {
  //     throw new BadRequestException('Invalid OTP');
  //   }

  //   const password = await PasswordUtil.hashPassword(params.secretForPasswordField);

  //   const user = await this.userRepository.create({
  //     email: params.email,
  //     phoneNo: phone,
  //     fullName: params.fullName,
  //     password,
  //     countryId: country.id,
  //     userType: UserType.USER,
  //     loginType: params.loginType,
  //     isEmailVerified: true,
  //     isPhoneVerified: true,
  //     isActive: true,
  //     ...(params.imageUrl ? { imageUrl: params.imageUrl } : {}),
  //   });

  //   const jwtPayload = {
  //     sub: user.id,
  //     userType: UserType.USER,
  //     userId: user.id,
  //     email: params.email,
  //   };

  //   const token = await this.tokenService.generateJWTtoken(jwtPayload);

  //   await this.emailEventService.emitWelcomeEmail(user.email, user.fullName);

  //   let referalUserId: string | undefined;
  //   if (params.referalCode) {
  //     const referrerUser = await this.userRepository.findByReferalCode(
  //       params.referalCode,
  //     );
  //     referalUserId = referrerUser?.id;
  //   }

  //   await this.userEventService.emitGenerateReferalCode(
  //     user.id,
  //     params.referalCode,
  //     referalUserId,
  //   );

  //   return {
  //     email: params.email,
  //     userType: UserType.USER,
  //     id: user.id,
  //     token,
  //   };
  // }
}
