import { JobRepository } from '../repositories/job.repository';
export declare class JobService {
    private readonly jobRepository;
    constructor(jobRepository: JobRepository);
    getJobs(): Promise<{
        id: string;
        slug: string;
        title: string;
        description: string;
    }[]>;
    getJobById(id: string): Promise<{
        id: string;
        slug: string;
        title: string;
        description: string;
    }>;
}
