import { Model } from 'sequelize-typescript';
import { ChargingStation } from './charging-station.entity';
export declare class ChargingStationFavorite extends Model<ChargingStationFavorite> {
    id: string;
    stationId: string;
    chargingStation: ChargingStation;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}
