// health-reading.repository.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { HealthReading, Prisma } from '@prisma/client';
import { CursorUtil } from 'src/utils/cursor.util';
import { handleDatabaseError } from 'src/utils/db-error-handler.util';
import { ReadingFilters } from '../interfaces/health-reading.interface';

@Injectable()
export class HealthReadingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(readingData: Prisma.HealthReadingUncheckedCreateInput): Promise<HealthReading> {
    try {
      const reading = await this.prisma.healthReading.create({
        data: readingData,
      });

      if (!reading) {
        throw new InternalServerErrorException('Failed to create health reading');
      }

      return reading;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findById(id: string): Promise<HealthReading | null> {
    try {
      const reading = await this.prisma.healthReading.findUnique({
        where: { id },
        include: {
          patient: true,
          device: true,
          alerts: true,
        },
      });

      if (!reading) {
        throw new NotFoundException('Health reading not found');
      }

      return reading;
    } catch (error) {
      handleDatabaseError(error);
    }
  }
  
  async findByPatientId(patientId: string): Promise<HealthReading[]> {
    try {
      const readings = await this.prisma.healthReading.findMany({
        where: { patientId },
        orderBy: { recordedAt: 'desc' },
        include: {
          device: true,
          alerts: true,
        },
      });

      if (!readings || readings.length === 0) {
        throw new NotFoundException('No readings found for this patient');
      }

      return readings;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findAll(filters: ReadingFilters): Promise<HealthReading[]> {
    try {
      const where = this.buildWhereClause(filters);

      const readings = await this.prisma.healthReading.findMany({
        where,
        take: filters.limit + 1,
        orderBy: [
          { recordedAt: 'desc' },
          { id: 'desc' },
        ],
        include: {
          patient: true,
          device: true,
          alerts: true,
        },
      });

      if (!readings || readings.length === 0) {
        throw new NotFoundException('No health readings found');
      }

      return readings;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  private buildWhereClause(filters: ReadingFilters): Prisma.HealthReadingWhereInput {
    const andConditions: Prisma.HealthReadingWhereInput[] = [];

    // Patient filter
    if (filters.patientId) {
      andConditions.push({ patientId: filters.patientId });
    }

    // Search filter (heartRate or temperature)
    if (filters.search?.trim()) {
      const keyword = filters.search.trim();
      const parsedValue = parseFloat(keyword);

      if (!isNaN(parsedValue)) {
        andConditions.push({
          OR: [
            { heartRate: parsedValue },
            { temperature: parsedValue },
          ],
        });
      }
    }

    // Cursor pagination
    if (filters.cursor) {
      const cursor = CursorUtil.decode(filters.cursor);
      const cursorDate = cursor?.recordedAt ? new Date(cursor.recordedAt) : undefined;

      andConditions.push({
        OR: [
          {
            recordedAt: { lt: cursorDate },
          },
          {
            AND: [
              { recordedAt: cursorDate },
              { id: { lt: cursor?.id } },
            ],
          },
        ],
      });
    }

    return andConditions.length > 0 ? { AND: andConditions } : {};
  }
}
