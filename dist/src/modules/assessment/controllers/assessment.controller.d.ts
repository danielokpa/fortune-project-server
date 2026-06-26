import { AssessmentService } from '../services/assessment.service';
export declare class AssessmentController {
    private readonly assessmentService;
    constructor(assessmentService: AssessmentService);
    getAssessments(): Promise<import("src/utils/response.utils").ApiResponse<{
        id: string;
        slug: string;
        title: string;
        durationMinutes: number;
        passingScore: number;
    }[]>>;
    getAssessment(jobId: string): Promise<import("src/utils/response.utils").ApiResponse<{
        id: string;
        jobId: string;
        slug: string;
        title: string;
        durationMinutes: number;
        passingScore: number;
        createdAt: Date;
    }>>;
}
