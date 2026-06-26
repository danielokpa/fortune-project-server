"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessmentRepository = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../../prisma/prisma.service");
const db_error_handler_util_1 = require("../../../utils/db-error-handler.util");
let AssessmentRepository = class AssessmentRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        try {
            return await this.prisma.assessment.findMany({
                select: {
                    id: true,
                    slug: true,
                    title: true,
                    durationMinutes: true,
                    passingScore: true,
                },
                orderBy: {
                    title: 'asc',
                },
            });
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async findByIdForJob(id) {
        try {
            return await this.prisma.assessment.findUnique({
                where: {
                    jobId: id,
                },
                select: {
                    id: true,
                    jobId: true,
                    slug: true,
                    title: true,
                    durationMinutes: true,
                    passingScore: true,
                    createdAt: true,
                },
            });
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async generateAttempt(assessmentId) {
        const assessment = await this.prisma.assessment.findUnique({
            where: {
                id: assessmentId,
            },
        });
        if (!assessment) {
            return null;
        }
        const professional = await this.prisma.questionBank.findMany({
            where: {
                category: client_1.QuestionCategory.PROFESSIONAL_ATTITUDE,
            },
            take: 20,
            orderBy: {
                createdAt: 'asc',
            },
        });
        const emotional = await this.prisma.questionBank.findMany({
            where: {
                category: client_1.QuestionCategory.EMOTIONAL_INTELLIGENCE,
            },
            take: 20,
            orderBy: {
                createdAt: 'asc',
            },
        });
        const customer = await this.prisma.questionBank.findMany({
            where: {
                category: client_1.QuestionCategory.CUSTOMER_SERVICE,
            },
            take: 20,
            orderBy: {
                createdAt: 'asc',
            },
        });
        const safety = await this.prisma.questionBank.findMany({
            where: {
                category: client_1.QuestionCategory.SAFETY,
            },
            take: 20,
            orderBy: {
                createdAt: 'asc',
            },
        });
        const availability = await this.prisma.questionBank.findMany({
            where: {
                category: client_1.QuestionCategory.AVAILABILITY,
            },
            take: 10,
            orderBy: {
                createdAt: 'asc',
            },
        });
        const mcqs = [
            ...professional,
            ...emotional,
            ...customer,
            ...safety,
            ...availability,
        ];
        const roleplays = await this.prisma.rolePlayBank.findMany({
            take: 20,
        });
        const attempt = await this.prisma.assessmentAttempt.create({
            data: {
                assessmentId,
                status: 'NOT_STARTED',
            },
        });
        await this.prisma.assessmentAttemptQuestion.createMany({
            data: mcqs.map((question, index) => ({
                attemptId: attempt.id,
                questionId: question.id,
                displayOrder: index + 1,
            })),
        });
        await this.prisma.assessmentAttemptRolePlay.createMany({
            data: roleplays.map((question, index) => ({
                attemptId: attempt.id,
                questionId: question.id,
                displayOrder: index + 1,
            })),
        });
        return {
            attemptId: attempt.id,
        };
    }
    async getAttemptQuestions(attemptId) {
        return this.prisma.assessmentAttempt.findUnique({
            where: {
                id: attemptId,
            },
            include: {
                assessment: true,
                generatedQuestions: {
                    orderBy: {
                        displayOrder: 'asc',
                    },
                    include: {
                        question: {
                            include: {
                                options: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async getAttemptRolePlays(attemptId) {
        return this.prisma.assessmentAttempt.findUnique({
            where: {
                id: attemptId,
            },
            include: {
                assessment: true,
                generatedRolePlays: {
                    orderBy: {
                        displayOrder: 'asc',
                    },
                    include: {
                        question: true,
                    },
                },
            },
        });
    }
    async getAttemptForSubmission(attemptId) {
        return this.prisma.assessmentAttempt.findUnique({
            where: {
                id: attemptId,
            },
            include: {
                assessment: {
                    include: {
                        job: true,
                    },
                },
                generatedQuestions: {
                    include: {
                        question: {
                            include: {
                                options: true,
                            },
                        },
                    },
                },
                generatedRolePlays: {
                    include: {
                        question: true,
                    },
                },
            },
        });
    }
};
exports.AssessmentRepository = AssessmentRepository;
exports.AssessmentRepository = AssessmentRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AssessmentRepository);
//# sourceMappingURL=assessment.repository.js.map