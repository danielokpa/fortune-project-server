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

  async generateAttempt(
    assessmentId: string,
    applicationId: string,
  ) {
    const assessment =
      await this.prisma.assessment.findUnique({
        where: {
          id: assessmentId,
        },
        select: {
          id: true,
          jobRole: true,
        },
      });

    if (!assessment) {
      return null;
    }

    // =====================================================
    // MCQ CONFIGURATION
    // =====================================================

    const MCQ_COUNTS: Record<QuestionCategory, number> = {
      [QuestionCategory.PROFESSIONAL_ATTITUDE]: 4,
      [QuestionCategory.EMOTIONAL_INTELLIGENCE]: 4,
      [QuestionCategory.CUSTOMER_SERVICE]: 4,
      [QuestionCategory.SAFETY]: 4,
      [QuestionCategory.AVAILABILITY]: 4,
    };

    const RANDOM_ROLEPLAY_COUNT = 7;

    // =====================================================
    // GENERATE MCQs
    // =====================================================

    const mcqs: any[] = [];

    for (const [category, count] of Object.entries(
      MCQ_COUNTS,
    )) {
      if (count <= 0) {
        continue;
      }

      const pool =
        await this.prisma.questionBank.findMany({
          where: {
            category:
              category as QuestionCategory,

            OR: [
              {
                jobRole:
                  assessment.jobRole,
              },
              {
                jobRole: JobRole.GENERAL,
              },
            ],
          },
        });

      const selectedQuestions =
        this.shuffle(pool).slice(0, count);

      mcqs.push(...selectedQuestions);
    }

    // =====================================================
    // GENERATE ROLEPLAY QUESTIONS
    // =====================================================

    let roleplays;

    if (assessment.jobRole === JobRole.DRIVER) {
      // ---------------------------------------------------
      // DRIVER:
      // 2 mandatory + 7 random = 9 total
      // ---------------------------------------------------

      const mandatoryRoleplays =
        await this.prisma.rolePlayBank.findMany({
          where: {
            jobRole: JobRole.DRIVER,
            isMandatory: true,
          },
        });

      const randomRoleplayPool =
        await this.prisma.rolePlayBank.findMany({
          where: {
            jobRole: JobRole.DRIVER,
            isMandatory: false,
          },
        });

      const randomRoleplays =
        this.shuffle(
          randomRoleplayPool,
        ).slice(
          0,
          RANDOM_ROLEPLAY_COUNT,
        );

      roleplays = [
        ...mandatoryRoleplays,
        ...randomRoleplays,
      ];
    } else {
      // ---------------------------------------------------
      // OTHER JOB ROLES:
      // 7 random roleplay questions
      // ---------------------------------------------------

      const roleplayPool =
        await this.prisma.rolePlayBank.findMany({
          where: {
            OR: [
              {
                jobRole:
                  assessment.jobRole,
              },
              {
                jobRole:
                  JobRole.GENERAL,
              },
            ],

            isMandatory: false,
          },
        });

      roleplays =
        this.shuffle(
          roleplayPool,
        ).slice(
          0,
          RANDOM_ROLEPLAY_COUNT,
        );
    }

    // =====================================================
    // CREATE ASSESSMENT ATTEMPT
    // =====================================================

    const attempt =
      await this.prisma.assessmentAttempt.create({
        data: {
          assessmentId,
          status:
            AssessmentStatus.NOT_STARTED,
        },
      });

    // =====================================================
    // SAVE MCQs TO ATTEMPT
    // =====================================================

    await this.prisma.assessmentAttemptQuestion.createMany({
      data: mcqs.map(
        (question, index) => ({
          attemptId:
            attempt.id,

          questionId:
            question.id,

          displayOrder:
            index + 1,
        }),
      ),
    });

    // =====================================================
    // SAVE ROLEPLAY QUESTIONS TO ATTEMPT
    // =====================================================

    await this.prisma.assessmentAttemptRolePlay.createMany({
      data: roleplays.map(
        (question, index) => ({
          attemptId:
            attempt.id,

          questionId:
            question.id,

          displayOrder:
            index + 1,
        }),
      ),
    });

    // =====================================================
    // LINK ATTEMPT TO APPLICATION
    // =====================================================

    await this.prisma.assessmentAttempt.update({
      where: {
        id: attempt.id,
      },

      data: {
        applicationId,
      },
    });

    return {
      attemptId: attempt.id,
    };
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