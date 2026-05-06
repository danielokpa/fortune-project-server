import { Model } from 'sequelize-typescript';
export declare class CngStation extends Model<CngStation> {
    id: string;
    name: string;
    state: string;
    country: string;
    address: string;
    contactPhone: string;
    rating: number;
    reviews: number;
    openingTime: string;
    closingTime: string;
    amountPerUnit: number;
    currency: string;
    amountPerUnitType: string;
    contactEmail: string;
    isActive: boolean;
    longitude: number;
    latitude: number;
    stationImage: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
