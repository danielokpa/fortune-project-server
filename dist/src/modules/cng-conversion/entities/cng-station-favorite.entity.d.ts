import { Model } from 'sequelize-typescript';
import { CngStation } from './cng-station.entity';
export declare class CngStationFavorite extends Model<CngStationFavorite> {
    id: string;
    stationId: string;
    cngStation: CngStation;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}
