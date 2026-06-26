import { PrismaService } from '../../../prisma/prisma.service';
export declare class AssessmentRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        slug: string;
        title: string;
        durationMinutes: number;
        passingScore: number;
    }[]>;
    findByIdForJob(id: string): Promise<{
        id: string;
        jobId: string;
        slug: string;
        title: string;
        durationMinutes: number;
        passingScore: number;
        createdAt: Date;
    } | null>;
    generateAttempt(assessmentId: string): Promise<{
        attemptId: string;
    } | null>;
    getAttemptQuestions(attemptId: string): Promise<({
        assessment: {
            id: string;
            jobId: string;
            slug: string;
            title: string;
            durationMinutes: number;
            passingScore: number;
            createdAt: Date;
        };
        generatedQuestions: ({
            question: {
                options: {
                    id: string;
                    questionId: string;
                    optionText: string;
                    isCorrect: boolean;
                }[];
            } & {
                id: string;
                createdAt: Date;
                question: string;
                category: import("@prisma/client").$Enums.QuestionCategory;
                difficulty: import("@prisma/client").$Enums.QuestionDifficulty;
                weight: number;
            };
        } & {
            id: string;
            displayOrder: number;
            attemptId: string;
            questionId: string;
        })[];
    } & {
        id: string;
        score: number | null;
        passed: boolean | null;
        status: import("@prisma/client").$Enums.AssessmentStatus;
        startedAt: Date;
        submittedAt: Date | null;
        assessmentId: string;
        applicationId: string | null;
    }) | null>;
    getAttemptRolePlays(attemptId: string): Promise<({
        assessment: {
            id: string;
            jobId: string;
            slug: string;
            title: string;
            durationMinutes: number;
            passingScore: number;
            createdAt: Date;
        };
        generatedRolePlays: ({
            question: {
                id: string;
                createdAt: Date;
                category: import("@prisma/client").$Enums.RolePlayCategory | null;
                prompt: string;
            };
        } & {
            id: string;
            displayOrder: number;
            attemptId: string;
            questionId: string;
        })[];
    } & {
        id: string;
        score: number | null;
        passed: boolean | null;
        status: import("@prisma/client").$Enums.AssessmentStatus;
        startedAt: Date;
        submittedAt: Date | null;
        assessmentId: string;
        applicationId: string | null;
    }) | null>;
    getAttemptForSubmission(attemptId: string): Promise<({
        assessment: {
            job: {
                id: string;
                slug: string;
                title: string;
                createdAt: Date;
                status: import("@prisma/client").$Enums.JobStatus;
                organizationId: string;
                description: string;
                createdById: string;
                updatedAt: Date;
            };
        } & {
            id: string;
            jobId: string;
            slug: string;
            title: string;
            durationMinutes: number;
            passingScore: number;
            createdAt: Date;
        };
        generatedQuestions: ({
            question: {
                options: {
                    id: string;
                    questionId: string;
                    optionText: string;
                    isCorrect: boolean;
                }[];
            } & {
                id: string;
                createdAt: Date;
                question: string;
                category: import("@prisma/client").$Enums.QuestionCategory;
                difficulty: import("@prisma/client").$Enums.QuestionDifficulty;
                weight: number;
            };
        } & {
            id: string;
            displayOrder: number;
            attemptId: string;
            questionId: string;
        })[];
        generatedRolePlays: ({
            question: {
                id: string;
                createdAt: Date;
                category: import("@prisma/client").$Enums.RolePlayCategory | null;
                prompt: string;
            };
        } & {
            id: string;
            displayOrder: number;
            attemptId: string;
            questionId: string;
        })[];
    } & {
        id: string;
        score: number | null;
        passed: boolean | null;
        status: import("@prisma/client").$Enums.AssessmentStatus;
        startedAt: Date;
        submittedAt: Date | null;
        assessmentId: string;
        applicationId: string | null;
    }) | null>;
}
