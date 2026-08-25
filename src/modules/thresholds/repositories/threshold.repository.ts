// threshold.repository.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Threshold, Prisma } from '@prisma/client';
import { handleDatabaseError } from 'src/utils/db-error-handler.util';

@Injectable()
export class ThresholdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(thresholdData: Prisma.ThresholdUncheckedCreateInput): Promise<Threshold> {
    try {
      const threshold = await this.prisma.threshold.create({
        data: thresholdData,
      });

      if (!threshold) {
        throw new InternalServerErrorException('Failed to create threshold');
      }

      return threshold;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findByPatientId(patientId: string): Promise<Threshold> {
    try {
      const threshold = await this.prisma.threshold.findUnique({
        where: { patientId },
      });

      if (!threshold) {
        // Return default values if no custom threshold exists
        return {
          id: 'default',
          patientId,
          minHeartRate: 60,
          maxHeartRate: 100,
          minTemperature: 36.1,
          maxTemperature: 37.5,
        } as Threshold;
      }

      return threshold;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async update(patientId: string, thresholdData: Prisma.ThresholdUpdateInput): Promise<Threshold> {
    try {
      const existingThreshold = await this.prisma.threshold.findUnique({
        where: { patientId },
      });

      if (!existingThreshold) {
        throw new NotFoundException('Threshold not found for patient');
      }

      const updatedThreshold = await this.prisma.threshold.update({
        where: { patientId },
        data: thresholdData,
      });

      return updatedThreshold;
    } catch (error) {
      handleDatabaseError(error);
    }
  }
}
