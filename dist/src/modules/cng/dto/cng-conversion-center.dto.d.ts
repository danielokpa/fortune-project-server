export declare class CreateCngConversionCenterDto {
    name: string;
    state: string;
    country: string;
    address: string;
    contactPhone: string;
    openingTime: string;
    closingTime: string;
    amountPerUnit: number;
    currency?: string;
    amountPerUnitType?: string;
    contactEmail: string;
    bvn?: string;
    isActive?: boolean;
    longitude?: number;
    latitude?: number;
    stationImage?: string;
}
declare const UpdateCngConversionCenterDto_base: import("@nestjs/common").Type<Partial<CreateCngConversionCenterDto>>;
export declare class UpdateCngConversionCenterDto extends UpdateCngConversionCenterDto_base {
}
export declare class FindCngConversionCentersQueryDto {
    page?: number;
    limit?: number;
    search?: string;
    isActive?: boolean;
}
export {};
