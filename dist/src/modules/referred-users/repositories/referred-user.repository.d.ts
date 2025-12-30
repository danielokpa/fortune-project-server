import { ReferredUser } from '../entities/referred-user.entity';
export declare class ReferredUserRepository {
    private readonly referredUserModel;
    constructor(referredUserModel: typeof ReferredUser);
    create(data: Partial<ReferredUser>): Promise<ReferredUser>;
    findById(id: string): Promise<ReferredUser | null>;
    findByUserId(userId: string): Promise<ReferredUser[]>;
    findByReferredUserId(referredUserId: string): Promise<ReferredUser | null>;
    findByReferalCode(referalCode: string): Promise<ReferredUser[]>;
    findAll(options?: {
        limit?: number;
        offset?: number;
        userId?: string;
        referredUserId?: string;
        hasRewarded?: boolean;
    }): Promise<ReferredUser[]>;
    update(id: string, data: Partial<ReferredUser>): Promise<[number, ReferredUser[]]>;
    incrementCompletedRides(id: string, increment?: number): Promise<[number, ReferredUser[]]>;
    markAsRewarded(id: string): Promise<[number, ReferredUser[]]>;
    delete(id: string): Promise<number>;
}
