import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Trip, TripStatus } from '../entities/trip.entity';
import { Op } from 'sequelize';

@Injectable()
export class TripRepository {
  constructor(
    @InjectModel(Trip)
    private readonly tripModel: typeof Trip,
  ) {}

  async create(data: Partial<Trip>): Promise<Trip> {
    return await this.tripModel.create(data as any);
  }

  async findById(id: string): Promise<Trip | null> {
    return await this.tripModel.findByPk(id, {
      include: ['user', 'driver'],
    });
  }

  async findUserActiveTrip(userId: string): Promise<Trip | null> {
    return await this.tripModel.findOne({
      where: {
        userId,
        status: {
          [Op.in]: [TripStatus.PENDING, TripStatus.ACCEPTED, TripStatus.ON_THE_WAY, TripStatus.ARRIVED],
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

  async update(id: string, data: Partial<Trip>): Promise<[number, Trip[]]> {
    return await this.tripModel.update(data, {
      where: { id },
      returning: true,
    });
  }

  async updateStatus(
    id: string,
    status: TripStatus,
  ): Promise<Trip | null> {
    const [affectedCount] = await this.tripModel.update(
      { status },
      { where: { id } },
    );

    if (affectedCount > 0) {
      return await this.findById(id);
    }
    return null;
  }

  async delete(id: string): Promise<number> {
    return await this.tripModel.destroy({
      where: { id },
    });
  }
}

