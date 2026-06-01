import { PrismaService } from '../../../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { UserType } from "../../../enums";
export declare class UserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByIdentity(identity: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    fetchUser(id: string): Promise<Partial<User> | null>;
    fetchAndUpdateUser(id: string, data: Prisma.UserUpdateInput): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    findByPhone(phoneNo: string): Promise<User | null>;
    findByEmailAndRole(email: string, userType: UserType): Promise<User | null>;
    create(userData: Prisma.UserUncheckedCreateInput): Promise<User>;
    update(id: string, userData: Prisma.UserUpdateInput): Promise<User>;
    delete(id: string): Promise<boolean>;
    findWithCountry(email: string, userType: UserType): Promise<User | null>;
    findAll(params?: Prisma.UserFindManyArgs): Promise<User[]>;
}
