import { Module } from '@nestjs/common';

import { ApplicationModule } from '../application/application.module';
import { AssessmentController } from './controllers/assessment.controller';
import { AssessmentRepository } from './repositories/assessment.repository';
import { AssessmentService } from './services/assessment.service';
import { ApplicationSubmissionService } from './services/application-submission.service';
import { AssessmentScoringService } from './services/assessment-scoring.service';

@Module({
  imports: [ApplicationModule],
  controllers: [
    AssessmentController,
  ],
  providers: [
    AssessmentRepository,
    AssessmentService,
    ApplicationSubmissionService,
    AssessmentScoringService,
  ],
  exports: [
    AssessmentRepository,
    AssessmentService,
  ],
})
export class AssessmentModule {}