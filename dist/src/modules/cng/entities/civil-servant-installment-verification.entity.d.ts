import { Model } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { CivilServantInstallmentVerificationStatus } from 'src/enums/civil-servant-installment-verification-status.enum';
export declare class CivilServantInstallmentPaymentProof extends Model<CivilServantInstallmentPaymentProof> {
    id: string;
    fullName: string;
    idCard: string;
    paySlip: string;
    salary: number;
    userId: string;
    user?: User;
    status: CivilServantInstallmentVerificationStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
