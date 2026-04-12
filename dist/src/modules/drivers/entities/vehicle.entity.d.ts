import { Model } from 'sequelize-typescript';
import { Driver } from './driver.entity';
export declare class Vehicle extends Model<Vehicle> {
    id: string;
    driverId: string;
    driver: Driver;
    licenseNumber: string;
    registrationImageUrl: string;
    brand: string;
    color: string;
    plateNumber: string;
    imagePlateNumber: string;
    year: string;
    vinNumber: string;
    isPeppcruiseVehicle: boolean;
    capacity: number | null;
    region: string | null;
    fleetStatus: string;
    expiryDate: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
