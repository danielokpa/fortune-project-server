import { TokenSubject } from '@prisma/client';
export declare class CreateTokenDto {
    email?: string;
    phoneNo?: string;
    expiry: Date;
    subject: TokenSubject;
}
export declare class VerifyCustomTokenDto {
    token: string;
    email: string;
    phoneNo: string;
}
