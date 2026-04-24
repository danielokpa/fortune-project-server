import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Trip, TripStatus } from '../entities/trip.entity';
import { Op } from 'sequelize';
import { VehicleRegistration } from 'src/modules/drivers/entities/vehicle-registration.entity';

@Injectable()
export class TripRepository {
  constructor(
    @InjectModel(Trip)
    private readonly tripModel: typeof Trip,
    @InjectModel(VehicleRegistration)
    private readonly vehicleRegistrationModel: typeof VehicleRegistration,
  ) { }

  async create(data: Partial<Trip>): Promise<Trip> {
    return await this.tripModel.create(data as any);
  }

  async findById(id: string): Promise<Trip | null> {
    return await this.tripModel.findByPk(id, {
      include: ['user', 'driver'],
    });
  }


  async findUserActiveTrip(userId: string): Promise<any | null> {
    const trip = await this.tripModel.findOne({
      where: {
        userId,
        status: {
          [Op.in]: [
            TripStatus.TRIP_BOOKED,
            TripStatus.TRIP_ASSIGNED,
            TripStatus.DRIVER_ACCEPTED,
            TripStatus.DRIVER_ARRIVED,
            TripStatus.TRIP_RE_ASSIGN,
            TripStatus.TRIP_STARTED,
          ],
        },
      },
      include: [
        {
          association: 'user',
          attributes: ['id', 'fullName', 'email', 'phoneNo', 'imageUrl'],
        },
        {
          association: 'driver',
          attributes: ['id', 'fullName', 'email', 'phoneNo', 'profileImageUrl'],
          required: false,
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    if (trip) {
      const vehicleRegistration = await this.vehicleRegistrationModel.findOne({
        where: { driverId: trip.driverId },
        attributes: ['id', 'brandOfVehicle', 'color', 'makeOfVehicle', 'plateNo'],
      });

      return { ...trip.toJSON(), vehicleRegistration: vehicleRegistration?.toJSON(), driverRating: 0, userRating: 0 };
    }

    return null;
  }

  async findDriverActiveTrip(driverId: string): Promise<any | null> {
    const trip = await this.tripModel.findOne({
      where: {
        driverId,
        status: {
          [Op.in]: [
            TripStatus.TRIP_BOOKED,
            TripStatus.TRIP_ASSIGNED,
            TripStatus.DRIVER_ACCEPTED,
            // TripStatus.DRIVER_ARRIVED,
            TripStatus.TRIP_RE_ASSIGN,
            TripStatus.TRIP_STARTED,
          ],
        },
      },
      include: [
        {
          association: 'user',
          attributes: ['id', 'fullName', 'email', 'phoneNo', 'imageUrl'],
        },
        {
          association: 'driver',
          attributes: ['id', 'fullName', 'email', 'phoneNo', 'profileImageUrl'],
          required: false,
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    if (trip) {
      const vehicleRegistration = await this.vehicleRegistrationModel.findOne({
        where: { driverId: trip.driverId },
        attributes: ['id', 'brandOfVehicle', 'color', 'makeOfVehicle', 'plateNo'],
      });

      return { ...trip.toJSON(), vehicleRegistration: vehicleRegistration?.toJSON(), driverRating: 0, userRating: 0 };
    }

    return null;
  }

  async findAll(options?: {
    limit?: number;
    offset?: number;
    userId?: string;
    driverId?: string;
    status?: TripStatus;
  }): Promise<Trip[]> {
    return await this.tripModel.findAll({
      where: {
        ...(options?.userId && { userId: options.userId }),
        ...(options?.driverId && { driverId: options.driverId }),
        ...(options?.status && { status: options.status }),
      },
      include: ['user', 'driver'],
      limit: options?.limit,
      offset: options?.offset,
      order: [['createdAt', 'DESC']],
    });
  }


}

