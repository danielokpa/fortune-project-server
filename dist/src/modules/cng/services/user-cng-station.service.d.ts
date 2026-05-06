import { UserCngStation } from '../entities/user.cng-station.entity';
import { UserCngStationRepository } from '../repositories/user-cng-station.repository';
import { CngStationRepository } from '../repositories/cng-station.repository';
import { StartCngTripDto, EndCngTripDto, CancelCngTripDto } from '../dto/cng-station.dto';
import { IRecentStationsResponse, IFavoriteStationsResponse } from '../interfaces/cng-station.interface';
export declare class UserCngStationService {
    private readonly userCngStationRepository;
    private readonly cngStationRepository;
    private readonly logger;
    constructor(userCngStationRepository: UserCngStationRepository, cngStationRepository: CngStationRepository);
    getRecentStations(userId: string, options?: {
        page?: number;
        limit?: number;
    }): Promise<IRecentStationsResponse>;
    removeFromRecent(userId: string, cngStationId: string): Promise<{
        message: string;
    }>;
    getUserFavoriteStations(userId: string, options?: {
        page?: number;
        limit?: number;
    }): Promise<IFavoriteStationsResponse>;
    startTrip(userId: string, startTripDto: StartCngTripDto): Promise<UserCngStation>;
    endTrip(userId: string, endTripDto: EndCngTripDto): Promise<UserCngStation>;
    cancelTrip(userId: string, cancelTripDto: CancelCngTripDto): Promise<void>;
    private calculateDistance;
    private toRad;
}
