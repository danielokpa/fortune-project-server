import { PrismaClient } from '@prisma/client';

export async function seedAssessments(
  prisma: PrismaClient,
) {
  const assessments = [
    {
      jobId: '24610979-4b3b-4ea6-8a60-6f4355598fde', // Paste your Job ID here
      slug: 'male-driver',
      title: 'Male Driver',
      durationMinutes: 30,
      passingScore: 75,
    },
    {
      jobId: 'db65b267-910f-40cb-b0d0-e5ed92168d47', // Paste your Job ID here
      slug: 'female-driver',
      title: 'Female Driver',
      durationMinutes: 30,
      passingScore: 75,
    },
    {
      jobId: 'ede783c5-8869-4db6-9569-48aa01fed54f', // Paste your Job ID here
      slug: 'customer-support',
      title: 'Customer Support',
      durationMinutes: 30,
      passingScore: 75,
    },
    {
      jobId: '4730c375-50f6-487a-8d54-bed2e0670198', // Paste your Job ID here
      slug: 'administrative-executive',
      title: 'Administrative Executive',
      durationMinutes: 30,
      passingScore: 75,
    },
    {
      jobId: '2ecf8b11-a03a-4002-af64-49ebbfbda479', // Paste your Job ID here
      slug: 'inventory-coordinator',
      title: 'Inventory Coordinator',
      durationMinutes: 30,
      passingScore: 75,
    },
    {
      jobId: '5ee415f4-4ef4-49a1-9271-17f5a36692f7', // Paste your Job ID here
      slug: 'operations-officer',
      title: 'Operations Officer',
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
        },
        create: {
          ...assessment,
        },
      }),
    ),
  );

  console.log(`✅ Seeded ${assessments.length} assessments`);
}
