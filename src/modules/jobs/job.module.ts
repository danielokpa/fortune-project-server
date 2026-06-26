import { Module } from '@nestjs/common';

import { JobController } from './controllers/job.controller';
import { JobRepository } from './repositories/job.repository';
import { JobService } from './services/job.service';

@Module({
  controllers: [
    JobController,
  ],
  providers: [
    JobRepository,
    JobService,
  ],
})
export class JobModule {}