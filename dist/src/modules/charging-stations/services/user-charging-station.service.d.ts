import { UserChargingStation } from '../entities/user-charging-station.entity';
import { UserChargingStationRepository } from '../repositories/user-charging-station.repository';
import { ChargingStationRepository } from '../repositories/charging-station.repository';
import { AddUserChargingStationDto, UpdateUserChargingStationDto, StartTripDto, EndTripDto, CancelTripDto } from '../dto/charging-station.dto';
export declare class UserChargingStationService {
    private readonly userChargingStationRepository;
    private readonly chargingStationRepository;
    private readonly logger;
    constructor(userChargingStationRepository: UserChargingStationRepository, chargingStationRepository: ChargingStationRepository);
    addUserChargingStation(userId: string, addDto: AddUserChargingStationDto): Promise<UserChargingStation>;
    getUserChargingStations(userId: string, options?: {
        page?: number;
        limit?: number;
        isFavorite?: boolean;
    }): Promise<{
        stations: UserChargingStation[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getUserFavoriteStations(userId: string, options?: {
        page?: number;
        limit?: number;
    }): Promise<{
        stations: Array<{
            id: string;
            name: string;
            address: string;
        }>;
        activeTrip: {
            id: string;
            name: string;
            address: string;
            status: string;
        } | null;
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    updateUserChargingStation(userId: string, chargingStationId: string, updateDto: UpdateUserChargingStationDto): Promise<UserChargingStation>;
    removeUserChargingStation(userId: string, chargingStationId: string): Promise<void>;
    private calculateDistance;
    private toRad;
    getRecentStations(userId: string, options?: {
        page?: number;
        limit?: number;
    }): Promise<{
        stations: Array<{
            id: string;
            name: string;
            address: string;
        }>;
        activeTrip: {
            id: string;
            name: string;
            address: string;
            status: string;
        } | null;
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    removeFromRecent(userId: string, chargingStationId: string): Promise<{
        message: string;
    }>;
    startTrip(userId: string, startTripDto: StartTripDto): Promise<UserChargingStation>;
    endTrip(userId: string, endTripDto: EndTripDto): Promise<UserChargingStation>;
    cancelTrip(userId: string, cancelTripDto: CancelTripDto): Promise<UserChargingStation>;
}
