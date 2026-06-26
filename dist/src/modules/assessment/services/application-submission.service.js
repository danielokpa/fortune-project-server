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
exports.ApplicationSubmissionService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const prisma_service_1 = require("../../../prisma/prisma.service");
const assessment_repository_1 = require("../repositories/assessment.repository");
const assessment_scoring_service_1 = require("./assessment-scoring.service");
let ApplicationSubmissionService = class ApplicationSubmissionService {
    prisma;
    repository;
    scoringService;
    eventEmitter;
    constructor(prisma, repository, scoringService, eventEmitter) {
        this.prisma = prisma;
        this.repository = repository;
        this.scoringService = scoringService;
        this.eventEmitter = eventEmitter;
    }
};
exports.ApplicationSubmissionService = ApplicationSubmissionService;
exports.ApplicationSubmissionService = ApplicationSubmissionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        assessment_repository_1.AssessmentRepository,
        assessment_scoring_service_1.AssessmentScoringService,
        event_emitter_1.EventEmitter2])
], ApplicationSubmissionService);
//# sourceMappingURL=application-submission.service.js.map