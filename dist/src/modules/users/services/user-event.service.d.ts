import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class UserEventService {
    private readonly eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    emitGenerateReferalCode(userId: string, usedReferalCode?: string, referalUserId?: string): Promise<void>;
}
