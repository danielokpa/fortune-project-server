import { Injectable, NotFoundException } from '@nestjs/common';
import { Threshold, Prisma } from '@prisma/client';
import { ThresholdRepository } from '../repositories/threshold.repository';
import { CreateThresholdDto, UpdateThresholdDto } from '../dto/threshold.dto';

@Injectable()
export class ThresholdService {
  constructor(private readonly thresholdRepository: ThresholdRepository) {}

  async createThreshold(dto: CreateThresholdDto): Promise<Threshold> {
    const threshold = await this.thresholdRepository.create(dto);
    if (!threshold) throw new NotFoundException('Failed to create threshold');
    return threshold;
  }

  async getThreshold(patientId: string): Promise<Threshold> {
    const threshold = await this.thresholdRepository.findByPatientId(patientId);
    if (!threshold) {
      // Return defaults if none exist
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
  }

  async updateThreshold(patientId: string, dto: UpdateThresholdDto): Promise<Threshold> {
    const updated = await this.thresholdRepository.update(patientId, dto);
    if (!updated) throw new NotFoundException('Failed to update threshold');
    return updated;
  }
}
