import { CngStation } from '../entities/cng-station.entity';
import { CngStationRepository } from '../repositories/cng-station.repository';
import { FindCngStationsDto } from '../dto/cng-station.dto';
export declare class CngStationService {
    private readonly cngStationRepository;
    private readonly logger;
    constructor(cngStationRepository: CngStationRepository);
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
}
