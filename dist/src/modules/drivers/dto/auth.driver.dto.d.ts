import { GENDER } from 'src/enums/gender.enum';
import { TokenSubject } from 'src/enums/token.enum';
export declare class CreateAccountDto {
    gender: GENDER;
    email: string;
    password: string;
    phoneNo: string;
    otpPhone: string;
    otpEmail: string;
    country: string;
    readonly fullName: string;
    readonly referalCode: string;
}
export declare class LoginDriverDto {
    readonly identity: string;
    readonly password: string;
    readonly deviceInfo: string;
    readonly country: string;
}
export declare class LoginDriverOtpDto {
    readonly identity: string;
    readonly password: string;
    otp: string;
    deviceInfo: string;
    readonly country?: string;
}
export declare class ForgotPasswordDto {
    email: string;
}
export declare class ResetPasswordDto {
    token: string;
    password: string;
    confirmPassword: string;
    email: string;
}
export declare class ChangePasswordDto {
    readonly oldPassword: string;
    readonly newPassword: string;
    readonly confirmPassword: string;
}
export declare class ResendOtpDto {
    readonly email: string;
}
export declare class SignupEmail {
    email: string;
}
export declare class SignUpDriverPhoneDto {
    readonly phoneNo: string;
    country: string;
}
export declare class VerifyDriverOtpDto {
    token: string;
    email: string;
    phoneNo: string;
    readonly subject: TokenSubject;
    country?: string;
}
