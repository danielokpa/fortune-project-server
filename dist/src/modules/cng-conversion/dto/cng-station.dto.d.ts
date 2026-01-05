export declare class FindCngStationsDto {
    latitude: number;
    longitude: number;
    radiusKm?: number;
    country?: string;
    state?: string;
    page?: number;
    limit?: number;
}
export declare class SearchCngStationsDto {
    query: string;
    latitude?: number;
    longitude?: number;
    radiusKm?: number;
    limit?: number;
    offset?: number;
}
export declare class StartCngTripDto {
    id: string;
    latitude?: number;
    longitude?: number;
}
export declare class EndCngTripDto {
    id: string;
}
export declare class CancelCngTripDto {
    id: string;
}
export declare class FindCngStationsQueryDto {
    page?: number;
    limit?: number;
    country?: string;
    state?: string;
    isActive?: boolean;
}
