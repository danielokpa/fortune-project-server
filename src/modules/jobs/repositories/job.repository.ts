import { Injectable } from '@nestjs/common';
import {
  Prisma,
  JobStatus,
} from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { handleDatabaseError } from 'src/utils/db-error-handler.util';

@Injectable()
export class JobRepository {
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
      return await this.prisma.job.findMany({
        where: {
          status: JobStatus.PUBLISHED,
        },
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
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

  async findById(id: string) {
    try {
      const job = await this.prisma.job.findUnique({
        where: {
          id,
        },

        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
        },
      });
      return job;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  // async findPublishedById(id: string) {
  //   try {
  //     return await this.prisma.job.findFirst({
  //       where: {
  //         id,
  //         status: JobStatus.PUBLISHED,
  //       },
  //       select: {
  //         id: true,
  //         title: true,
  //       },
  //     });
  //   } catch (error) {
  //     handleDatabaseError(error);
  //   }
  // }
}