import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma, JobStatus, ApplicationStatus } from '@prisma/client';
import { handleDatabaseError } from 'src/utils/db-error-handler.util';
import { ICreateCandidate } from '../../candidates/interfaces/candidate.interface';

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
}