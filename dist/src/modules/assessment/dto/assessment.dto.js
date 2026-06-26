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
exports.RolePlayQuestionsResponseDto = exports.AssessmentQuestionsResponseDto = exports.RolePlayQuestionResponseDto = exports.AssessmentQuestionResponseDto = exports.SubmitAssessmentDto = exports.RolePlayAnswerDto = exports.McqAnswerDto = exports.DocumentsDto = exports.CandidateDto = exports.AssessmentDetailsDto = exports.RolePlayQuestionDto = exports.AssessmentQuestionDto = exports.AssessmentOptionDto = exports.AssessmentListItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class AssessmentListItemDto {
    slug;
    title;
}
exports.AssessmentListItemDto = AssessmentListItemDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AssessmentListItemDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AssessmentListItemDto.prototype, "title", void 0);
class AssessmentOptionDto {
    id;
    optionText;
}
exports.AssessmentOptionDto = AssessmentOptionDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AssessmentOptionDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AssessmentOptionDto.prototype, "optionText", void 0);
class AssessmentQuestionDto {
    id;
    question;
    weight;
    options;
}
exports.AssessmentQuestionDto = AssessmentQuestionDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AssessmentQuestionDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AssessmentQuestionDto.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AssessmentQuestionDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [AssessmentOptionDto],
    }),
    __metadata("design:type", Array)
], AssessmentQuestionDto.prototype, "options", void 0);
class RolePlayQuestionDto {
    id;
    prompt;
}
exports.RolePlayQuestionDto = RolePlayQuestionDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RolePlayQuestionDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RolePlayQuestionDto.prototype, "prompt", void 0);
class AssessmentDetailsDto {
    id;
    slug;
    title;
    durationMinutes;
    passingScore;
    questions;
    rolePlay;
}
exports.AssessmentDetailsDto = AssessmentDetailsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AssessmentDetailsDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AssessmentDetailsDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AssessmentDetailsDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AssessmentDetailsDto.prototype, "durationMinutes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AssessmentDetailsDto.prototype, "passingScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [AssessmentQuestionDto],
    }),
    __metadata("design:type", Array)
], AssessmentDetailsDto.prototype, "questions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [RolePlayQuestionDto],
    }),
    __metadata("design:type", Array)
], AssessmentDetailsDto.prototype, "rolePlay", void 0);
class CandidateDto {
    fullName;
    email;
    phone;
    whatsapp;
    residentialAddress;
    gender;
    stateOfOrigin;
    currentLocation;
    highestQualification;
    yearsOfExperience;
}
exports.CandidateDto = CandidateDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CandidateDto.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CandidateDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CandidateDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CandidateDto.prototype, "whatsapp", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CandidateDto.prototype, "residentialAddress", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CandidateDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CandidateDto.prototype, "stateOfOrigin", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CandidateDto.prototype, "currentLocation", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CandidateDto.prototype, "highestQualification", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CandidateDto.prototype, "yearsOfExperience", void 0);
class DocumentsDto {
    photoUrl;
    cvUrl;
    driversLicenseUrl;
    nyscUrl;
}
exports.DocumentsDto = DocumentsDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocumentsDto.prototype, "photoUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocumentsDto.prototype, "cvUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocumentsDto.prototype, "driversLicenseUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocumentsDto.prototype, "nyscUrl", void 0);
class McqAnswerDto {
    questionId;
    selectedOptionId;
}
exports.McqAnswerDto = McqAnswerDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], McqAnswerDto.prototype, "questionId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], McqAnswerDto.prototype, "selectedOptionId", void 0);
class RolePlayAnswerDto {
    questionId;
    answer;
}
exports.RolePlayAnswerDto = RolePlayAnswerDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], RolePlayAnswerDto.prototype, "questionId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RolePlayAnswerDto.prototype, "answer", void 0);
class SubmitAssessmentDto {
    candidate;
    documents;
    attemptId;
    mcqAnswers;
    rolePlayAnswers;
}
exports.SubmitAssessmentDto = SubmitAssessmentDto;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CandidateDto),
    __metadata("design:type", CandidateDto)
], SubmitAssessmentDto.prototype, "candidate", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DocumentsDto),
    __metadata("design:type", DocumentsDto)
], SubmitAssessmentDto.prototype, "documents", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SubmitAssessmentDto.prototype, "attemptId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => McqAnswerDto),
    __metadata("design:type", Array)
], SubmitAssessmentDto.prototype, "mcqAnswers", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => RolePlayAnswerDto),
    __metadata("design:type", Array)
], SubmitAssessmentDto.prototype, "rolePlayAnswers", void 0);
class AssessmentQuestionResponseDto {
    id;
    order;
    category;
    question;
    weight;
    options;
}
exports.AssessmentQuestionResponseDto = AssessmentQuestionResponseDto;
class RolePlayQuestionResponseDto {
    id;
    order;
    prompt;
}
exports.RolePlayQuestionResponseDto = RolePlayQuestionResponseDto;
class AssessmentQuestionsResponseDto {
    assessmentId;
    title;
    durationMinutes;
    passingScore;
    totalQuestions;
    totalMarks;
    questions;
}
exports.AssessmentQuestionsResponseDto = AssessmentQuestionsResponseDto;
class RolePlayQuestionsResponseDto {
    assessmentId;
    title;
    minimumCharacters;
    totalQuestions;
    questions;
}
exports.RolePlayQuestionsResponseDto = RolePlayQuestionsResponseDto;
//# sourceMappingURL=assessment.dto.js.map