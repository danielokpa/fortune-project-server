import { JwtAuthPayload } from 'src/modules/auth/auth.interface';
import type { Request as ExpressRequest } from 'express';
import { CreateCngConversionCenterDto, FindCngConversionCentersQueryDto, UpdateCngConversionCenterDto } from '../dto/cng-conversion-center.dto';
import { CngConversionCenterService } from '../services/cng-conversion-center.service';
export declare class CngConversionCenterController {
    private readonly centerService;
    constructor(centerService: CngConversionCenterService);
    findAll(query: FindCngConversionCentersQueryDto, _req: ExpressRequest & {
        user: JwtAuthPayload;
    }): Promise<import("src/utils/response.utils").ApiResponse<{
        centers: import("../entities/cng-conversion.stations.entity").CngConversionStation[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>>;
    create(payload: CreateCngConversionCenterDto, req: ExpressRequest & {
        user: JwtAuthPayload;
    }): Promise<import("src/utils/response.utils").ApiResponse<import("../entities/cng-conversion.stations.entity").CngConversionStation>>;
    findById(id: string, _req: ExpressRequest & {
        user: JwtAuthPayload;
    }): Promise<import("src/utils/response.utils").ApiResponse<import("../repositories/cng-conversion-center.repository").CngConversionCenterWithVirtualAccount>>;
    update(id: string, payload: UpdateCngConversionCenterDto, _req: ExpressRequest & {
        user: JwtAuthPayload;
    }): Promise<import("src/utils/response.utils").ApiResponse<import("../entities/cng-conversion.stations.entity").CngConversionStation>>;
    remove(id: string, _req: ExpressRequest & {
        user: JwtAuthPayload;
    }): Promise<import("src/utils/response.utils").ApiResponse<null>>;
}
