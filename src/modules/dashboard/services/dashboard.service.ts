import { Injectable } from '@nestjs/common';
import { DashboardRepository } from '../repositories/dashboard.repository';

@Injectable()
export class DashboardService {
  constructor(private readonly dashboardRepo: DashboardRepository) {}

  async getDashboardSummary() {
    const [summary, latestReadings, activeAlerts] = await Promise.all([
      this.dashboardRepo.getSummary(),
      this.dashboardRepo.getLatestReadings(),
      this.dashboardRepo.getActiveAlerts(),
    ]);

    return {
      metrics: {
        totalPatients: summary.patientsCount,
        activeAlerts: summary.alertsCount,
        activeDevices: summary.devicesCount,
        healthReadings: summary.readingsCount,
      },
      monitoringOverview: {
        latestReadings,
      },
      activeAlerts,
    };
  }
}
