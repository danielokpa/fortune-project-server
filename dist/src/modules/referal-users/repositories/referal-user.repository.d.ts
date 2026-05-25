import { ReferalUser } from '../entities/referal-user.entity';
export declare class ReferalUserRepository {
    private readonly referalUserModel;
    constructor(referalUserModel: typeof ReferalUser);
    create(data: Partial<ReferalUser>): Promise<ReferalUser>;
    findById(id: string): Promise<ReferalUser | null>;
    findByUserId(userId: string): Promise<ReferalUser[]>;
    findByReferredUserId(referredUserId: string): Promise<ReferalUser | null>;
    findByReferalCode(referalCode: string): Promise<ReferalUser[]>;
    update(id: string, data: Partial<ReferalUser>): Promise<[number, ReferalUser[]]>;
    markFirstTripCompleted(id: string): Promise<[number, ReferalUser[]]>;
    delete(id: string): Promise<number>;
}
