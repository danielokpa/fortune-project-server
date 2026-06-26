import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../../../prisma/prisma.service';
import { AssessmentRepository } from '../repositories/assessment.repository';
import { AssessmentScoringService } from './assessment-scoring.service';
export declare class ApplicationSubmissionService {
    private readonly prisma;
    private readonly repository;
    private readonly scoringService;
    private readonly eventEmitter;
    constructor(prisma: PrismaService, repository: AssessmentRepository, scoringService: AssessmentScoringService, eventEmitter: EventEmitter2);
}
