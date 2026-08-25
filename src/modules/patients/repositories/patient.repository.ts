import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Patient, Prisma } from '@prisma/client';
import { CursorUtil } from 'src/utils/cursor.util';
import { handleDatabaseError } from 'src/utils/db-error-handler.util';
import { PatientFilters } from '../interfaces/patient.interface';

@Injectable()
export class PatientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(patientData: Prisma.PatientUncheckedCreateInput): Promise<Patient> {
    try {
      const patient = await this.prisma.patient.create({
        data: patientData,
      });

      if (!patient) {
        throw new InternalServerErrorException('Failed to create patient');
      }

      return patient;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findById(id: string): Promise<Patient | null> {
    try {
      const patient = await this.prisma.patient.findUnique({
        where: { id },
      });

      if (!patient) {
        throw new NotFoundException('Patient not found');
      }

      return patient;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async update(id: string, patientData: Prisma.PatientUpdateInput): Promise<Patient> {
    try {
      const existingPatient = await this.prisma.patient.findUnique({
        where: { id },
      });

      if (!existingPatient) {
        throw new NotFoundException('Patient not found');
      }

      const updatedPatient = await this.prisma.patient.update({
        where: { id },
        data: patientData,
      });

      return updatedPatient;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const existingPatient = await this.prisma.patient.findUnique({
        where: { id },
      });

      if (!existingPatient) {
        throw new NotFoundException('Patient not found');
      }

      await this.prisma.patient.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findAll(filters: PatientFilters): Promise<Patient[]> {
    try {
        const where = this.buildWhereClause(filters);

        const patients = await this.prisma.patient.findMany({
        where,
        take: filters.limit + 1,
        orderBy: [
            { createdAt: 'desc' },
            { id: 'desc' },
        ],
        });

        if (!patients || patients.length === 0) {
        throw new NotFoundException('Patients not found');
        }

        return patients;
    } catch (error) {
        handleDatabaseError(error);
    }
    }

    private buildWhereClause(filters: PatientFilters): Prisma.PatientWhereInput {
    const andConditions: Prisma.PatientWhereInput[] = [];

    /**
     * ---------------------------------------------------------
     * Search
     * ---------------------------------------------------------
     */
    if (filters.search?.trim()) {
        const keyword = filters.search.trim();

        andConditions.push({
        OR: [
            {
            firstName: {
                contains: keyword,
                mode: 'insensitive',
            },
            },
            {
            lastName: {
                contains: keyword,
                mode: 'insensitive',
            },
            },
            {
            contact: {
                contains: keyword,
                mode: 'insensitive',
            },
            },
        ],
        });
    }

    /**
     * ---------------------------------------------------------
     * Cursor Pagination (Keyset Pagination)
     * ---------------------------------------------------------
     */
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


  async getPatientSummary(id: string): Promise<any> {
    try {
      const patient = await this.prisma.patient.findUnique({
        where: { id },
        include: {
          readings: {
            orderBy: { recordedAt: 'desc' },
            take: 1,
          },
          alerts: {
            where: { status: 'ACTIVE' },
            orderBy: { createdAt: 'desc' },
          },
        },
      });

      if (!patient) {
        throw new NotFoundException('Patient not found');
      }

      const latestReading = patient.readings[0] || null;
      const activeAlerts = patient.alerts || [];

      return {
        ...patient,
        latestReading,
        activeAlerts,
      };
    } catch (error) {
      handleDatabaseError(error);
    }
  }
}
