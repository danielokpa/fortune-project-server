import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { JobRepository } from '../repositories/job.repository';

@Injectable()
export class JobService {
  constructor(
    private readonly jobRepository: JobRepository,
  ) {}

  // keep
  async getJobs() {
    const jobs = await this.jobRepository.findAll();
    return jobs;
  }

  async getJobById(id: string) {
    const job =
      await this.jobRepository.findById(id);

    if (!job)
      throw new NotFoundException(
        'Job not found',
      );
    return job;
  }
}