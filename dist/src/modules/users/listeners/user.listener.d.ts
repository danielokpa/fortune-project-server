import { UserRepository } from '../repositories/user.repository';
export declare class UserEventListener {
    private readonly userRepository;
    private readonly logger;
    constructor(userRepository: UserRepository);
}
