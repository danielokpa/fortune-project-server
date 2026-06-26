import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { handleDatabaseError } from 'src/utils/db-error-handler.util';

@Injectable()
export class CandidateRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  /*
   |--------------------------------------------------------------------------
   | Candidate
   |--------------------------------------------------------------------------
   */

  async findByEmail(email: string) {
    try {
      return await this.prisma.candidate.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  // async create(data: Prisma.CandidateCreateInput) {
  //   try {
  //     return await this.prisma.candidate.create({
  //       data,
  //     });
  //   } catch (error) {
  //     handleDatabaseError(error);
  //   }
  // }
}