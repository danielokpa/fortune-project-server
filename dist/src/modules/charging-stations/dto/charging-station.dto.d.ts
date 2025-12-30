export declare class CreateChargingStationDto {
    name: string;
    country: string;
    state: string;
    address: string;
    contactPhone: string;
    contactEmail: string;
    openingTime: string;
    closingTime: string;
    amountPerUnit: number;
    currency?: string;
    amountPerUnitType?: string;
    latitude?: number;
    longitude?: number;
    rating?: number;
    reviews?: number;
    isActive?: boolean;
}
export declare class UpdateChargingStationDto {
    name?: string;
    country?: string;
    state?: string;
    address?: string;
    contactPhone?: string;
    contactEmail?: string;
    openingTime?: string;
    closingTime?: string;
    amountPerUnit?: number;
    currency?: string;
    amountPerUnitType?: string;
    latitude?: number;
    longitude?: number;
    rating?: number;
    reviews?: number;
    isActive?: boolean;
}
export declare class AddUserChargingStationDto {
    chargingStationId: string;
    latitude?: number;
    longitude?: number;
    isFavorite?: boolean;
}
export declare class UpdateUserChargingStationDto {
    isFavorite?: boolean;
    latitude?: number;
    longitude?: number;
}
export declare class FindChargingStationsDto {
    page?: number;
    limit?: number;
    country?: string;
    state?: string;
    isActive?: boolean;
    latitude?: number;
    longitude?: number;
    radiusKm?: number;
}
export declare class FindNearbyStationsDto {
    latitude: number;
    longitude: number;
    radiusKm?: number;
    page?: number;
    limit?: number;
}
export declare class SearchChargingStationsDto {
    query: string;
    latitude?: number;
    longitude?: number;
    radiusKm?: number;
    limit?: number;
    offset?: number;
}
export declare class StartTripDto {
    id: string;
    latitude?: number;
    longitude?: number;
}
export declare class EndTripDto {
    id: string;
}
export declare class CancelTripDto {
    id: string;
}
