import { Injectable } from '@nestjs/common';
import {
  Prisma,
  QuestionCategory,
  AssessmentStatus,
  JobRole,
} from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';
import { handleDatabaseError } from 'src/utils/db-error-handler.util';

@Injectable()
export class AssessmentRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  /*
   |--------------------------------------------------------------------------
   | Assessment List
   |--------------------------------------------------------------------------
   */

  async findAll() {
    try {
      return await this.prisma.assessment.findMany({
        select: {
          id: true,
          slug: true,
          title: true,
          durationMinutes: true,
          passingScore: true,
        },

        orderBy: {
          title: 'asc',
        },
      });
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  /*
   |--------------------------------------------------------------------------
   | Single Assessment
   |--------------------------------------------------------------------------
   */

  //  keep
  async findByIdForJob(id: string) {
    try {
      return await this.prisma.assessment.findUnique({
        where: {
          jobId: id,
        },

        select: {
          id: true,
          jobId: true,
          slug: true,
          title: true,
          durationMinutes: true,
          passingScore: true,
          createdAt: true,
        },
      });
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  /*
   |--------------------------------------------------------------------------
   | Generate Assessment Attempt
   |--------------------------------------------------------------------------
   */

  private shuffle<T>(items: T[]): T[] {
    const arr = [...items];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  async generateAttempt(assessmentId: string, applicationId: string) {
    const assessment = await this.prisma.assessment.findUnique({
      where: { id: assessmentId },
      select: {
        id: true,
        jobRole: true,
      },
    });
    if (!assessment) return null;

    // Tune these per your real spec — they currently sum to 20.
    const MCQ_COUNTS: Record<QuestionCategory, number> = {
      [QuestionCategory.PROFESSIONAL_ATTITUDE]: 4,
      [QuestionCategory.EMOTIONAL_INTELLIGENCE]: 4,
      [QuestionCategory.CUSTOMER_SERVICE]: 4,
      [QuestionCategory.SAFETY]: 4,
      [QuestionCategory.AVAILABILITY]: 4,
    };
    const ROLEPLAY_COUNT = 7;

    const mcqs: any[] = [];
    for (const [category, count] of Object.entries(MCQ_COUNTS)) {
      if (count <= 0) continue;
      const pool = await this.prisma.questionBank.findMany({
        where: { category: category as QuestionCategory, OR: [
            { jobRole: assessment.jobRole },
            { jobRole: JobRole.GENERAL },
          ],
        },
      });
      mcqs.push(...this.shuffle(pool).slice(0, count));
    }

    const roleplayPool = await this.prisma.rolePlayBank.findMany({
      where: { 
        OR: [
          { jobRole: assessment.jobRole },
          { jobRole: JobRole.GENERAL },
        ],
      }
    });
    const roleplays = this.shuffle(roleplayPool).slice(0, ROLEPLAY_COUNT);

    const attempt = await this.prisma.assessmentAttempt.create({
      data: { assessmentId, status: AssessmentStatus.NOT_STARTED },
    });

    await this.prisma.assessmentAttemptQuestion.createMany({
      data: mcqs.map((q, i) => ({
        attemptId: attempt.id,
        questionId: q.id,
        displayOrder: i + 1,
      })),
    });

    await this.prisma.assessmentAttemptRolePlay.createMany({
      data: roleplays.map((q, i) => ({
        attemptId: attempt.id,
        questionId: q.id,
        displayOrder: i + 1,
      })),
    });

    await this.prisma.assessmentAttempt.update({
      where: { id: attempt.id },
      data: { applicationId },
    });

    return { attemptId: attempt.id };
  }

  /*
   |--------------------------------------------------------------------------
   | Attempt MCQs
   |--------------------------------------------------------------------------
   */

  async getAttemptQuestions(
    attemptId: string,
  ) {
    return this.prisma.assessmentAttempt.findUnique({
      where: {
        id: attemptId,
      },

      include: {
        assessment: true,

        generatedQuestions: {
          orderBy: {
            displayOrder: 'asc',
          },

          include: {
            question: {
              include: {
                options: true,
              },
            },
          },
        },
      },
    });
  }

  /*
   |--------------------------------------------------------------------------
   | Attempt Roleplays
   |--------------------------------------------------------------------------
   */

  async getAttemptRolePlays(
    attemptId: string,
  ) {
    return this.prisma.assessmentAttempt.findUnique({
      where: {
        id: attemptId,
      },

      include: {
        assessment: true,

        generatedRolePlays: {
          orderBy: {
            displayOrder: 'asc',
          },

          include: {
            question: true,
          },
        },
      },
    });
  }

  /*
   |--------------------------------------------------------------------------
   | Submission
   |--------------------------------------------------------------------------
   */

  async getAttemptForSubmission(
    attemptId: string,
  ) {
    return this.prisma.assessmentAttempt.findUnique({
      where: {
        id: attemptId,
      },

      include: {
        assessment: {
          include: {
            job: true,
          },
        },
  
        application: {
          include: {
            candidate: true,
          },
        },

        generatedQuestions: {
          include: {
            question: {
              include: {
                options: true,
              },
            },
          },
          orderBy: {
            displayOrder: 'asc',
          },
        },

        generatedRolePlays: {
          include: {
            question: true,
          },
          orderBy: {
            displayOrder: 'asc',
          },
        },
      },
    });
  }
}