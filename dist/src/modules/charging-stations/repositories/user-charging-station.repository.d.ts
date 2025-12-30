import { UserChargingStation } from '../entities/user-charging-station.entity';
import { ChargingStationFavorite } from '../entities/charging-station-favorite.entity';
import { SelfTripStatus } from 'src/enums/self-trip-status.enum';
export declare class UserChargingStationRepository {
    private readonly userChargingStationModel;
    private readonly chargingStationFavoriteModel;
    constructor(userChargingStationModel: typeof UserChargingStation, chargingStationFavoriteModel: typeof ChargingStationFavorite);
    count(options?: any): Promise<number>;
    findById(id: string): Promise<UserChargingStation | null>;
    findByUserIdAndStationId(userId: string, chargingStationId: string): Promise<UserChargingStation | null>;
    findByUserIdSelfTripStatusAndStationId(userId: string, selfTripStatus: SelfTripStatus, chargingStationId: string): Promise<UserChargingStation | null>;
    findActiveTripByUserIdAndUserStationId(userId: string, id: string): Promise<UserChargingStation | null>;
    findActiveTripByUserId(userId: string): Promise<UserChargingStation | null>;
    findAll(options?: {
        where?: any;
        limit?: number;
        offset?: number;
        order?: any[];
        include?: any[];
    }): Promise<UserChargingStation[]>;
    findByUserId(userId: string, options?: {
        limit?: number;
        offset?: number;
        isFavorite?: boolean;
    }): Promise<UserChargingStation[]>;
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
    create(userChargingStationData: Partial<UserChargingStation>): Promise<UserChargingStation>;
    update(id: string, userChargingStationData: Partial<UserChargingStation>): Promise<[number, UserChargingStation[]]>;
    updateByUserIdAndStationId(userId: string, chargingStationId: string, userChargingStationData: Partial<UserChargingStation>): Promise<[number, UserChargingStation[]]>;
    updateByUserIdAndId(userId: string, id: string, userChargingStationData: Partial<UserChargingStation>): Promise<[number, UserChargingStation[]]>;
    delete(id: string): Promise<number>;
    deleteByUserIdAndStationId(userId: string, chargingStationId: string): Promise<number>;
}
