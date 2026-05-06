import { CngConversionStation } from '../entities/cng-conversion.stations.entity';
import { UserCngConversion } from '../entities/user.cng-conversion.entity';
export type CivilServantProofSummary = {
    id: string;
    fullName: string;
    idCard: string;
    paySlip: string;
    salary: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
};
export type UserCngConversionDashboardStats = {
    pendingConversions: number;
    completedConversions: number;
    myDrafts: number;
    totalConversions: number;
    civilServantProof: CivilServantProofSummary | null;
};
export declare class UserCngConversionRepository {
    private cngConversionModel;
    constructor(cngConversionModel: typeof UserCngConversion);
    count(options?: any): Promise<number>;
    aggregateUserDashboardStats(userId: string): Promise<UserCngConversionDashboardStats>;
    findById(id: string): Promise<UserCngConversion | null>;
    findByIdForUser(id: string, userId: string): Promise<UserCngConversion | null>;
    findByIdAndUserId(id: string, userId: string): Promise<(UserCngConversion & {
        conversionStation?: CngConversionStation | null;
    }) | null>;
    findAll(options?: any): Promise<UserCngConversion[]>;
    create(cngConversionData: Partial<UserCngConversion>): Promise<UserCngConversion>;
    update(id: string, cngConversionData: Partial<UserCngConversion>): Promise<[number, UserCngConversion[]]>;
    updateForUser(id: string, userId: string, cngConversionData: Partial<UserCngConversion>): Promise<[number, UserCngConversion[]]>;
    delete(id: string): Promise<number>;
}
