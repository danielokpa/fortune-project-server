import { Model } from 'sequelize-typescript';
import { UserChargingStation } from './user-charging-station.entity';
export declare class ChargingStation extends Model<ChargingStation> {
    id: string;
    name: string;
    country: string;
    state: string;
    address: string;
    contactPhone: string;
    openingTime: string;
    closingTime: string;
    amountPerUnit: number;
    currency: string;
    amountPerUnitType: string;
    contactEmail: string;
    isActive: boolean;
    longitude: number;
    latitude: number;
    stationImage: string;
    userChargingStations: UserChargingStation[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
