import { Injectable } from '@nestjs/common';
import {
  Prisma,
  QuestionCategory,
  AssessmentStatus,
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

  async generateAttempt(
    assessmentId: string,
    applicationId: string,
  ) {
    const assessment =
      await this.prisma.assessment.findUnique({
        where: {
          id: assessmentId,
        },
      });

    if (!assessment) {
      return null;
    }

    /*
     * Random MCQs by category
     */

    const professional =
      await this.prisma.questionBank.findMany({
        where: {
          category:
            QuestionCategory.PROFESSIONAL_ATTITUDE,
        },

        take: 20,

        orderBy: {
          createdAt: 'asc',
        },
      });

    const emotional =
      await this.prisma.questionBank.findMany({
        where: {
          category:
            QuestionCategory.EMOTIONAL_INTELLIGENCE,
        },

        take: 20,

        orderBy: {
          createdAt: 'asc',
        },
      });

    const customer =
      await this.prisma.questionBank.findMany({
        where: {
          category:
            QuestionCategory.CUSTOMER_SERVICE,
        },

        take: 20,

        orderBy: {
          createdAt: 'asc',
        },
      });

    const safety =
      await this.prisma.questionBank.findMany({
        where: {
          category:
            QuestionCategory.SAFETY,
        },

        take: 20,

        orderBy: {
          createdAt: 'asc',
        },
      });

    const availability =
      await this.prisma.questionBank.findMany({
        where: {
          category:
            QuestionCategory.AVAILABILITY,
        },

        take: 10,

        orderBy: {
          createdAt: 'asc',
        },
      });

    const mcqs = [
      ...professional,
      ...emotional,
      ...customer,
      ...safety,
      ...availability,
    ];

    const roleplays =
      await this.prisma.rolePlayBank.findMany({
        take: 20,
      });

    const attempt =
      await this.prisma.assessmentAttempt.create({
        data: {
          assessmentId,

          status: AssessmentStatus.NOT_STARTED,
        },
      });

    await this.prisma.assessmentAttemptQuestion.createMany({
      data: mcqs.map(
        (question, index) => ({
          attemptId: attempt.id,

          questionId:
            question.id,

          displayOrder:
            index + 1,
        }),
      ),
    });

    await this.prisma.assessmentAttemptRolePlay.createMany({
      data: roleplays.map(
        (question, index) => ({
          attemptId: attempt.id,

          questionId:
            question.id,

          displayOrder:
            index + 1,
        }),
      ),
    });
    await this.prisma.application.update({
      where: {
        id: applicationId,
      },
      data: {
        assessmentAttempt: {
          connect: {
            id: attempt.id,
          },
        },
      }
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