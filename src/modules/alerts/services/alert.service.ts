import { Injectable, NotFoundException } from '@nestjs/common';
import { Alert } from '@prisma/client';
import { AlertRepository } from '../repositories/alert.repository';
import { CursorUtil } from 'src/utils/cursor.util';
import { AlertFilters } from '../interfaces/alert.interface';
import { GetAlertsDto } from '../dto/alert.dto';

@Injectable()
export class AlertService {
  constructor(private readonly alertRepository: AlertRepository) {}

  async fetchAlert(id: string): Promise<Alert> {
    const alert = await this.alertRepository.findById(id);
    if (!alert) throw new NotFoundException('Alert not found');
    return alert;
  }

  async findAll(params: GetAlertsDto) {
    const filters: AlertFilters = {
      patientId: params.patientId,
      status: params.status,
      cursor: params.cursor,
      limit: params.limit,
    };

    const alerts = await this.alertRepository.findAll(filters);
    const hasNextPage = alerts.length > filters.limit;

    if (hasNextPage) alerts.pop();
    const lastItem = alerts[alerts.length - 1];

    const nextCursor =
      hasNextPage && lastItem
        ? CursorUtil.encode({
            createdAt: lastItem.createdAt.toISOString(),
            id: lastItem.id,
          })
        : null;

    return {
      items: alerts,
      pagination: {
        limit: filters.limit,
        hasNextPage,
        nextCursor,
      },
    };
  }

  async resolveAlert(id: string): Promise<Alert> {
    const resolved = await this.alertRepository.resolve(id);
    if (!resolved) throw new NotFoundException('Failed to resolve alert');
    return resolved;
  }
}
