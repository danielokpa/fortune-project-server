import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User, Role } from '@prisma/client';
import { Request as ExpressRequest, request } from 'express';
import { add } from 'date-fns';
import { UserLoginIdentityType, UserType } from '../../enums/user-type.enum';
import { MailService } from 'src/services/mail/mail.service';
import { EmailEventService } from 'src/services/mail/email-event.service';
import { SmsEventService } from 'src/services/sms/sms-event.service';
import { TOKEN_SUBJECT } from 'src/services/token/token.constants';
import { TokenService } from 'src/services/token/token.service';
import { PasswordUtil } from 'src/utils/password.util';
import { UserRepository } from '../users/repositories/user.repository';
import { PatientRepository } from '../patients/repositories/patient.repository';
import { JwtAuthPayload } from './auth.interface';
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginOtpDto,
  LoginUserDto,
  ResetPasswordDto,
  SignupEmail,
  SignupPhone,
  SignUpUserDto,
  VerifyOtpDto,
} from './dto/auth.dto';
import { TokenSubject } from '@prisma/client';
import moment from 'moment';
import { LoginType } from 'src/enums/login-type.enum';
// import { CountryService } from '../countries/services/country.service';
import { UserService } from '../users/services/user.service';
// import { ClientDeviceService } from '../client-devices/services/client-device.service';
import { Validators } from 'src/utils/validators.utils';
import { Utils } from 'src/utils/utils';
import { IUserLoginData } from 'src/shared/interfaces/auth.interface';
// import { UserEventService } from '../users/services/user-event.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly patientRepository: PatientRepository,
    private mailService: MailService,
    private tokenService: TokenService,
    private emailEventService: EmailEventService,
    private smsEventService: SmsEventService,
    // private countryService: CountryService,
    private userService: UserService,
    // private clientDeviceService: ClientDeviceService,
    // private userEventService: UserEventService,
  ) {}

  async verifyPasswordResetOtp(input: VerifyOtpDto) {
    const { token, subject, email } = input;

    input.email = Validators.validateEmail(input.email);
    const data = await this.tokenService.validatePasswordResetOtp({
      token,
      subject,
      email,
    });

    if (!data) {
      throw new BadRequestException('Invalid Password Reset OTP');
    }

    return input;
  }

  async login(input: LoginUserDto) {
    
    
    const user = await this.checkEmailExist(Validators.validateEmail(input.email));

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    if (user.isDisabled) {
      throw new NotFoundException('Your account is disabled, contact Admin');
    }

    // if (!user.isEmailVerified) {
    //   throw new UnauthorizedException('Your account is not verified');
    // }

    const verifyPassword = await PasswordUtil.verifyPassword(
      input.password,
      user.password,
    );

    if (!verifyPassword) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    //Detect if the user login with a new device using the x-client-device-toke provided in the request header
    // const clientDeviceToken = request.headers[
    //   'x-client-device-token'
    // ] as string;
    // if (clientDeviceToken) {
    //   const clientDevice =
    //     await this.clientDeviceService.findByUserIdAndDeviceToken(
    //       user.id,
    //       clientDeviceToken,
    //     );
    //   if (!clientDevice) {
    //     //send new device email with otp here
    //     const otpToken = await this.tokenService.generateOTPtoken({
    //       email: user.email,
    //       expiry: moment().add(10, 'minutes').toDate(),
    //       subject: TokenSubject.NEW_DEVICE_LOGIN_OTP,
    //     });
    //     await this.emailEventService.emitNewDeviceLoginOtpEmail(
    //       user.email,
    //       otpToken.token,
    //     );
    //     throw new UnauthorizedException('Detected new device login');
    //   }
    // }

    const payload: JwtAuthPayload = {
      sub: user.id,
      userType: user.role,
      userId: user.id,
      email: user.email,
    };

    const token: string = await this.tokenService.generateJWTtoken(payload);

    const { password, ...rest } = user;

    const data: IUserLoginData = {
      id: user.id,
      token,
      userType: user.role,
      userId: user.id,
      email: user.email,
    };

    return data;
  }

  async loginPatient(email: string, contact: string) {
    const patient = await this.patientRepository.findByEmail(email);

    if (!patient) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify contact as password
    const isValid = contact === patient.contact;
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtAuthPayload = {
      sub: patient.id,
      userType: Role.PATIENT,
      userId: patient.id,
      email: patient.email,
    };

    const token = await this.tokenService.generateJWTtoken(payload);

    return {
      id: patient.id,
      token,
      userType: Role.PATIENT,
      patient: {
        firstName: patient.firstName,
        lastName: patient.lastName,
        email: patient.email,
      },
    };
  }

  // async loginOtp(input: LoginOtpDto) {
  //   const { identity, otp, deviceInfo, country } = input;

  //   let user: User | null = null;

  //   const identityType = Utils.getLoginIdentityType(identity);
  //   if (identityType == UserLoginIdentityType.EMAIL) {
  //     // user = await this.checkEmailExist(identity);
  //     user = await this.userService.findByIdentity(
  //       Validators.validateEmail(identity),
  //     );
  //   } else {
  //     if (!country) {
  //       throw new BadRequestException('Must select a valid phone county');
  //     }

  //     const existingCountry = await this.countryService.findById(country);
  //     if (!existingCountry) {
  //       throw new NotFoundException('Country phone not found!');
  //     }

  //     const phoneNo = Utils.normalizeCountryPhone(
  //       existingCountry?.phoneCode,
  //       identity,
  //       existingCountry.phoneLength,
  //     );

  //     user = await this.userRepository.findByPhone(phoneNo);
  //   }

  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   if (user.loginType !== LoginType.NORMAL) {
  //     throw new BadRequestException(
  //       'Only normal login type is allowed to login with OTP',
  //     );
  //   }

  //   if (!user.isActive) {
  //     throw new NotFoundException('Your account is disabled, contact Admin');
  //   }

  //   if (!user.isEmailVerified) {
  //     throw new UnauthorizedException('Your email account is not verified');
  //   }

  //   // if (!user.isPhoneVerified) {
  //   //   throw new UnauthorizedException('Your phone no. is not verified');
  //   // }

  //   const verifyOtp = await this.tokenService.verifyOTP({
  //     email: user.email,
  //     token: otp,
  //     subject: TokenSubject.NEW_DEVICE_LOGIN_OTP,
  //   });

  //   if (!verifyOtp) {
  //     throw new BadRequestException('Invalid OTP');
  //   }

  //   // const verifyPassword = await PasswordUtil.verifyPassword(
  //   //   password,
  //   //   user.password,
  //   // );

  //   // if (!verifyPassword) {
  //   //   throw new UnauthorizedException('Invalid Credentials');
  //   // }

  //   const payload = {
  //     sub: user.id,
  //     userType: UserType.USER,
  //     userId: user.id,
  //     email: user.email,
  //   };

  //   const token: string = await this.tokenService.generateJWTtoken(payload);

  //   const loginTime = moment().format('MMMM Do YYYY, h:mm A');
  //   await this.emailEventService.emitNewLoginEmail(
  //     user.email,
  //     user.fullName,
  //     deviceInfo,
  //     loginTime,
  //   );

  //   return {
  //     email: user.email,
  //     userType: UserType.USER,
  //     id: user.id,
  //     token: token,
  //   };
  // }

  async forgotPassword(input: ForgotPasswordDto) {
    input.email = Validators.validateEmail(input.email);
    const user = await this.checkEmailExist(input.email);

    if (!user) {
      return null;
    }

    // if (user.loginType !== LoginType.NORMAL) {
    //   throw new BadRequestException(
    //     'Only normal login type is allowed to reset password',
    //   );
    // }

    const expiry: Date = moment().add(10, 'minutes').toDate();

    const otpToken = await this.tokenService.generateOTPtoken({
      email: input.email,
      expiry: expiry,
      subject: TokenSubject.FORGOT_PASSWORD,
    });

    await this.emailEventService.emitForgetPasswordEmail(
      user.email,
      otpToken.token,
    );

    return null;
  }

  async resetPassword(input: ResetPasswordDto) {
    let { confirmPassword, password, email, token } = input;

    email = Validators.validateEmail(email);

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const tokenResult = await this.tokenService.verifyOTP({
      token: token,
      subject: TokenSubject.FORGOT_PASSWORD,
      email: email,
    });

    if (!tokenResult) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const user = await this.checkEmailExist(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // if (user.loginType !== LoginType.NORMAL) {
    //   throw new BadRequestException(
    //     'Only normal login type is allowed to reset password',
    //   );
    // }

    await this.userService.update(user.id, {
      password: await PasswordUtil.hashPassword(password),
    });

    return null;
  }

  async changePassword(input: ChangePasswordDto, authUser: JwtAuthPayload) {
    const user = await this.checkEmailExist(authUser.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { confirmPassword, newPassword, oldPassword } = input;

    const verifyOldPass = await PasswordUtil.verifyPassword(
      oldPassword,
      user.password,
    );

    if (!verifyOldPass) {
      throw new BadRequestException('Incorrect Old Password');
    }

    if (confirmPassword !== newPassword) {
      throw new BadRequestException('Password do not match');
    }

    const hashedPassword = await PasswordUtil.hashPassword(newPassword);

    await this.userRepository.update(user.id, { password: hashedPassword });

    const changedAt = moment().format('MMMM Do YYYY, h:mm A');
    await this.emailEventService.emitPasswordChangedEmail(
      user.email,
      user.firstName + user.lastName,
      changedAt,
    );

    return null;
  }
  ////////////////
  //            //
  //   HELPERS  //
  //            //
  ////////////////
  async checkEmailExist(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  // private getBaseUrlFromRequest(req: ExpressRequest): string {
  //   const origin = req.get('origin') || req.get('referer');

  //   if (origin) {
  //     const url = new URL(origin);
  //     return `${url.protocol}//${url.host}`;
  //   }

  //   return process.env.PEPP_APP_CLIENT_URL || 'https://apps.peppcruise.com';
  // }

  async logout(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // await this.clientDeviceService.deleteByUserIdAndDeviceToken(userId, input.deviceToken);

    return null;
  }
}
