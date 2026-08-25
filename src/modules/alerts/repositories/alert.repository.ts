// alert.repository.ts
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Alert, Prisma, AlertStatus } from '@prisma/client';
import { CursorUtil } from 'src/utils/cursor.util';
import { handleDatabaseError } from 'src/utils/db-error-handler.util';
import { AlertFilters } from '../interfaces/alert.interface';

@Injectable()
export class AlertRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Alert | null> {
    try {
      const alert = await this.prisma.alert.findUnique({
        where: { id },
        include: {
          patient: true,
          reading: true,
        },
      });

      if (!alert) {
        throw new NotFoundException('Alert not found');
      }

      return alert;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findAll(filters: AlertFilters): Promise<Alert[]> {
    try {
      const where = this.buildWhereClause(filters);

      const alerts = await this.prisma.alert.findMany({
        where,
        take: filters.limit + 1,
        orderBy: [
          { createdAt: 'desc' },
          { id: 'desc' },
        ],
        include: {
          patient: true,
          reading: true,
        },
      });

      if (!alerts || alerts.length === 0) {
        throw new NotFoundException('Alerts not found');
      }

      return alerts;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async resolve(id: string): Promise<Alert> {
    try {
      const existingAlert = await this.prisma.alert.findUnique({
        where: { id },
      });

      if (!existingAlert) {
        throw new NotFoundException('Alert not found');
      }

      const resolvedAlert = await this.prisma.alert.update({
        where: { id },
        data: { status: AlertStatus.RESOLVED },
      });

      return resolvedAlert;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  private buildWhereClause(filters: AlertFilters): Prisma.AlertWhereInput {
    const andConditions: Prisma.AlertWhereInput[] = [];

    // Patient filter
    if (filters.patientId) {
      andConditions.push({ patientId: filters.patientId });
    }

    // Status filter
    if (filters.status) {
      andConditions.push({ status: filters.status as AlertStatus });
    }

    // Cursor pagination
    if (filters.cursor) {
      const cursor = CursorUtil.decode(filters.cursor);
      const cursorDate = cursor?.createdAt ? new Date(cursor.createdAt) : undefined;

      andConditions.push({
        OR: [
          {
            createdAt: { lt: cursorDate },
          },
          {
            AND: [
              { createdAt: cursorDate },
              { id: { lt: cursor?.id } },
            ],
          },
        ],
      });
    }

    return andConditions.length > 0 ? { AND: andConditions } : {};
  }
}
