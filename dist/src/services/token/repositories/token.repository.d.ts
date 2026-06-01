import { Token, Prisma, TokenSubject } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
export declare class TokenRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(tokenData: Prisma.TokenCreateInput): Promise<Token>;
    findByToken(token: string): Promise<Token | null>;
    findByPhoneOrEmailToken(token: string, phoneNo: string, email: string): Promise<Token | null>;
    findByEmailToken(token: string, email: string): Promise<Token | null>;
    findByTokenEmailAndSubject(token: string, email: string, subject: TokenSubject): Promise<Token | null>;
    findByPhoneToken(token: string, phoneNo: string): Promise<Token | null>;
    delete(id: string): Promise<boolean>;
    deleteByToken(token: string): Promise<number>;
}
