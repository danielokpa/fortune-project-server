import { ChargingStation } from '../entities/charging-station.entity';
import { ChargingStationFavorite } from '../entities/charging-station-favorite.entity';
import { ChargingStationRating } from '../entities/charging-station-rating.entity';
import { ChargingStationReview } from '../entities/charging-station-review.entity';
export type ChargingStationRow = Pick<ChargingStation, 'id' | 'name' | 'state' | 'country' | 'address' | 'contactPhone' | 'openingTime' | 'closingTime' | 'amountPerUnit' | 'currency' | 'amountPerUnitType' | 'contactEmail' | 'isActive' | 'longitude' | 'latitude' | 'stationImage' | 'createdAt' | 'updatedAt'>;
export type ChargingStationWithVirtualAccount = ChargingStationRow & {
    virtualAccount: {
        accountName: string;
        bankName: string;
        accountNumber: string;
    } | null;
};
export type ChargingStationDetail = ChargingStationWithVirtualAccount & {
    isFavorite: boolean;
    rating: number;
    reviews: number;
    totalRatings: number;
    totalReviews: number;
    distance?: number;
};
export declare class ChargingStationRepository {
    private readonly chargingStationModel;
    private readonly chargingStationFavoriteModel;
    private readonly chargingStationRatingModel;
    private readonly chargingStationReviewModel;
    constructor(chargingStationModel: typeof ChargingStation, chargingStationFavoriteModel: typeof ChargingStationFavorite, chargingStationRatingModel: typeof ChargingStationRating, chargingStationReviewModel: typeof ChargingStationReview);
    count(options?: any): Promise<number>;
    findByIdWithVirtualAccountRaw(id: string): Promise<ChargingStationWithVirtualAccount | null>;
    findById(id: string, userId?: string, latitude?: number, longitude?: number): Promise<ChargingStationDetail | null>;
    findAll(options?: {
        where?: any;
        limit?: number;
        offset?: number;
        order?: any[];
        include?: any[];
    }, userId?: string): Promise<ChargingStation[]>;
    findActiveStations(options?: {
        limit?: number;
        offset?: number;
        country?: string;
        state?: string;
    }, userId?: string): Promise<ChargingStation[]>;
    findNearbyStations(latitude: number, longitude: number, radiusKm?: number, options?: {
        limit?: number;
        offset?: number;
        country?: string;
        state?: string;
        isActive?: boolean;
        userId?: string;
    }): Promise<{
        stations: ChargingStation[];
        total: number;
    }>;
    search(query: string, options?: {
        limit?: number;
        offset?: number;
        latitude?: number;
        longitude?: number;
        radiusKm?: number;
        userId?: string;
    }): Promise<{
        stations: Array<{
            id: string;
            name: string;
            address: string;
        }>;
        total: number;
    }>;
    create(chargingStationData: Partial<ChargingStation>): Promise<ChargingStation>;
    update(id: string, chargingStationData: Partial<ChargingStation>): Promise<[number, ChargingStation[]]>;
    delete(id: string): Promise<number>;
    private calculateDistance;
    private toRad;
}
