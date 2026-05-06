import { CngConversionStation } from '../entities/cng-conversion.stations.entity';
import { Sequelize, Transaction } from 'sequelize';
export type CngConversionCenterRow = Pick<CngConversionStation, 'id' | 'name' | 'state' | 'country' | 'address' | 'contactPhone' | 'openingTime' | 'closingTime' | 'amountPerUnit' | 'currency' | 'amountPerUnitType' | 'contactEmail' | 'isActive' | 'longitude' | 'latitude' | 'stationImage' | 'createdAt' | 'updatedAt'>;
export type CngConversionCenterWithVirtualAccount = CngConversionCenterRow & {
    virtualAccount: {
        accountName: string;
        bankName: string;
        accountNumber: string;
    } | null;
};
export declare class CngConversionCenterRepository {
    private readonly centerModel;
    constructor(centerModel: typeof CngConversionStation);
    getSequelize(): Sequelize | undefined;
    create(payload: Partial<CngConversionStation>, options?: {
        transaction?: Transaction;
    }): Promise<CngConversionStation>;
    update(id: string, payload: Partial<CngConversionStation>): Promise<[number, CngConversionStation[]]>;
    delete(id: string): Promise<number>;
    findById(id: string, options?: {
        transaction?: Transaction;
    }): Promise<CngConversionStation | null>;
    findByIdWithVirtualAccountRaw(id: string): Promise<CngConversionCenterWithVirtualAccount | null>;
    findAll(options?: {
        page?: number;
        limit?: number;
        search?: string;
        isActive?: boolean;
    }): Promise<{
        rows: CngConversionStation[];
        count: number;
    }>;
}
