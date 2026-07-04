import { Prisma } from '@prisma/client';

export const applicationInclude =
  Prisma.validator<Prisma.ApplicationInclude>()({
    candidate: {
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        currentLocation: true,
        highestQualification: true,
        yearsOfExperience: true,
      },
    },
    job: {
      select: {
        id: true,
        title: true,
        // role: true,
      },
    },
    assessmentAttempt: {
      select: {
        id: true,
        score: true,
        passed: true,
        status: true,
        startedAt: true,
        submittedAt: true,
      },
    },
  });