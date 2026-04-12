import { Vehicle } from '../entities/vehicle.entity';
import { FindOptions, Transaction } from 'sequelize';
export declare class VehicleRepository {
    private vehicleModel;
    constructor(vehicleModel: typeof Vehicle);
    create(data: Partial<Vehicle>, options?: {
        transaction?: Transaction;
    }): Promise<Vehicle>;
    findByPk(id: string, opts?: FindOptions<Vehicle>): Promise<Vehicle | null>;
    findPeppFleet(where: {
        fleetStatus?: string;
    }): Promise<Vehicle[]>;
    updateById(id: string, patch: Partial<Vehicle>): Promise<[number, Vehicle[]]>;
}
