import { Module } from '@nestjs/common';

import { CandidateController } from './controllers/candidate.controller';
import { CandidateRepository } from './repositories/candidate.repository';
import { CandidateService } from './services/candidate.service';
import { ApplicationModule } from '../application/application.module';

@Module({
  imports: [ApplicationModule],
  controllers: [
    CandidateController,
  ],
  providers: [
    CandidateRepository,
    CandidateService,
  ],
})
export class CandidateModule {}