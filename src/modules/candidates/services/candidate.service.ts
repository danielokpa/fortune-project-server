import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { ApplicationRepository } from '../repositories/application.repository';

import { CreateCandidateDto } from '../dto/candidate.dto';

import { CandidateDocumentsQueuedEvent } from '../events/candidate-documents.event';

@Injectable()
export class CandidateService {
  constructor(
    private readonly applicationRepository: ApplicationRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createCandidate(dto: CreateCandidateDto) {
    const result =
      await this.applicationRepository.createApplication(dto);

    this.eventEmitter.emit(
      CANDIDATE_EVENTS.DOCUMENTS_QUEUE,
      new CandidateDocumentsQueuedEvent({
        candidateId: result.candidate.id,
        documents: dto.candidateDocuments,
      }),
    );

    return result;
  }
}