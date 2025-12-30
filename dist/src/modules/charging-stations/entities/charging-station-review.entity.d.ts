import { Model } from 'sequelize-typescript';
import { ChargingStation } from './charging-station.entity';
import { User } from '../../users/entities/user.entity';
export declare class ChargingStationReview extends Model<ChargingStationReview> {
    id: string;
    stationId: string;
    chargingStation: ChargingStation;
    userId: string;
    user: User;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}
