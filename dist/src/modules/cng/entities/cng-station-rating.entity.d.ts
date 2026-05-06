import { Model } from 'sequelize-typescript';
import { CngStation } from './cng-station.entity';
export declare class CngStationRating extends Model<CngStationRating> {
    id: string;
    stationId: string;
    cngStation: CngStation;
    userId: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}
