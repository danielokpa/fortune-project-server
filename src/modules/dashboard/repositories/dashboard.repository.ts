import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class DashboardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary() {
    const [patientsCount, alertsCount, devicesCount, readingsCount] =
      await Promise.all([
        this.prisma.patient.count(),
        this.prisma.alert.count({ where: { status: 'ACTIVE' } }),
        this.prisma.device.count(),
        this.prisma.healthReading.count(),
      ]);

    return {
      patientsCount,
      alertsCount,
      devicesCount,
      readingsCount,
    };
  }

  async getLatestReadings(limit = 5) {
    return this.prisma.healthReading.findMany({
      take: limit,
      orderBy: { recordedAt: 'desc' },
      include: {
        patient: { select: { firstName: true, lastName: true } },
      },
    });
  }

  async getActiveAlerts(limit = 5) {
    return this.prisma.alert.findMany({
      where: { status: 'ACTIVE' },
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        patient: { select: { firstName: true, lastName: true } },
      },
    });
  }
}
