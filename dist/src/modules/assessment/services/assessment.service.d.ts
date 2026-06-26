import { AssessmentRepository } from '../repositories/assessment.repository';
import { ApplicationSubmissionService } from './application-submission.service';
export declare class AssessmentService {
    private readonly repository;
    private readonly submissionService;
    constructor(repository: AssessmentRepository, submissionService: ApplicationSubmissionService);
    getAssessments(): Promise<{
        id: string;
        slug: string;
        title: string;
        durationMinutes: number;
        passingScore: number;
    }[]>;
    getAssessmentForJob(id: string): Promise<{
        id: string;
        jobId: string;
        slug: string;
        title: string;
        durationMinutes: number;
        passingScore: number;
        createdAt: Date;
    }>;
}
