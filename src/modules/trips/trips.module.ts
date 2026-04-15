import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Trip } from './entities/trip.entity';
import { TripRepository } from './repositories/trip.repository';
import { VehicleRegistration } from '../drivers/entities/vehicle-registration.entity';  
import { VehicleRegistrationRepository } from '../drivers/repositories/vehicle-registration.repository';
@Module({
  imports: [SequelizeModule.forFeature([Trip, VehicleRegistration])],
  providers: [TripRepository, VehicleRegistrationRepository],
  exports: [TripRepository, VehicleRegistrationRepository, SequelizeModule],
})
export class TripsModule {}

