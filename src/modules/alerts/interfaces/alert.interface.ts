import { AlertStatus } from '@prisma/client';

export interface AlertFilters {
  patientId?: string;
  status?: AlertStatus;
  cursor?: string;
  limit: number;
}
