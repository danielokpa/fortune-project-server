import type { Request as ExpressRequest } from 'express';
import { ChangePasswordDto, ForgotPasswordDto, LoginDriverOtpDto, LoginDriverDto, ResetPasswordDto, SignupEmail, SignUpDriverPhoneDto, VerifyDriverOtpDto } from '../dto/auth.driver.dto';
import { AuthDriverService } from '../services/auth.driver.service';
import { CreateAccountDto } from '../dto/auth.driver.dto';
export declare class AuthDriverController {
    private readonly authService;
    constructor(authService: AuthDriverService);
    signUpPhoneNo(input: SignUpDriverPhoneDto): Promise<import("src/utils/response.utils").ApiResponse<{}>>;
    signUpEmail(input: SignupEmail): Promise<import("src/utils/response.utils").ApiResponse<null>>;
    verifyOtp(input: VerifyDriverOtpDto): Promise<import("src/utils/response.utils").ApiResponse<VerifyDriverOtpDto>>;
    signUp(input: CreateAccountDto): Promise<import("src/utils/response.utils").ApiResponse<import("../../../shared/interfaces/auth.interface").IDriverLoginData>>;
    login(input: LoginDriverDto): Promise<import("src/utils/response.utils").ApiResponse<import("../../../shared/interfaces/auth.interface").IDriverLoginData>>;
    loginOtp(input: LoginDriverOtpDto): Promise<import("src/utils/response.utils").ApiResponse<{
        email: string;
        userType: import("../../../enums").UserType;
        id: string;
        token: string;
    }>>;
    forgotPassword(input: ForgotPasswordDto, req: ExpressRequest): Promise<import("src/utils/response.utils").ApiResponse<null>>;
    resetPassword(input: ResetPasswordDto): Promise<import("src/utils/response.utils").ApiResponse<null>>;
    changePassword(input: ChangePasswordDto, req: ExpressRequest & {
        user: any;
    }): Promise<import("src/utils/response.utils").ApiResponse<null>>;
    deleteDriverAccount(userCredentials: {
        email: string;
        password: string;
    }): Promise<import("src/utils/response.utils").ApiResponse<{}>>;
}
