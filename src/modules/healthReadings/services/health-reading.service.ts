// health-reading.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, HealthReading, AlertStatus } from '@prisma/client';
import { HealthReadingRepository } from '../repositories/health-reading.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateReadingDto, GetReadingsDto } from '../dto/health-reading.dto';
import { ReadingFilters } from '../interfaces/health-reading.interface';
import { CursorUtil } from 'src/utils/cursor.util';

@Injectable()
export class HealthReadingService {
  constructor(
    private readonly healthReadingRepository: HealthReadingRepository,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Core creation logic:
   * 1. Validate patientId and deviceId exist
   * 2. Save the reading
   * 3. Check thresholds
   * 4. Create alerts if out of range
   * 5. Return saved reading
   */
  async createReading(dto: CreateReadingDto): Promise<HealthReading> {
    // 1. Validate patientId and deviceId
    const patient = await this.prisma.patient.findUnique({
      where: { id: dto.patientId },
      include: { thresholds: true },
    });
    if (!patient) throw new NotFoundException('Patient not found');

    const device = await this.prisma.device.findUnique({
      where: { id: dto.deviceId },
    });
    if (!device) throw new NotFoundException('Device not found');

    // 2. Save the reading
    const reading = await this.healthReadingRepository.create({
      patientId: dto.patientId,
      deviceId: dto.deviceId,
      heartRate: dto.heartRate,
      temperature: dto.temperature,
    });

    // 3. Check thresholds (patient-specific or defaults)
    // const threshold = patient.thresholds
    //   ? patient.thresholds
    //   : {
    //       minHeartRate: 60,
    //       maxHeartRate: 100,
    //       minTemperature: 36.1,
    //       maxTemperature: 37.5,
    //     };
    const threshold =
      patient.thresholds?.[0] // if thresholds is an array
        ? patient.thresholds[0]
        : {
            minHeartRate: 60,
            maxHeartRate: 100,
            minTemperature: 36.1,
            maxTemperature: 37.5,
          };


    const alertsToCreate: Prisma.AlertUncheckedCreateInput[] = [];

    // 4. Create alerts if out of range
    if (dto.heartRate < threshold.minHeartRate || dto.heartRate > threshold.maxHeartRate) {
      alertsToCreate.push({
        patientId: dto.patientId,
        readingId: reading.id,
        parameter: 'heart_rate',
        value: dto.heartRate,
        status: AlertStatus.ACTIVE,
      });
    }

    if (dto.temperature < threshold.minTemperature || dto.temperature > threshold.maxTemperature) {
      alertsToCreate.push({
        patientId: dto.patientId,
        readingId: reading.id,
        parameter: 'temperature',
        value: dto.temperature,
        status: AlertStatus.ACTIVE,
      });
    }

    if (alertsToCreate.length > 0) {
      await this.prisma.alert.createMany({ data: alertsToCreate });
    }

    // 5. Return saved reading
    return reading;
  }

  async fetchReading(id: string): Promise<HealthReading> {
    const reading = await this.healthReadingRepository.findById(id);
    if (!reading) throw new NotFoundException('Reading not found');
    return reading;
  }

  async findAll(params: GetReadingsDto) {
    const filters: ReadingFilters = {
      patientId: params.patientId,
      cursor: params.cursor,
      limit: params.limit,
      search: params.search,
    };

    const readings = await this.healthReadingRepository.findAll(filters);
    const hasNextPage = readings.length > filters.limit;

    if (hasNextPage) readings.pop();
    const lastItem = readings[readings.length - 1];

    const nextCursor =
      hasNextPage && lastItem
        ? CursorUtil.encode({
            createdAt: lastItem.recordedAt.toISOString(),
            id: lastItem.id,
          })
        : null;

    return {
      items: readings,
      pagination: {
        limit: filters.limit,
        hasNextPage,
        nextCursor,
      },
    };
  }

  async findByPatientId(patientId: string): Promise<HealthReading[]> {
    return this.healthReadingRepository.findByPatientId(patientId);
  }
}

