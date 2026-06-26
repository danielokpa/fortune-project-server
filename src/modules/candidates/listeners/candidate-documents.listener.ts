import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

// import { CandidateDocumentService } from '../services/candidate-document.service';
import { CandidateDocumentsQueuedEvent } from '../events/candidate-documents.event';
import { CANDIDATE_EVENTS } from 'src/enums/candidate-events.enum';

@Injectable()
export class CandidateDocumentsListener {
  private readonly logger = new Logger(CandidateDocumentsListener.name);

  constructor(
    // private readonly candidateDocumentService: CandidateDocumentService,
  ) {}

  @OnEvent(CANDIDATE_EVENTS.DOCUMENTS_QUEUE, {
    async: true,
  })
  async handleDocumentsQueued(
    event: CandidateDocumentsQueuedEvent,
  ): Promise<void> {
    this.logger.log(
      `Queueing documents for candidate ${event.candidateId}`,
    );

    try {
      /**
       * Queue document creation here.
       *
       * Example:
       *
       * await this.candidateDocumentService.queue(
       *      event.candidateId,
       *      event.documents,
       * );
       */
    } catch (error) {
      this.logger.error(
        `Failed to queue candidate documents`,
        error instanceof Error ? error.stack : undefined,
      );

      throw error;
    }
  }
}