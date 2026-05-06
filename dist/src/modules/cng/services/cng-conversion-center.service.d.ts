import { ConfigService } from '@nestjs/config';
import { AxiosService } from 'src/services/axios/axios.service';
import { CngConversionStation } from '../entities/cng-conversion.stations.entity';
import type { CngConversionCenterWithVirtualAccount } from '../repositories/cng-conversion-center.repository';
import { CngConversionCenterRepository } from '../repositories/cng-conversion-center.repository';
import { CreateCngConversionCenterDto, FindCngConversionCentersQueryDto, UpdateCngConversionCenterDto } from '../dto/cng-conversion-center.dto';
export declare class CngConversionCenterService {
    private readonly centerRepository;
    private readonly axiosService;
    private readonly configService;
    private readonly logger;
    constructor(centerRepository: CngConversionCenterRepository, axiosService: AxiosService, configService: ConfigService);
    private extractAuthToken;
    private createVirtualAccountFromPayment;
    create(payload: CreateCngConversionCenterDto, authHeader?: string): Promise<CngConversionStation>;
    update(id: string, payload: UpdateCngConversionCenterDto): Promise<CngConversionStation>;
    delete(id: string): Promise<void>;
    findAll(query: FindCngConversionCentersQueryDto): Promise<{
        centers: CngConversionStation[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findById(id: string): Promise<CngConversionCenterWithVirtualAccount>;
}
