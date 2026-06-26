import { PrismaService } from '../../../prisma/prisma.service';
export declare class JobRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        slug: string;
        title: string;
        description: string;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        slug: string;
        title: string;
        description: string;
    } | null>;
}
