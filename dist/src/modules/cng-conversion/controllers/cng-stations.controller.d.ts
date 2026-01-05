import { CngStationsService } from '../services/cng-stations.service';
import { UserCngStationService } from '../services/user-cng-station.service';
import { FindCngStationsDto, SearchCngStationsDto, StartCngTripDto, EndCngTripDto, CancelCngTripDto, FindCngStationsQueryDto } from '../dto/cng-station.dto';
import { JwtAuthPayload } from 'src/modules/auth/auth.interface';
import type { Request as ExpressRequest } from 'express';
export declare class CngStationsController {
    private readonly cngStationsService;
    private readonly userCngStationService;
    constructor(cngStationsService: CngStationsService, userCngStationService: UserCngStationService);
    findAll(findDto: FindCngStationsQueryDto, req: ExpressRequest & {
        user: JwtAuthPayload;
    }): Promise<import("src/utils/response.utils").ApiResponse<import("../interfaces/cng-station.interface").IStationsListResponse>>;
    findActiveStations(findDto: FindCngStationsQueryDto, req: ExpressRequest & {
        user: JwtAuthPayload;
    }): Promise<import("src/utils/response.utils").ApiResponse<import("../interfaces/cng-station.interface").IStationsListResponse>>;
    findNearby(findNearbyDto: FindCngStationsDto, req: ExpressRequest & {
        user: JwtAuthPayload;
    }): Promise<import("src/utils/response.utils").ApiResponse<import("../interfaces/cng-station.interface").IStationsListResponse>>;
    search(searchDto: SearchCngStationsDto, req: ExpressRequest & {
        user: JwtAuthPayload;
    }): Promise<import("src/utils/response.utils").ApiResponse<import("../interfaces/cng-station.interface").IStationsSearchResponse>>;
    findById(id: string, req: ExpressRequest & {
        user: JwtAuthPayload;
    }): Promise<import("src/utils/response.utils").ApiResponse<import("../interfaces/cng-station.interface").ICngStation>>;
    toggleFavorite(req: ExpressRequest & {
        user: JwtAuthPayload;
    }, cngStationId: string): Promise<import("src/utils/response.utils").ApiResponse<import("../interfaces/cng-station.interface").IToggleFavoriteResponse>>;
    getRecentStations(req: ExpressRequest & {
        user: JwtAuthPayload;
    }, page?: number, limit?: number): Promise<import("src/utils/response.utils").ApiResponse<import("../interfaces/cng-station.interface").IRecentStationsResponse>>;
    removeFromRecent(req: ExpressRequest & {
        user: JwtAuthPayload;
    }, cngStationId: string): Promise<import("src/utils/response.utils").ApiResponse<{
        message: string;
    }>>;
    getUserFavoriteStations(req: ExpressRequest & {
        user: JwtAuthPayload;
    }, page?: number, limit?: number): Promise<import("src/utils/response.utils").ApiResponse<import("../interfaces/cng-station.interface").IFavoriteStationsResponse>>;
    startTrip(req: ExpressRequest & {
        user: JwtAuthPayload;
    }, startTripDto: StartCngTripDto): Promise<import("src/utils/response.utils").ApiResponse<import("../entities/user-cng-station.entity").UserCngStation>>;
    endTrip(req: ExpressRequest & {
        user: JwtAuthPayload;
    }, endTripDto: EndCngTripDto): Promise<import("src/utils/response.utils").ApiResponse<import("../entities/user-cng-station.entity").UserCngStation>>;
    cancelTrip(req: ExpressRequest & {
        user: JwtAuthPayload;
    }, cancelTripDto: CancelCngTripDto): Promise<import("src/utils/response.utils").ApiResponse<null>>;
}
