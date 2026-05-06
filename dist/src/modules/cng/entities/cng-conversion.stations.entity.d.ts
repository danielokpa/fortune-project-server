import { Model } from 'sequelize-typescript';
export declare class CngConversionStation extends Model<CngConversionStation> {
    id: string;
    name: string;
    state: string;
    country: string;
    address: string;
    contactPhone: string;
    openingTime: string;
    closingTime: string;
    amountPerUnit: number;
    currency: string;
    amountPerUnitType: string;
    contactEmail: string;
    bvn: string | null;
    isActive: boolean;
    longitude: number;
    latitude: number;
    stationImage: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
