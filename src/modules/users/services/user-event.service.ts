import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GenerateReferalCodeEvent } from '../events/user.events';

@Injectable()
export class UserEventService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async emitGenerateReferalCode(userId: string, usedReferalCode?: string, referalUserId?: string) {
    const event: GenerateReferalCodeEvent = {
      userId,
      usedReferalCode,
      referalUserId,
    };
    this.eventEmitter.emit('user.generate-referal-code', event);
  }
}

