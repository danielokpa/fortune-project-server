import { CngStation } from '../entities/cng-station.entity';
import { CngStationFavorite } from '../entities/cng-station-favorite.entity';
import { CngStationRepository } from '../repositories/cng-station.repository';
import { FindCngStationsDto, SearchCngStationsDto } from '../dto/cng-station.dto';
export declare class CngStationService {
    private readonly cngStationRepository;
    private readonly cngStationFavoriteModel;
    private readonly logger;
    private readonly DEFAULT_IMAGE_URL;
    constructor(cngStationRepository: CngStationRepository, cngStationFavoriteModel: typeof CngStationFavorite);
    private addDefaultImage;
    private addDefaultImages;
    findAll(options?: {
        page?: number;
        limit?: number;
        country?: string;
        state?: string;
        isActive?: boolean;
    }, userId?: string): Promise<{
        stations: CngStation[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findActiveStations(options?: {
        page?: number;
        limit?: number;
        country?: string;
        state?: string;
    }, userId?: string): Promise<{
        stations: CngStation[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findById(id: string, userId?: string): Promise<CngStation>;
    findNearbyStations(findNearbyDto: FindCngStationsDto & {
        userId?: string;
    }): Promise<{
        stations: CngStation[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    search(searchDto: SearchCngStationsDto, userId?: string): Promise<{
        stations: Array<{
            id: string;
            name: string;
            address: string;
        }>;
        total: number;
        limit: number;
        offset: number;
        totalPages: number;
    }>;
    toggleFavorite(userId: string, stationId: string): Promise<{
        isFavorite: boolean;
        message: string;
    }>;
}
