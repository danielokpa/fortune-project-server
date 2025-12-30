import { ReferredUserRepository } from '../repositories/referred-user.repository';
import { ReferredUser } from '../entities/referred-user.entity';
export declare class ReferredUserService {
    private readonly referredUserRepository;
    private readonly logger;
    constructor(referredUserRepository: ReferredUserRepository);
    create(data: Partial<ReferredUser>): Promise<ReferredUser>;
    findById(id: string): Promise<ReferredUser>;
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
    incrementCompletedRides(id: string, increment?: number): Promise<ReferredUser>;
    markAsRewarded(id: string): Promise<ReferredUser>;
    update(id: string, data: Partial<ReferredUser>): Promise<ReferredUser>;
    delete(id: string): Promise<void>;
}
