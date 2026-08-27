// patient.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, Patient } from '@prisma/client';
import { PatientRepository } from '../repositories/patient.repository';
import { CursorUtil } from 'src/utils/cursor.util';
import { PatientFilters } from '../interfaces/patient.interface';
import { GetPatientsDto, UpdatePatientDto } from '../dto/patient.dto';

@Injectable()
export class PatientService {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly configService: ConfigService,
  ) {}

  async create(patientData: Prisma.PatientUncheckedCreateInput): Promise<Patient> {
    const patient = await this.patientRepository.create(patientData);
    if (!patient) throw new NotFoundException('Failed to create patient');
    return patient;
  }


  async fetchPatient(id: string): Promise<Partial<Patient>> {
    const patient = await this.patientRepository.findById(id);

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return patient;
  }

  async findAll(params: GetPatientsDto) {
    const filters: PatientFilters = {
      cursor: params.cursor,
      limit: params.limit,
      search: params.search,
    };

    const patients = await this.patientRepository.findAll(filters);
    const hasNextPage = patients.length > filters.limit;

    if (hasNextPage) patients.pop();
    const lastItem = patients[patients.length - 1];

    const nextCursor =
      hasNextPage && lastItem
        ? CursorUtil.encode({
            createdAt: lastItem.createdAt.toISOString(),
            id: lastItem.id,
          })
        : null;

    return {
      items: patients,
      pagination: {
        limit: filters.limit,
        hasNextPage,
        nextCursor,
      },
    };
  }

  async update(
    id: string,
    patientData: Prisma.PatientUncheckedUpdateInput,
  ): Promise<Patient> {
    const data = await this.patientRepository.update(id, patientData);
    if (!data) throw new NotFoundException('Failed to update patient');
    return data;
  }

  async deletePatient(patientId: string): Promise<boolean> {
    const deleted = await this.patientRepository.delete(patientId);
    if (!deleted) return false;
    return true;
  }

  async getSummary(id: string): Promise<any> {
    const summary = await this.patientRepository.getPatientSummary(id);
    if (!summary) throw new NotFoundException('Patient summary not found');
    return summary;
  }
}
