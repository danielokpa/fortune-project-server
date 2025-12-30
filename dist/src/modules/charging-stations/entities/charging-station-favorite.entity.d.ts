import { Model } from 'sequelize-typescript';
import { ChargingStation } from './charging-station.entity';
import { User } from '../../users/entities/user.entity';
export declare class ChargingStationFavorite extends Model<ChargingStationFavorite> {
    id: string;
    stationId: string;
    chargingStation: ChargingStation;
    userId: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
