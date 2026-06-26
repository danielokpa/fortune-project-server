"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedJobs = seedJobs;
const client_1 = require("@prisma/client");
async function seedJobs(prisma) {
    const jobs = [
        {
            slug: 'male-driver',
            title: 'Male Driver',
            description: 'Professional electric vehicle driver responsible for passenger transportation.',
        },
        {
            slug: 'female-driver',
            title: 'Female Driver',
            description: 'Professional electric vehicle driver responsible for passenger transportation.',
        },
        {
            slug: 'customer-support',
            title: 'Customer Support',
            description: 'Handle customer inquiries and support operations.',
        },
        {
            slug: 'administrative-executive',
            title: 'Administrative Executive',
            description: 'Administrative and office management responsibilities.',
        },
        {
            slug: 'inventory-coordinator',
            title: 'Inventory Coordinator',
            description: 'Manage inventory movement and warehouse operations.',
        },
        {
            slug: 'operations-officer',
            title: 'Operations Officer',
            description: 'Coordinate daily fleet and operational activities.',
        },
    ];
    const [organization, admin] = await Promise.all([
        prisma.organization.findFirstOrThrow({
            where: { name: 'PeppCruise' },
        }),
        prisma.user.findUniqueOrThrow({
            where: { email: 'admin@peppcruise.com' },
        }),
    ]);
    await Promise.all(jobs.map((job) => prisma.job.upsert({
        where: {
            slug: job.slug,
        },
        update: {
            title: job.title,
            description: job.description,
            status: client_1.JobStatus.PUBLISHED,
        },
        create: {
            ...job,
            status: client_1.JobStatus.PUBLISHED,
            organizationId: organization.id,
            createdById: admin.id,
        },
    })));
    console.log(`✅ Seeded ${jobs.length} jobs`);
}
//# sourceMappingURL=jobs.seed.js.map