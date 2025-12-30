import { ChargingStation } from '../entities/charging-station.entity';
import { ChargingStationFavorite } from '../entities/charging-station-favorite.entity';
import { ChargingStationRepository } from '../repositories/charging-station.repository';
import { CreateChargingStationDto, UpdateChargingStationDto, FindNearbyStationsDto, FindChargingStationsDto, SearchChargingStationsDto } from '../dto/charging-station.dto';
export declare class ChargingStationService {
    private readonly chargingStationRepository;
    private readonly chargingStationFavoriteModel;
    private readonly logger;
    private readonly DEFAULT_IMAGE_URL;
    constructor(chargingStationRepository: ChargingStationRepository, chargingStationFavoriteModel: typeof ChargingStationFavorite);
    private addDefaultImage;
    private addDefaultImages;
    create(createDto: CreateChargingStationDto): Promise<ChargingStation>;
    findAll(findDto: FindChargingStationsDto, userId?: string): Promise<{
        stations: ChargingStation[];
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
        stations: ChargingStation[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findNearbyStations(findNearbyDto: FindNearbyStationsDto & {
        country?: string;
        state?: string;
        isActive?: boolean;
        page?: number;
        limit?: number;
        userId?: string;
    }): Promise<{
        stations: ChargingStation[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findById(id: string, userId?: string): Promise<ChargingStation>;
    update(id: string, updateDto: UpdateChargingStationDto): Promise<ChargingStation>;
    delete(id: string): Promise<void>;
    search(searchDto: SearchChargingStationsDto, userId?: string): Promise<{
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
