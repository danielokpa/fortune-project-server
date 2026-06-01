import { User } from '@prisma/client';
import { UserType } from '../../enums/user-type.enum';
import { MailService } from "../../services/mail/mail.service";
import { EmailEventService } from "../../services/mail/email-event.service";
import { SmsEventService } from "../../services/sms/sms-event.service";
import { TokenService } from "../../services/token/token.service";
import { UserRepository } from '../users/repositories/user.repository';
import { JwtAuthPayload } from './auth.interface';
import { ChangePasswordDto, ForgotPasswordDto, LoginOtpDto, LoginUserDto, ResetPasswordDto, SignupEmail, SignupPhone, SignUpUserDto, VerifyOtpDto } from './dto/auth.dto';
import { CountryService } from '../countries/services/country.service';
import { UserService } from '../users/services/user.service';
import { ClientDeviceService } from '../client-devices/services/client-device.service';
import { IUserLoginData } from "../../shared/interfaces/auth.interface";
export declare class AuthService {
    private readonly userRepository;
    private mailService;
    private tokenService;
    private emailEventService;
    private smsEventService;
    private countryService;
    private userService;
    private clientDeviceService;
    constructor(userRepository: UserRepository, mailService: MailService, tokenService: TokenService, emailEventService: EmailEventService, smsEventService: SmsEventService, countryService: CountryService, userService: UserService, clientDeviceService: ClientDeviceService);
    signUpPhoneNo(input: SignupPhone): Promise<{}>;
    deleteUserAccount(identity: string, password: string): Promise<null>;
    signUpEmail(input: SignupEmail): Promise<null>;
    verifyOtp(input: VerifyOtpDto): Promise<VerifyOtpDto>;
    verifyPasswordResetOtp(input: VerifyOtpDto): Promise<VerifyOtpDto>;
    signUp(input: SignUpUserDto): Promise<{
        email: string;
        userType: UserType;
        id: string;
        token: string;
    }>;
    login(input: LoginUserDto): Promise<IUserLoginData>;
    loginOtp(input: LoginOtpDto): Promise<{
        email: string;
        userType: UserType;
        id: string;
        token: string;
    }>;
    forgotPassword(input: ForgotPasswordDto): Promise<null>;
    resetPassword(input: ResetPasswordDto): Promise<null>;
    changePassword(input: ChangePasswordDto, authUser: JwtAuthPayload): Promise<null>;
    checkEmailExist(email: string): Promise<User | null>;
    private getBaseUrlFromRequest;
    logout(input: {
        deviceToken: string;
    }, userId: string): Promise<null>;
}
