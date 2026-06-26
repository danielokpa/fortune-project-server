import { PrismaClient } from '@prisma/client';
export declare function seedOrganization(prisma: PrismaClient): Promise<{
    id: string;
    name: string;
    createdAt: Date;
}>;
