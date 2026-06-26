import { PrismaClient } from '@prisma/client';
export declare function seedAdminUser(prisma: PrismaClient, organizationId: string): Promise<{
    id: string;
    createdAt: Date;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: import("@prisma/client").$Enums.Role;
    organizationId: string | null;
    updatedAt: Date;
}>;
