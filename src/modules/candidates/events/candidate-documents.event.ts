import { ICandidateDocumentsPayload } from '../interfaces/candidate-documents.interface';

export interface CandidateDocumentsQueuedEventPayload {
  candidateId: string;
  documents: ICandidateDocumentsPayload;
}

export class CandidateDocumentsQueuedEvent {
  constructor(
    public readonly payload: CandidateDocumentsQueuedEventPayload,
  ) {}

  get candidateId() {
    return this.payload.candidateId;
  }

  get documents() {
    return this.payload.documents;
  }
}