import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AxiosService } from 'src/services/axios/axios.service';
import { UserType } from '../../../enums/user-type.enum';
import { EmailEventService } from 'src/services/mail/email-event.service';
import { SmsEventService } from 'src/services/sms/sms-event.service';
import { TokenService } from 'src/services/token/token.service';
import { JwtAuthPayload } from '../../auth/auth.interface';
import { ChangePasswordDto, ForgotPasswordDto, LoginDriverOtpDto, LoginDriverDto, ResetPasswordDto, SignupEmail, SignUpDriverPhoneDto, CreateAccountDto, VerifyDriverOtpDto } from '../dto/auth.driver.dto';
import { CountryService } from '../../countries/services/country.service';
import { DriverRepository } from '../repositories/driver.repository';
import { ClientDeviceService } from '../../client-devices/services/client-device.service';
import { Driver } from '../entities/driver.entity';
import { IDriverLoginData } from '../../../shared/interfaces/auth.interface';
import { IVirtualAccount } from 'src/shared/interfaces/virtual.account.interface';
import { ClientDeviceRepository } from 'src/modules/client-devices/repositories/client-device.repository';
export declare class AuthDriverService {
    private readonly driverRepository;
    private readonly tokenService;
    private readonly emailEventService;
    private readonly smsEventService;
    private readonly countryService;
    private readonly clientDeviceService;
    private readonly configService;
    private readonly eventEmitter;
    private readonly axiosService;
    private readonly clientDeviceRepository;
    constructor(driverRepository: DriverRepository, tokenService: TokenService, emailEventService: EmailEventService, smsEventService: SmsEventService, countryService: CountryService, clientDeviceService: ClientDeviceService, configService: ConfigService, eventEmitter: EventEmitter2, axiosService: AxiosService, clientDeviceRepository: ClientDeviceRepository);
    private readonly logger;
    deleteUserAccount(identity: string, password: string): Promise<null>;
    logout(input: {
        deviceToken: any;
    }, userId: string): Promise<null>;
    signUpPhoneNo(input: SignUpDriverPhoneDto): Promise<{}>;
    signUpEmail(input: SignupEmail): Promise<null>;
    verifyOtp(input: VerifyDriverOtpDto): Promise<VerifyDriverOtpDto>;
    createAccount(input: CreateAccountDto): Promise<IDriverLoginData>;
    login(input: LoginDriverDto): Promise<IDriverLoginData>;
    loginOtp(input: LoginDriverOtpDto): Promise<{
        email: string;
        userType: UserType;
        id: string;
        token: string;
    }>;
    forgotPassword(input: ForgotPasswordDto): Promise<null>;
    resetPassword(input: ResetPasswordDto): Promise<null>;
    changePassword(input: ChangePasswordDto, authUser: JwtAuthPayload): Promise<null>;
    fetchOrCreateVirtualAccount(user: IVirtualAccount): Promise<any>;
    handleDashboardAccessed(payload: {
        user: Driver;
        userToken: string;
    }): Promise<void>;
    checkEmailExist(email: string): Promise<Driver | null>;
    private getBaseUrlFromRequest;
}
