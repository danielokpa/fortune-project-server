import { Prisma, JobRole, ApplicationStatus, AssessmentStatus, CandidateClassification } from '@prisma/client';

export interface ApplicationFilters {
  cursor?: string;

  limit: number;

  search?: string;

  jobSlugs?: string[];

  applicationStatus?: ApplicationStatus;

  assessmentStatus?: AssessmentStatus;

  passedOnly?: boolean;

  classification?: CandidateClassification;

  sortOrder: Prisma.SortOrder;
}