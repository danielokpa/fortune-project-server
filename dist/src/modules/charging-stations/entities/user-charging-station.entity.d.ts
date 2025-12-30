import { Model } from 'sequelize-typescript';
import { ChargingStation } from './charging-station.entity';
import { User } from '../../users/entities/user.entity';
import { SelfTripStatus } from '../../../enums/self-trip-status.enum';
export declare class UserChargingStation extends Model<UserChargingStation> {
    id: string;
    userId: string;
    user: User;
    chargingStationId: string;
    chargingStation: ChargingStation;
    longitude: number;
    latitude: number;
    distance: number;
    selfTripStatus: SelfTripStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
