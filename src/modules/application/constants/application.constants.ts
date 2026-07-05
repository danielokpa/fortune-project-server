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

        documents: {
          select: {
            id: true,
            type: true,
            fileUrl: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
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

export const applicationIncludeDetails =
  Prisma.validator<Prisma.ApplicationInclude>()({
    candidate: {
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        whatsapp: true,
        gender: true,
        dateOfBirth: true,
        stateOfOrigin: true,
        currentLocation: true,
        highestQualification: true,
        yearsOfExperience: true,

        documents: {
          select: {
            id: true,
            type: true,
            fileUrl: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
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

        // ── ADD THESE ──────────────────────────────────────────────────
        answers: {
          include: {
            question: { select: { text: true } },
            selectedOption: { select: { text: true, isCorrect: true } },
          },
          orderBy: { question: { displayOrder: 'asc' } }, // or however you order
        },
        rolePlayAnswers: {
          include: {
            question: { select: { prompt: true } },
          },
        },
        generatedQuestions: {
          select: { displayOrder: true, questionId: true },
          orderBy: { displayOrder: 'asc' },
        },
        generatedRolePlays: {
          select: { displayOrder: true, questionId: true },
          orderBy: { displayOrder: 'asc' },
        },
      },
    },
  });