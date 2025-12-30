import { CngStation } from '../entities/cng-station.entity';
import { CngStationFavorite } from '../entities/cng-station-favorite.entity';
import { CngStationRating } from '../entities/cng-station-rating.entity';
import { CngStationReview } from '../entities/cng-station-review.entity';
export declare class CngStationRepository {
    private readonly cngStationModel;
    private readonly cngStationFavoriteModel;
    private readonly cngStationRatingModel;
    private readonly cngStationReviewModel;
    constructor(cngStationModel: typeof CngStation, cngStationFavoriteModel: typeof CngStationFavorite, cngStationRatingModel: typeof CngStationRating, cngStationReviewModel: typeof CngStationReview);
    count(options?: any): Promise<number>;
    findById(id: string, userId?: string): Promise<CngStation | null>;
    findAll(options?: {
        where?: any;
        limit?: number;
        offset?: number;
        order?: any[];
        attributes?: any;
    }, userId?: string): Promise<CngStation[]>;
    findActiveStations(options?: {
        limit?: number;
        offset?: number;
        country?: string;
        state?: string;
    }, userId?: string): Promise<CngStation[]>;
    findNearbyStations(latitude: number, longitude: number, radiusKm?: number, options?: {
        limit?: number;
        offset?: number;
        country?: string;
        state?: string;
        isActive?: boolean;
        userId?: string;
    }): Promise<{
        stations: CngStation[];
        total: number;
    }>;
    create(cngStationData: Partial<CngStation>): Promise<CngStation>;
    update(id: string, cngStationData: Partial<CngStation>): Promise<[number, CngStation[]]>;
    delete(id: string): Promise<number>;
    private calculateDistance;
    private toRad;
}
