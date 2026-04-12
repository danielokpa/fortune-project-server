import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vehicle } from '../entities/vehicle.entity';
import { Driver } from '../entities/driver.entity';
import { FindOptions, Transaction } from 'sequelize';

@Injectable()
export class VehicleRepository {
  constructor(
    @InjectModel(Vehicle)
    private vehicleModel: typeof Vehicle,
  ) {}

  async create(
    data: Partial<Vehicle>,
    options?: { transaction?: Transaction },
  ): Promise<Vehicle> {
    const row = await this.vehicleModel.create(data as Vehicle, {
      transaction: options?.transaction,
    });
    return row;
  }

  async findByPk(
    id: string,
    opts?: FindOptions<Vehicle>,
  ): Promise<Vehicle | null> {
    return this.vehicleModel.findByPk(id, opts);
  }

  async findPeppFleet(
    where: { fleetStatus?: string },
  ): Promise<Vehicle[]> {
    const clause: Record<string, unknown> = {
      isPeppcruiseVehicle: true,
    };
    if (where.fleetStatus) {
      clause['fleetStatus'] = where.fleetStatus;
    }
    return this.vehicleModel.findAll({
      where: clause,
      include: [
        {
          model: Driver,
          attributes: ['id', 'fullName', 'phoneNo', 'email'],
          required: false,
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  async updateById(
    id: string,
    patch: Partial<Vehicle>,
  ): Promise<[number, Vehicle[]]> {
    return this.vehicleModel.update(patch, { where: { id }, returning: true });
  }
}
