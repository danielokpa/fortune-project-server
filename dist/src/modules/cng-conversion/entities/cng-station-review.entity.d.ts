import { Model } from 'sequelize-typescript';
import { CngStation } from './cng-station.entity';
export declare class CngStationReview extends Model<CngStationReview> {
    id: string;
    stationId: string;
    cngStation: CngStation;
    userId: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}
