import type { GenerateReferalCodeEvent } from '../events/user.events';
import { UserRepository } from '../repositories/user.repository';
import { ReferredUserService } from '../../referred-users/services/referred-user.service';
export declare class UserEventListener {
    private readonly userRepository;
    private readonly referredUserService;
    private readonly logger;
    constructor(userRepository: UserRepository, referredUserService: ReferredUserService);
    handleGenerateReferalCode(event: GenerateReferalCodeEvent): Promise<void>;
    private handleReferralTracking;
}
