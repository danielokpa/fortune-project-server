import { UserCngStation } from '../entities/user-cng-station.entity';
import { CngStationFavorite } from '../entities/cng-station-favorite.entity';
import { CngStation } from '../entities/cng-station.entity';
import { SelfTripStatus } from 'src/enums/self-trip-status.enum';
export declare class UserCngStationRepository {
    private readonly userCngStationModel;
    private readonly cngStationFavoriteModel;
    private readonly cngStationModel;
    constructor(userCngStationModel: typeof UserCngStation, cngStationFavoriteModel: typeof CngStationFavorite, cngStationModel: typeof CngStation);
    count(options?: any): Promise<number>;
    findById(id: string): Promise<UserCngStation | null>;
    findByUserIdAndStationId(userId: string, cngStationId: string): Promise<UserCngStation | null>;
    findByUserIdSelfTripStatusAndStationId(userId: string, selfTripStatus: SelfTripStatus): Promise<UserCngStation | null>;
    findActiveTripByUserIdAndId(userId: string, id: string): Promise<UserCngStation | null>;
    findActiveTripByUserId(userId: string): Promise<UserCngStation | null>;
    findRecentByUserId(userId: string, options?: {
        limit?: number;
        offset?: number;
    }): Promise<Array<{
        id: string;
        name: string;
        address: string;
    }>>;
    findFavoritesByUserId(userId: string, options?: {
        limit?: number;
        offset?: number;
    }): Promise<Array<{
        id: string;
        name: string;
        address: string;
    }>>;
    countFavoritesByUserId(userId: string): Promise<number>;
    create(userCngStationData: Partial<UserCngStation>): Promise<UserCngStation>;
    update(id: string, userCngStationData: Partial<UserCngStation>): Promise<[number, UserCngStation[]]>;
    updateByUserIdAndId(userId: string, id: string, userCngStationData: Partial<UserCngStation>): Promise<[number, UserCngStation[]]>;
    updateByUserIdAndStationId(userId: string, cngStationId: string, userCngStationData: Partial<UserCngStation>): Promise<[number, UserCngStation[]]>;
    deleteByUserIdAndStationId(userId: string, cngStationId: string): Promise<number>;
}
