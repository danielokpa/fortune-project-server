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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessmentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const assessment_service_1 = require("../services/assessment.service");
const uuid_validator_pipe_1 = require("../../../shared/pipes/uuid.validator.pipe");
const response_utils_1 = require("../../../utils/response.utils");
let AssessmentController = class AssessmentController {
    assessmentService;
    constructor(assessmentService) {
        this.assessmentService = assessmentService;
    }
    async getAssessments() {
        const data = await this.assessmentService.getAssessments();
        return response_utils_1.ResponseUtil.handleResponse(data, 'Assessments retrieved successfully', common_1.HttpStatus.OK);
    }
    async getAssessment(jobId) {
        const data = await this.assessmentService.getAssessmentForJob(jobId);
        return response_utils_1.ResponseUtil.handleResponse(data, 'Assessment retrieved successfully', common_1.HttpStatus.OK);
    }
};
exports.AssessmentController = AssessmentController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get all assessments' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Assessments retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssessmentController.prototype, "getAssessments", null);
__decorate([
    (0, common_1.Get)(':jobId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get assessment for job' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Assessment retrieved successfully' }),
    __param(0, (0, common_1.Param)('jobId', uuid_validator_pipe_1.UuidValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssessmentController.prototype, "getAssessment", null);
exports.AssessmentController = AssessmentController = __decorate([
    (0, swagger_1.ApiTags)('Assessments'),
    (0, common_1.Controller)('assessments'),
    __metadata("design:paramtypes", [assessment_service_1.AssessmentService])
], AssessmentController);
//# sourceMappingURL=assessment.controller.js.map