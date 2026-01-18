import { Model } from 'sequelize-typescript';
import { CngStation } from './cng-station.entity';
import { User } from '../../users/entities/user.entity';
import { SelfTripStatus } from '../../../enums/self-trip-status.enum';
import { UserType } from '../../../enums/user-type.enum';
export declare class UserCngStation extends Model<UserCngStation> {
    id: string;
    userId: string;
    user: User;
    cngStationId: string;
    cngStation: CngStation;
    isFavorite: boolean;
    longitude: number;
    latitude: number;
    distance: number;
    selfTripStatus: SelfTripStatus;
    userType: UserType;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
