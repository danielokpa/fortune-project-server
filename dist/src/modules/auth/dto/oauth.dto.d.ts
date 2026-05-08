export declare class GoogleOAuthSignUpDto {
    idToken: string;
    email: string;
    phoneNo: string;
    otpPhone: string;
    country: string;
    fullName: string;
    referalCode?: string;
}
export declare class AppleOAuthSignUpDto {
    identityToken: string;
    email?: string;
    phoneNo: string;
    otpPhone: string;
    country: string;
    fullName: string;
    referalCode?: string;
}
export declare class GoogleOAuthLoginDto {
    idToken: string;
}
export declare class AppleOAuthLoginDto {
    identityToken: string;
    email?: string;
}
