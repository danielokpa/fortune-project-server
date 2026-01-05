import { CngConversionService } from '../services/cng-conversion.service';
import { CreateCngConversionDto } from '../dto/cng-conversion.dto';
import { JwtAuthPayload } from 'src/modules/auth/auth.interface';
import type { Request as ExpressRequest } from 'express';
export declare class CngConversionController {
    private readonly cngConversionService;
    constructor(cngConversionService: CngConversionService);
    create(cngConversionData: CreateCngConversionDto, req: ExpressRequest & {
        user: JwtAuthPayload;
    }): Promise<import("src/utils/response.utils").ApiResponse<CreateCngConversionDto>>;
    getTransmissions(): Promise<import("src/utils/response.utils").ApiResponse<{
        transmissions: import("../../../enums/transmission.enum").TRANSMISSION[];
        fuelTypes: import("../../../enums/fuel-type.enum").FUEL_TYPE[];
        engine_condition: import("../../../enums/engine-condition.enum").ENGINE_CONDITION[];
    }>>;
    fetchUserCngConversions(req: ExpressRequest & {
        user: JwtAuthPayload;
    }, page?: number, limit?: number): Promise<import("src/utils/response.utils").ApiResponse<{
        fetchTransmission: {
            transmissions: import("../../../enums/transmission.enum").TRANSMISSION[];
            fuelTypes: import("../../../enums/fuel-type.enum").FUEL_TYPE[];
            engine_condition: import("../../../enums/engine-condition.enum").ENGINE_CONDITION[];
        };
        conversions: import("../entities/cng-conversion.entity").CngConversion[];
    }>>;
    fetchUserCngConversionsStats(req: ExpressRequest & {
        user: JwtAuthPayload;
    }, page?: number, limit?: number): Promise<import("src/utils/response.utils").ApiResponse<{
        pending: number;
        completed: number;
    }>>;
}
