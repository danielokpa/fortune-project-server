export class CandidateDto {
  fullName: string;

  email: string;

  phone: string;

  whatsapp?: string;

  residentialAddress?: string;

  gender?: string;

  dateOfBirth?: Date;

  stateOfOrigin?: string;

  currentLocation?: string;

  highestQualification?: string;

  yearsOfExperience?: number;
}

export class DocumentsDto {
  photoUrl?: string;

  cvUrl?: string;

  driversLicenseUrl?: string;

  nyscUrl?: string;
}

export class RolePlayAnswerDto {
  questionId: string;

  answer: string;
}

