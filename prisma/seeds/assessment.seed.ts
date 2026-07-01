import { PrismaClient, JobRole } from '@prisma/client';

export async function seedAssessments(
  prisma: PrismaClient,
) {
  const assessments = [
    {
      jobId: '4be36ca3-57a3-478f-bb3c-fa70e432cd1d', // Paste your Job ID here
      slug: 'male-driver',
      title: 'Male Driver',
      jobRole: JobRole.DRIVER,
      durationMinutes: 30,
      passingScore: 75,
    },
    {
      jobId: '463ec6c0-bd65-4e32-943a-07c2d4fe2368', // Paste your Job ID here
      slug: 'female-driver',
      title: 'Female Driver',
      jobRole: JobRole.DRIVER,
      durationMinutes: 30,
      passingScore: 75,
    },
    {
      jobId: '98a7cd50-ecf8-4463-8dae-defbb7ff87f7', // Paste your Job ID here
      slug: 'customer-support',
      title: 'Customer Support',
      jobRole: JobRole.CUSTOMER_SUPPORT,
      durationMinutes: 30,
      passingScore: 75,
    },
    {
      jobId: 'abd6fb02-c3fe-431d-8da5-b1dfa94051df', // Paste your Job ID here
      slug: 'administrative-executive',
      title: 'Administrative Executive',
      jobRole: JobRole.ADMIN_EXECUTIVE,
      durationMinutes: 30,
      passingScore: 75,
    },
    {
      jobId: '310fbdfb-8b12-469f-a013-d4877ff91776', // Paste your Job ID here
      slug: 'inventory-coordinator',
      title: 'Inventory Coordinator',
      jobRole: JobRole.INVENTORY,
      durationMinutes: 30,
      passingScore: 75,
    },
    {
      jobId: '2594e13c-fb81-40ff-9def-afd0cfec7293', // Paste your Job ID here
      slug: 'operations-officer',
      title: 'Operations Officer',
      jobRole: JobRole.OPERATIONS,
      durationMinutes: 30,
      passingScore: 75,
    },
  ];

  await Promise.all(
    assessments.map((assessment) =>
      prisma.assessment.upsert({
        where: {
          slug: assessment.slug,
        },
        update: {
          title: assessment.title,
          durationMinutes: assessment.durationMinutes,
          passingScore: assessment.passingScore,
          jobId: assessment.jobId,
          jobRole: assessment.jobRole,
        },
        create: {
          ...assessment,
        },
      }),
    ),
  );

  console.log(`✅ Seeded ${assessments.length} assessments`);
}
