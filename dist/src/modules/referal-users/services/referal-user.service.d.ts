import { ReferalUserRepository } from '../repositories/referal-user.repository';
import { ReferalUser } from '../entities/referal-user.entity';
export declare class ReferalUserService {
    private readonly referalUserRepository;
    private readonly logger;
    constructor(referalUserRepository: ReferalUserRepository);
    create(data: Partial<ReferalUser>): Promise<ReferalUser>;
    findById(id: string): Promise<ReferalUser>;
    findByUserId(userId: string): Promise<ReferalUser[]>;
    findByReferredUserId(referredUserId: string): Promise<ReferalUser | null>;
    findByReferalCode(referalCode: string): Promise<ReferalUser[]>;
    markFirstTripCompleted(id: string): Promise<ReferalUser>;
    update(id: string, data: Partial<ReferalUser>): Promise<ReferalUser>;
    delete(id: string): Promise<void>;
}
