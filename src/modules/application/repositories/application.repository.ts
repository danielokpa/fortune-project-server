import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma, JobStatus, ApplicationStatus, AssessmentStatus, CandidateClassification, JobRole, DocumentType } from '@prisma/client';
import { handleDatabaseError } from 'src/utils/db-error-handler.util';
import { applicationInclude, applicationIncludeDetails } from '../constants/application.constants';
import { ICreateCandidate } from '../../candidates/interfaces/candidate.interface';
import { CursorUtil } from 'src/utils/cursor.util';
import { ApplicationFilters } from '../interfaces/application.interface';


@Injectable()
export class ApplicationRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async createApplication(dto: ICreateCandidate) {
    try {
      const email = dto.email.trim().toLowerCase();

      return this.prisma.$transaction(async (tx) => {

        /**
         * 1. Verify Job
         */
        const job = await tx.job.findFirst({
          where: {
            id: dto.jobId,
            status: JobStatus.PUBLISHED,
          },
          select: {
            id: true,
            title: true,
          },
        });

        if (!job) {
          throw new NotFoundException('Job not found.');
        }

        /**
         * 2. Upsert Candidate
         */
        const candidate = await tx.candidate.upsert({
          where: {
            email,
          },

          create: {
            fullName: dto.fullName,
            email,
            phone: dto.phone,
            whatsapp: dto.whatsapp,
            residentialAddress: dto.residentialAddress,
            gender: dto.gender,
            dateOfBirth: dto.dateOfBirth,
            stateOfOrigin: dto.stateOfOrigin,
            currentLocation: dto.currentLocation ?? 'null',
            highestQualification: dto.highestQualification,
            yearsOfExperience: dto.yearsOfExperience,
          },

          update: {
            /**
             * Decide what should be updated.
             * Maybe phone changes.
             * Maybe address changes.
             *
             * Usually DON'T overwrite everything.
             */
            phone: dto.phone,
            whatsapp: dto.whatsapp,
            residentialAddress: dto.residentialAddress,
            currentLocation: dto.currentLocation,
          },
        });

        /**
         * 2.5. Save Candidate Documents
         */
        const documents = dto.candidateDocuments;

        const documentOperations = [
          {
            type: DocumentType.PHOTO,
            fileUrl: documents.photoUrl,
          },
          {
            type: DocumentType.CV,
            fileUrl: documents.cvUrl,
          },
          {
            type: DocumentType.DRIVERS_LICENSE,
            fileUrl: documents.driversLicenseUrl,
          },
          {
            type: DocumentType.NYSC,
            fileUrl: documents.nyscUrl,
          },
        ]
          .filter((document) => !!document.fileUrl)
          .map((document) =>
            tx.candidateDocument.upsert({
              where: {
                candidateId_type: {
                  candidateId: candidate.id,
                  type: document.type,
                },
              },
              create: {
                candidateId: candidate.id,
                type: document.type,
                fileUrl: document.fileUrl!,
              },
              update: {
                fileUrl: document.fileUrl!,
              },
            }),
          );

        await Promise.all(documentOperations);

        /**
         * 3. Create Application
         */

        const application =
          await tx.application.create({
            data: {
              jobId: dto.jobId,
              candidateId: candidate.id,
              status: ApplicationStatus.ASSESSMENT_PENDING,
            },

            include: {
              job: true,
            },

          });
          
          await tx.applicationStatusHistory.create({
            data: {
              applicationId: application.id,
              status:
                ApplicationStatus.ASSESSMENT_PENDING,
            },
          });

          return {
            candidate,
            application,
          };
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
          const target = error.meta?.target as string[];

          if (
              target?.includes('jobId') &&
              target?.includes('candidateId')
          ) {
              throw new ConflictException(
                  'Candidate has already applied for this job.',
              );
          }
      }

      handleDatabaseError(error);
    }
  }

  async findApplication(applicationId: string) {
    try {
      const application =
        await this.prisma.application.findUnique({
          where: {
            id: applicationId,
          },
          select: {
            id: true,
            candidateId: true,
            jobId: true,
          },
        });

      if (!application) {
        throw new NotFoundException(
          'Application not found',
        );
      }
      return application;
    } catch (error) {
      handleDatabaseError(error);
    }
  } 

  
  /*
   |--------------------------------------------------------------------------
   | Applications
   |--------------------------------------------------------------------------
   */

  async findApplications(filters: ApplicationFilters) {
    try {
      const where = this.buildWhereClause(filters);

      return await this.prisma.application.findMany({
        where,

        take: filters.limit + 1,

        orderBy: [
          {
            createdAt: 'desc',
          },
          {
            id: 'desc',
          },
        ],

        include: applicationInclude
      });
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  private buildWhereClause(
    filters: ApplicationFilters,
  ): Prisma.ApplicationWhereInput {
    const andConditions: Prisma.ApplicationWhereInput[] = [];

    /**
     * ---------------------------------------------------------
     * Search
     * ---------------------------------------------------------
     */

    if (filters.search?.trim()) {
      const keyword = filters.search.trim();

      andConditions.push({
        OR: [
          {
            candidate: {
              fullName: {
                contains: keyword,
                mode: 'insensitive',
              },
            },
          },
          {
            candidate: {
              email: {
                contains: keyword,
                mode: 'insensitive',
              },
            },
          },
          {
            candidate: {
              phone: {
                contains: keyword,
                mode: 'insensitive',
              },
            },
          },
        ],
      });
    }

    /**
     * ---------------------------------------------------------
     * Job Role
     * ---------------------------------------------------------
     */

    if (filters.jobSlugs?.length) {
      andConditions.push({
        job: {
          slug: {
            in: filters.jobSlugs,
          },
        },
      });
    }

    /**
     * ---------------------------------------------------------
     * Application Status
     * ---------------------------------------------------------
     */

    if (filters.applicationStatus) {
      andConditions.push({
        status: filters.applicationStatus,
      });
    }

    /**
     * ---------------------------------------------------------
     * Candidate Classification
     * ---------------------------------------------------------
     */

    if (filters.classification) {
      andConditions.push({
        classification: filters.classification,
      });
    }

    /**
     * ---------------------------------------------------------
     * Assessment Filters
     * ---------------------------------------------------------
     */

    if (
      filters.assessmentStatus ||
      filters.passedOnly !== undefined
    ) {
      const assessmentFilter: Prisma.AssessmentAttemptWhereInput = {};

      if (filters.assessmentStatus) {
        assessmentFilter.status = filters.assessmentStatus;
      }

      if (filters.passedOnly === true) {
        assessmentFilter.passed = true;
      }

      andConditions.push({
        assessmentAttempt: {
          is: assessmentFilter,
        },
      });
    }

    /**
     * ---------------------------------------------------------
     * Cursor Pagination (Keyset Pagination)
     * ---------------------------------------------------------
     */

    if (filters.cursor) {
      const cursor = CursorUtil.decode(filters.cursor);

      const cursorDate = cursor?.createdAt ? new Date(cursor.createdAt) : undefined;

      andConditions.push({
        OR: [
          {
            createdAt: {
              lt: cursorDate,
            },
          },
          {
            AND: [
              {
                createdAt: cursorDate,
              },
              {
                id: {
                  lt: cursor?.id,
                },
              },
            ],
          },
        ],
      });
    }

    /**
     * ---------------------------------------------------------
     * Final Where Clause
     * ---------------------------------------------------------
     */

    if (!andConditions.length) {
      return {};
    }

    return {
      AND: andConditions,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Find One
  |--------------------------------------------------------------------------
  */

  async findApplicationById(id: string) {
    try {
      return await this.prisma.application.findUnique({
        where: {
          id,
        },

        include: applicationIncludeDetails,
      });
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Dashboard Summary
  |--------------------------------------------------------------------------
  */

  async getDashboardSummary() {
    try {
      const [
        totalApplications,
        assessmentCompleted,
        interview,
        hired,
        rejected,
        passing,
      ] = await this.prisma.$transaction([
        this.prisma.application.count(),

        this.prisma.application.count({
          where: {
            assessmentAttempt: {
              is: {
                status: AssessmentStatus.COMPLETED,
              },
            },
          },
        }),

        this.prisma.application.count({
          where: {
            status: ApplicationStatus.INTERVIEW,
          },
        }),

        this.prisma.application.count({
          where: {
            status: ApplicationStatus.HIRED,
          },
        }),

        this.prisma.application.count({
          where: {
            status: ApplicationStatus.REJECTED,
          },
        }),

        this.prisma.application.count({
          where: {
            assessmentAttempt: {
              is: {
                passed: true,
              },
            },
          },
        }),
      ]);

      return {
        totalApplications,
        assessmentCompleted,
        interview,
        hired,
        rejected,
        passing,
      };
    } catch (error) {
      handleDatabaseError(error);
    }
  }
}
