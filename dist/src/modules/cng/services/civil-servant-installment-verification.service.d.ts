import { CivilServantInstallmentVerificationRepository } from '../repositories/civil-servant-installment-verification.repository';
import { CivilServantInstallmentPaymentProof } from '../entities/civil-servant-installment-verification.entity';
import { CivilServantInstallmentVerificationStatus } from 'src/enums/civil-servant-installment-verification-status.enum';
import { CreateCivilServantInstallmentUserInfoDto, UpdateCivilServantInstallmentStatusDto } from '../dto/civil-servant-installment-verification.dto';
export declare class CivilServantInstallmentVerificationService {
    private readonly repository;
    constructor(repository: CivilServantInstallmentVerificationRepository);
    create(userId: string, dto: CreateCivilServantInstallmentUserInfoDto): Promise<CivilServantInstallmentPaymentProof>;
    fetchUser(userId: string): Promise<CivilServantInstallmentPaymentProof | null>;
    updateStatusById(id: string, dto: UpdateCivilServantInstallmentStatusDto): Promise<CivilServantInstallmentPaymentProof>;
    findAllForAdmin(options: {
        page?: number;
        limit?: number;
        status?: CivilServantInstallmentVerificationStatus;
    }): Promise<{
        rows: CivilServantInstallmentPaymentProof[];
        count: number;
    }>;
    deleteUser(userId: string): Promise<void>;
    deleteByIdForAdmin(id: string): Promise<void>;
}
