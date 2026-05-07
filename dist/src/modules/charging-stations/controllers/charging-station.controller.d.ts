import { ChargingStationService } from '../services/charging-station.service';
import { UserChargingStationService } from '../services/user-charging-station.service';
import { CreateChargingStationDto, FindNearbyStationsDto, FindChargingStationsDto, SearchChargingStationsDto, StartTripDto, EndTripDto, CancelTripDto } from '../dto/charging-station.dto';
import { JwtAuthPayload } from 'src/modules/auth/auth.interface';
import type { Request as ExpressRequest } from 'express';
export declare class ChargingStationController {
    private readonly chargingStationService;
    private readonly userChargingStationService;
    constructor(chargingStationService: ChargingStationService, userChargingStationService: UserChargingStationService);
    create(createDto: CreateChargingStationDto): Promise<import("src/utils/response.utils").ApiResponse<import("../entities/charging-station.entity").ChargingStation>>;
    findAll(findDto: FindChargingStationsDto, req: ExpressRequest & {
        user: JwtAuthPayload;
    }): Promise<import("src/utils/response.utils").ApiResponse<{
        stations: import("../entities/charging-station.entity").ChargingStation[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>>;
    findNearby(findNearbyDto: FindNearbyStationsDto, req: ExpressRequest & {
        user: JwtAuthPayload;
    }): Promise<import("src/utils/response.utils").ApiResponse<{
        stations: import("../entities/charging-station.entity").ChargingStation[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>>;
    search(searchDto: SearchChargingStationsDto, req: ExpressRequest & {
        user: JwtAuthPayload;
    }): Promise<import("src/utils/response.utils").ApiResponse<{
        stations: Array<{
            id: string;
            name: string;
            address: string;
        }>;
        total: number;
        limit: number;
        offset: number;
        totalPages: number;
    }>>;
    findById(req: ExpressRequest & {
        user: JwtAuthPayload;
    }, id: string, latitude?: number, longitude?: number): Promise<import("src/utils/response.utils").ApiResponse<import("../repositories/charging-station.repository").ChargingStationDetail>>;
    startTrip(req: ExpressRequest & {
        user: JwtAuthPayload;
    }, startTripDto: StartTripDto): Promise<import("src/utils/response.utils").ApiResponse<import("../entities/user-charging-station.entity").UserChargingStation>>;
    endTrip(req: ExpressRequest & {
        user: JwtAuthPayload;
    }, endTripDto: EndTripDto): Promise<import("src/utils/response.utils").ApiResponse<import("../entities/user-charging-station.entity").UserChargingStation>>;
    cancelTrip(req: ExpressRequest & {
        user: JwtAuthPayload;
    }, cancelTripDto: CancelTripDto): Promise<import("src/utils/response.utils").ApiResponse<import("../entities/user-charging-station.entity").UserChargingStation>>;
    getRecentStations(req: ExpressRequest & {
        user: JwtAuthPayload;
    }, page?: number, limit?: number): Promise<import("src/utils/response.utils").ApiResponse<{
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
    }>>;
    removeFromRecent(req: ExpressRequest & {
        user: JwtAuthPayload;
    }, chargingStationId: string): Promise<import("src/utils/response.utils").ApiResponse<{
        message: string;
    }>>;
    getUserFavoriteStations(req: ExpressRequest & {
        user: JwtAuthPayload;
    }, page?: number, limit?: number): Promise<import("src/utils/response.utils").ApiResponse<{
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
    }>>;
    toggleFavorite(req: ExpressRequest & {
        user: JwtAuthPayload;
    }, chargingStationId: string): Promise<import("src/utils/response.utils").ApiResponse<{
        isFavorite: boolean;
        message: string;
    }>>;
}
