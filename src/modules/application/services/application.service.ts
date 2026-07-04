import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, JobRole } from '@prisma/client';
import { ApplicationRepository } from '../repositories/application.repository';
import { GetApplicationsDto } from '../dto/application.dto';
import { ApplicationFilters } from '../interfaces/application.interface';
import { CursorUtil } from '../../../utils/cursor.util';

const JOB_ROLE_SLUG_MAP: Record<JobRole, string[]> = {
  DRIVER: [
    'male-driver',
    'female-driver',
  ],

  CUSTOMER_SUPPORT: [
    'customer-support',
  ],

  ADMIN_EXECUTIVE: [
    'administrative-executive',
  ],

  INVENTORY: [
    'inventory-coordinator',
  ],

  OPERATIONS: [
    'operations-officer',
  ],

  GENERAL: [],
};

@Injectable()
export class ApplicationService {
  constructor(
    private readonly applicationRepository: ApplicationRepository,
  ) {}

  /*
   |--------------------------------------------------------------------------
   | Get Applications
   |--------------------------------------------------------------------------
   */

  async getApplications(dto: GetApplicationsDto) {
    const filters: ApplicationFilters = {
      cursor: dto.cursor,
      limit: dto.limit,
      search: dto.search?.trim(),
      jobSlugs: dto.jobRole
        ? JOB_ROLE_SLUG_MAP[dto.jobRole]
        : undefined,
      applicationStatus: dto.applicationStatus,
      assessmentStatus: dto.assessmentStatus,
      classification: dto.classification,
      passedOnly: dto.passedOnly,
      sortOrder: dto.sortOrder as Prisma.SortOrder,
    };

    const applications =
      await this.applicationRepository.findApplications(filters);

    const hasNextPage = applications.length > filters.limit;

    if (hasNextPage) {
      applications.pop();
    }

    const lastItem = applications[applications.length - 1];

    const nextCursor =
      hasNextPage && lastItem
        ? CursorUtil.encode({
            createdAt: lastItem.createdAt.toISOString(),
            id: lastItem.id,
          })
        : null;

    return {
      items: applications,
      pagination: {
        limit: filters.limit,
        hasNextPage,
        nextCursor,
      },
    };
  }

  /*
   |--------------------------------------------------------------------------
   | Get One Application
   |--------------------------------------------------------------------------
   */

  async getApplication(id: string) {
    const application =
      await this.applicationRepository.findApplicationById(id);

    if (!application) {
      throw new NotFoundException('Application not found.');
    }

    const documents = application.candidate.documents.reduce(
      (acc, document) => {
        acc[document.type] = document.fileUrl;
        return acc;
      },
      {} as Record<string, string>,
    );

    return {
      ...application,
      candidate: {
        ...application.candidate,
        documents,
      },
    };
  }

  /*
   |--------------------------------------------------------------------------
   | Dashboard Summary
   |--------------------------------------------------------------------------
   */

  async getDashboardSummary() {
    return await this.applicationRepository.getDashboardSummary();
  }
}