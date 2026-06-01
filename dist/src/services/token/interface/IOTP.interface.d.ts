import { TokenSubject } from '@prisma/client';
export interface IOTPInterface {
    email?: string;
    token: string;
    phoneNo?: string;
    subject: TokenSubject;
}
