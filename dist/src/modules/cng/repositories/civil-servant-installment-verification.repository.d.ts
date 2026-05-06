import { Transaction } from 'sequelize';
import { CivilServantInstallmentPaymentProof } from '../entities/civil-servant-installment-verification.entity';
import { CivilServantInstallmentVerificationStatus } from 'src/enums/civil-servant-installment-verification-status.enum';
export declare class CivilServantInstallmentVerificationRepository {
    private readonly model;
    constructor(model: typeof CivilServantInstallmentPaymentProof);
    create(payload: Partial<CivilServantInstallmentPaymentProof>, options?: {
        transaction?: Transaction;
    }): Promise<CivilServantInstallmentPaymentProof>;
    findByUserId(userId: string): Promise<CivilServantInstallmentPaymentProof | null>;
    findById(id: string): Promise<CivilServantInstallmentPaymentProof | null>;
    updateByUserId(userId: string, payload: Partial<CivilServantInstallmentPaymentProof>, options?: {
        transaction?: Transaction;
    }): Promise<[number]>;
    updateById(id: string, payload: Partial<CivilServantInstallmentPaymentProof>, options?: {
        transaction?: Transaction;
    }): Promise<[number]>;
    findAllPaginated(options: {
        page?: number;
        limit?: number;
        status?: CivilServantInstallmentVerificationStatus;
    }): Promise<{
        rows: CivilServantInstallmentPaymentProof[];
        count: number;
    }>;
    deleteByUserId(userId: string, options?: {
        transaction?: Transaction;
    }): Promise<number>;
    deleteById(id: string, options?: {
        transaction?: Transaction;
    }): Promise<number>;
}
