import { User } from '../entities/user.entity';
import { UserType } from '../../../enums/user-type.enum';
import type { GenerateReferalCodeEvent } from '../events/user.events';
export declare class UserRepository {
    private userModel;
    constructor(userModel: typeof User);
    findByIdentity(identity: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    fetchUser(id: string): Promise<User | null>;
    processGenerateReferalCode(event: GenerateReferalCodeEvent): Promise<string | undefined>;
    fetchAndUpdateUser(id: string, data: Partial<User>): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByPhone(phoneNo: string): Promise<User | null>;
    findByReferalCode(referalCode: string, excludeUserId?: string): Promise<User | null>;
    findByEmailAndRole(email: string, userType: UserType): Promise<User | null>;
    create(userData: Partial<User>): Promise<User>;
    update(id: string, userData: Partial<User>): Promise<[number, User[]]>;
    delete(id: string): Promise<number>;
    restore(id: string): Promise<void>;
    findWithCountry(email: string, userType: UserType): Promise<User | null>;
    findAll(options?: any): Promise<User[]>;
}
