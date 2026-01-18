import { Model } from 'sequelize-typescript';
import { ChargingStation } from './charging-station.entity';
export declare class ChargingStationRating extends Model<ChargingStationRating> {
    id: string;
    stationId: string;
    chargingStation: ChargingStation;
    userId: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}
