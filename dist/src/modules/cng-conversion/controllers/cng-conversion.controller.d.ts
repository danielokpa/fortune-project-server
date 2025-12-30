import { CngConversionService } from '../services/cng-conversion.service';
import { CngStationService } from '../services/cng-station.service';
import { CreateCngConversionDto } from '../dto/cng-conversion.dto';
import { FindCngStationsDto } from '../dto/cng-station.dto';
import { TRANSMISSION } from 'src/enums/transmission.enum';
import { FUEL_TYPE } from 'src/enums/fuel-type.enum';
import { ENGINE_CONDITION } from 'src/enums/engine-condition.enum';
import { JwtAuthPayload } from 'src/modules/auth/auth.interface';
import type { Request as ExpressRequest } from 'express';
export declare class CngConversionController {
    private readonly cngConversionService;
    private readonly cngStationService;
    constructor(cngConversionService: CngConversionService, cngStationService: CngStationService);
    create(cngConversionData: CreateCngConversionDto, req: ExpressRequest & {
        user: JwtAuthPayload;
    }): Promise<import("src/utils/response.utils").ApiResponse<CreateCngConversionDto>>;
    getTransmissions(): Promise<import("src/utils/response.utils").ApiResponse<{
        transmissions: TRANSMISSION[];
        fuelTypes: FUEL_TYPE[];
        engine_condition: ENGINE_CONDITION[];
    }>>;
    getStations(req: ExpressRequest & {
        user: JwtAuthPayload;
    }, page?: number, limit?: number, country?: string, state?: string, isActive?: boolean): Promise<import("src/utils/response.utils").ApiResponse<{
        stations: import("../entities/cng-station.entity").CngStation[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>>;
    getActiveStations(req: ExpressRequest & {
        user: JwtAuthPayload;
    }, page?: number, limit?: number, country?: string, state?: string): Promise<import("src/utils/response.utils").ApiResponse<{
        stations: import("../entities/cng-station.entity").CngStation[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>>;
    findNearbyStations(findNearbyDto: FindCngStationsDto, req: ExpressRequest & {
        user: JwtAuthPayload;
    }): Promise<import("src/utils/response.utils").ApiResponse<{
        stations: import("../entities/cng-station.entity").CngStation[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>>;
    fetchUserCngConversions(req: ExpressRequest & {
        user: JwtAuthPayload;
    }, page?: number, limit?: number): Promise<import("src/utils/response.utils").ApiResponse<{
        fetchTransmission: {
            transmissions: TRANSMISSION[];
            fuelTypes: FUEL_TYPE[];
            engine_condition: ENGINE_CONDITION[];
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
