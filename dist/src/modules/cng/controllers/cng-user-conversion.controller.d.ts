import { CngConversionService as CngUserConversionService } from '../services/cng-conversion.service';
import { CreateCngConversionDto, UpdateUserCngConversionInspectionDto } from '../dto/cng-conversion.dto';
import { JwtAuthPayload } from 'src/modules/auth/auth.interface';
import type { Request as ExpressRequest } from 'express';
export declare class CngUserConversionController {
    private readonly cngConversionService;
    constructor(cngConversionService: CngUserConversionService);
    create(cngConversionData: CreateCngConversionDto, req: ExpressRequest & {
        user: JwtAuthPayload;
    }): Promise<import("src/utils/response.utils").ApiResponse<import("../entities/user.cng-conversion.entity").UserCngConversion>>;
    updateInspection(body: UpdateUserCngConversionInspectionDto, req: ExpressRequest & {
        user: JwtAuthPayload;
    }): Promise<import("src/utils/response.utils").ApiResponse<any>>;
    getTransmissions(): Promise<import("src/utils/response.utils").ApiResponse<{
        transmissions: import("../../../enums/transmission.enum").TRANSMISSION[];
        fuelTypes: import("../../../enums/fuel-type.enum").FUEL_TYPE[];
        engine_condition: import("../../../enums/engine-condition.enum").ENGINE_CONDITION[];
    }>>;
    fetchUserCngConversions(req: ExpressRequest & {
        user: JwtAuthPayload;
    }, page?: number, limit?: number, search?: string): Promise<import("src/utils/response.utils").ApiResponse<{
        conversions: import("../entities/user.cng-conversion.entity").UserCngConversion[];
    }>>;
    fetchUserCngConversionsStats(req: ExpressRequest & {
        user: JwtAuthPayload;
    }): Promise<import("src/utils/response.utils").ApiResponse<import("../services/cng-conversion.service").UserCngConversionStatsResponse>>;
    fetchUserCngConversionById(id: string, req: ExpressRequest & {
        user: JwtAuthPayload;
    }): Promise<import("src/utils/response.utils").ApiResponse<import("../entities/user.cng-conversion.entity").UserCngConversion & {
        conversionStation?: import("../entities/cng-conversion.stations.entity").CngConversionStation | null;
    }>>;
}
