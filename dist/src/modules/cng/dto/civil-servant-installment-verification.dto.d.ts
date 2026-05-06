import { CivilServantInstallmentVerificationStatus } from 'src/enums/civil-servant-installment-verification-status.enum';
export declare class CreateCivilServantInstallmentUserInfoDto {
    fullName: string;
    idCard: string;
    paySlip: string;
    salary: number;
}
declare const UpdateCivilServantInstallmentUserInfoDto_base: import("@nestjs/common").Type<Partial<CreateCivilServantInstallmentUserInfoDto>>;
export declare class UpdateCivilServantInstallmentUserInfoDto extends UpdateCivilServantInstallmentUserInfoDto_base {
}
export declare class UpdateCivilServantInstallmentStatusDto {
    status: CivilServantInstallmentVerificationStatus;
}
export {};
