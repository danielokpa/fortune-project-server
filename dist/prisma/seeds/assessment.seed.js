"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAssessments = seedAssessments;
async function seedAssessments(prisma) {
    const assessments = [
        {
            jobId: '4fd915b0-c452-4e31-b6ce-7ebe35c44b17',
            slug: 'male-driver',
            title: 'Male Driver',
            durationMinutes: 30,
            passingScore: 75,
        },
        {
            jobId: '3dcbe116-4e36-49b8-b4d6-095adb4d11ae',
            slug: 'female-driver',
            title: 'Female Driver',
            durationMinutes: 30,
            passingScore: 75,
        },
        {
            jobId: 'f9c3c74a-73dc-4ffe-9408-1ecd6f76df40',
            slug: 'customer-support',
            title: 'Customer Support',
            durationMinutes: 30,
            passingScore: 75,
        },
        {
            jobId: '4ee2bcdf-f29c-4cad-9440-b95d0da80833',
            slug: 'administrative-executive',
            title: 'Administrative Executive',
            durationMinutes: 30,
            passingScore: 75,
        },
        {
            jobId: '1ab4f54f-8d52-45a2-87a0-26a0b0ff900f',
            slug: 'inventory-coordinator',
            title: 'Inventory Coordinator',
            durationMinutes: 30,
            passingScore: 75,
        },
        {
            jobId: '21ae390e-f76f-422c-885c-1e9b7378c02b',
            slug: 'operations-officer',
            title: 'Operations Officer',
            durationMinutes: 30,
            passingScore: 75,
        },
    ];
    await Promise.all(assessments.map((assessment) => prisma.assessment.upsert({
        where: {
            slug: assessment.slug,
        },
        update: {
            title: assessment.title,
            durationMinutes: assessment.durationMinutes,
            passingScore: assessment.passingScore,
            jobId: assessment.jobId,
        },
        create: {
            ...assessment,
        },
    })));
    console.log(`✅ Seeded ${assessments.length} assessments`);
}
//# sourceMappingURL=assessment.seed.js.map