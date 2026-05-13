import { CngConversionStation } from '../entities/cng-conversion.stations.entity';
import { UserCngConversion } from '../entities/user.cng-conversion.entity';
import { UserCngConversionRepository, type CivilServantProofSummary, type UserCngConversionDashboardStats } from '../repositories/cng-conversion.repository';
import { CreateCngConversionDto, UpdateUserCngConversionInspectionDto } from '../dto/cng-conversion.dto';
import { ENGINE_CONDITION } from 'src/enums/engine-condition.enum';
import { FUEL_TYPE } from 'src/enums/fuel-type.enum';
import { TRANSMISSION } from 'src/enums/transmission.enum';
import { UserService } from 'src/modules/users/services/user.service';
import { UserType } from 'src/enums/user-type.enum';
import { UserCngStationRepository } from '../repositories/user-cng-station.repository';
type UserCngStatsRecentConversion = Omit<UserCngConversion, 'exteriorInspectionImages' | 'interiorInspectionImages' | 'engineImages' | 'keyAreasImages' | 'userId' | 'yearOfManufacture' | 'usualRoute'>;
type UserCngStatsCivilServantProof = Omit<CivilServantProofSummary, 'idCard' | 'paySlip'>;
export type UserCngConversionStatsResponse = Omit<UserCngConversionDashboardStats, 'civilServantProof'> & {
    civilServantProof: UserCngStatsCivilServantProof | null;
    recentConversions: UserCngStatsRecentConversion[];
};
export declare class CngConversionService {
    private readonly cngConversionRepository;
    private readonly userService;
    private readonly userCngStations;
    constructor(cngConversionRepository: UserCngConversionRepository, userService: UserService, userCngStations: UserCngStationRepository);
    fetchTransmission(): {
        transmissions: TRANSMISSION[];
        fuelTypes: FUEL_TYPE[];
        engine_condition: ENGINE_CONDITION[];
    };
    private buildUserConversionSearchWhere;
    fetchUserCngConversions(userId: string, page: number, limit: number, search?: string | null): Promise<{
        conversions: UserCngConversion[];
        activeTrip: import("../entities/user.cng-station.entity").UserCngStation | null;
    }>;
    fetchUserCngConversionsStats(userId: string): Promise<UserCngConversionStatsResponse>;
    private toStatsApiResponse;
    fetchUserCngConversionById(userId: string, id: string): Promise<UserCngConversion & {
        conversionStation?: CngConversionStation | null;
    }>;
    findById(id: string): Promise<UserCngConversion | null>;
    findAll(): Promise<UserCngConversion[]>;
    create(userId: string, userType: UserType, cngConversionData: CreateCngConversionDto): Promise<UserCngConversion>;
    updateInspectionForUser(userId: string, dto: UpdateUserCngConversionInspectionDto): Promise<any>;
    update(id: string, cngConversionData: Partial<UserCngConversion>): Promise<[number, UserCngConversion[]]>;
}
export {};
