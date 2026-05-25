import type { GenerateReferalCodeEvent } from '../events/user.events';
import { UserRepository } from '../repositories/user.repository';
import { ReferalUserService } from '../../referal-users/services/referal-user.service';
export declare class UserEventListener {
    private readonly userRepository;
    private readonly referalUserService;
    private readonly logger;
    constructor(userRepository: UserRepository, referalUserService: ReferalUserService);
    handleGenerateReferalCode(event: GenerateReferalCodeEvent): Promise<void>;
    private handleReferralTracking;
}
