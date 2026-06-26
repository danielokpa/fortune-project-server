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
exports.AssessmentService = void 0;
const common_1 = require("@nestjs/common");
const assessment_repository_1 = require("../repositories/assessment.repository");
const application_submission_service_1 = require("./application-submission.service");
let AssessmentService = class AssessmentService {
    repository;
    submissionService;
    constructor(repository, submissionService) {
        this.repository = repository;
        this.submissionService = submissionService;
    }
    async getAssessments() {
        return this.repository.findAll();
    }
    async getAssessmentForJob(id) {
        const assessment = await this.repository.findByIdForJob(id);
        if (!assessment) {
            throw new common_1.NotFoundException('Assessment for job not found');
        }
        return {
            id: assessment.id,
            jobId: assessment.jobId,
            slug: assessment.slug,
            title: assessment.title,
            durationMinutes: assessment.durationMinutes,
            passingScore: assessment.passingScore,
            createdAt: assessment.createdAt,
        };
    }
};
exports.AssessmentService = AssessmentService;
exports.AssessmentService = AssessmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [assessment_repository_1.AssessmentRepository,
        application_submission_service_1.ApplicationSubmissionService])
], AssessmentService);
//# sourceMappingURL=assessment.service.js.map