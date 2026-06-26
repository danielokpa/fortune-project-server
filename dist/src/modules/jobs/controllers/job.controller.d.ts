import { JobService } from '../services/job.service';
export declare class JobController {
    private readonly jobService;
    constructor(jobService: JobService);
    getJobs(): Promise<import("src/utils/response.utils").ApiResponse<{
        id: string;
        slug: string;
        title: string;
        description: string;
    }[]>>;
    getJob(id: string): Promise<import("src/utils/response.utils").ApiResponse<{
        id: string;
        slug: string;
        title: string;
        description: string;
    }>>;
}
