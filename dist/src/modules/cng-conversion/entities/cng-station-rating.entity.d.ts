import { Model } from 'sequelize-typescript';
import { CngStation } from './cng-station.entity';
import { User } from '../../users/entities/user.entity';
export declare class CngStationRating extends Model<CngStationRating> {
    id: string;
    stationId: string;
    cngStation: CngStation;
    userId: string;
    user: User;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}
