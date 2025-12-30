import { Model } from 'sequelize-typescript';
import { ChargingStation } from './charging-station.entity';
import { User } from '../../users/entities/user.entity';
export declare class ChargingStationRating extends Model<ChargingStationRating> {
    id: string;
    stationId: string;
    chargingStation: ChargingStation;
    userId: string;
    user: User;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}
