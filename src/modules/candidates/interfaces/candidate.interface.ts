import { ICandidateDocumentsPayload } from './candidate-documents.interface';

export interface ICreateCandidate {
  fullName: string;

  email: string;

  phone: string;

  whatsapp?: string;

  residentialAddress: string;

  gender: string;

  dateOfBirth: Date;

  stateOfOrigin: string;

  currentLocation?: string;

  highestQualification: string;

  yearsOfExperience?: number;

  candidateDocuments: ICandidateDocumentsPayload;

  jobId: string;
}