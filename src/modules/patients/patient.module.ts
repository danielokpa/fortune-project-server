import { Module } from '@nestjs/common';
import { PatientService } from './services/patient.service';
import { PatientRepository } from './repositories/patient.repository';
import { PatientController } from './controllers/patient.controller';

@Module({
  imports: [],
  controllers: [PatientController],
  providers: [PatientService, PatientRepository],
  exports: [PatientService, PatientRepository],
})
export class PatientsModule {}
