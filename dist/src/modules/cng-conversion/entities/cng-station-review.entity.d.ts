import { Model } from 'sequelize-typescript';
import { CngStation } from './cng-station.entity';
import { User } from '../../users/entities/user.entity';
export declare class CngStationReview extends Model<CngStationReview> {
    id: string;
    stationId: string;
    cngStation: CngStation;
    userId: string;
    user: User;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}
