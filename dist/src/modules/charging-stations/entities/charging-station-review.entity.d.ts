import { Model } from 'sequelize-typescript';
import { ChargingStation } from './charging-station.entity';
export declare class ChargingStationReview extends Model<ChargingStationReview> {
    id: string;
    stationId: string;
    chargingStation: ChargingStation;
    userId: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}
