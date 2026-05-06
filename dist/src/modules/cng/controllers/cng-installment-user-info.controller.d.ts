import { JwtAuthPayload } from 'src/modules/auth/auth.interface';
import type { Request as ExpressRequest } from 'express';
import { CivilServantInstallmentVerificationService } from '../services/civil-servant-installment-verification.service';
import { CreateCivilServantInstallmentUserInfoDto, UpdateCivilServantInstallmentStatusDto } from '../dto/civil-servant-installment-verification.dto';
import { CivilServantInstallmentVerificationStatus } from 'src/enums/civil-servant-installment-verification-status.enum';
export declare class CngInstallmentUserInfoController {
    private readonly verificationService;
    constructor(verificationService: CivilServantInstallmentVerificationService);
    create(dto: CreateCivilServantInstallmentUserInfoDto, req: ExpressRequest & {
        user: JwtAuthPayload;
    }): Promise<import("src/utils/response.utils").ApiResponse<import("../entities/civil-servant-installment-verification.entity").CivilServantInstallmentPaymentProof>>;
    fetchUser(req: ExpressRequest & {
        user: JwtAuthPayload;
    }): Promise<import("src/utils/response.utils").ApiResponse<import("../entities/civil-servant-installment-verification.entity").CivilServantInstallmentPaymentProof>>;
    deleteUser(req: ExpressRequest & {
        user: JwtAuthPayload;
    }): Promise<import("src/utils/response.utils").ApiResponse<null>>;
    adminList(page?: number, limit?: number, status?: CivilServantInstallmentVerificationStatus): Promise<import("src/utils/response.utils").ApiResponse<{
        rows: import("../entities/civil-servant-installment-verification.entity").CivilServantInstallmentPaymentProof[];
        count: number;
    }>>;
    updateStatus(id: string, dto: UpdateCivilServantInstallmentStatusDto): Promise<import("src/utils/response.utils").ApiResponse<import("../entities/civil-servant-installment-verification.entity").CivilServantInstallmentPaymentProof>>;
    adminDelete(id: string): Promise<import("src/utils/response.utils").ApiResponse<null>>;
}
