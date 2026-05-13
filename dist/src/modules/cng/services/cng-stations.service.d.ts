import { CngStationFavorite } from '../entities/cng-station-favorite.entity';
import { CngStationRepository } from '../repositories/cng-station.repository';
import { User } from '../../users/entities/user.entity';
import { Driver } from '../../drivers/entities/driver.entity';
import { FindCngStationsDto, SearchCngStationsDto, FindCngStationsQueryDto } from '../dto/cng-station.dto';
import { ICngStation, IStationsListResponse, IStationsSearchResponse, IToggleFavoriteResponse } from '../interfaces/cng-station.interface';
import { UserCngStationRepository } from '../repositories/user-cng-station.repository';
export declare class CngStationsService {
    private readonly cngStationRepository;
    private readonly cngStationFavoriteModel;
    private readonly userModel;
    private readonly driverModel;
    private readonly userCngStationRepository;
    private readonly logger;
    private readonly DEFAULT_IMAGE_URL;
    constructor(cngStationRepository: CngStationRepository, cngStationFavoriteModel: typeof CngStationFavorite, userModel: typeof User, driverModel: typeof Driver, userCngStationRepository: UserCngStationRepository);
    private addDefaultImage;
    private addDefaultImages;
    findAll(options?: FindCngStationsQueryDto, userId?: string): Promise<IStationsListResponse>;
    findActiveStations(options?: FindCngStationsQueryDto, userId?: string): Promise<IStationsListResponse>;
    findNearbyStations(findNearbyDto: FindCngStationsDto & {
        country?: string;
        state?: string;
        isActive?: boolean;
        page?: number;
        limit?: number;
        userId?: string;
    }): Promise<IStationsListResponse>;
    findById(id: string, userId?: string, latitude?: number, longitude?: number): Promise<ICngStation>;
    search(searchDto: SearchCngStationsDto, userId?: string): Promise<IStationsSearchResponse>;
    toggleFavorite(userId: string, stationId: string): Promise<IToggleFavoriteResponse>;
}
