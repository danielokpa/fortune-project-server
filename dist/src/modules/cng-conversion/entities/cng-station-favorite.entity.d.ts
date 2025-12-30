import { Model } from 'sequelize-typescript';
import { CngStation } from './cng-station.entity';
import { User } from '../../users/entities/user.entity';
export declare class CngStationFavorite extends Model<CngStationFavorite> {
    id: string;
    stationId: string;
    cngStation: CngStation;
    userId: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
