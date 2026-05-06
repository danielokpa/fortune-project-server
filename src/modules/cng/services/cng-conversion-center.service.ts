import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosService } from 'src/services/axios/axios.service';
import { CngConversionStation } from '../entities/cng-conversion.stations.entity';
import type { CngConversionCenterWithVirtualAccount } from '../repositories/cng-conversion-center.repository';
import { CngConversionCenterRepository } from '../repositories/cng-conversion-center.repository';
import {
  CreateCngConversionCenterDto,
  FindCngConversionCentersQueryDto,
  UpdateCngConversionCenterDto,
} from '../dto/cng-conversion-center.dto';

@Injectable()
export class CngConversionCenterService {
  private readonly logger = new Logger(CngConversionCenterService.name);

  constructor(
    private readonly centerRepository: CngConversionCenterRepository,
    private readonly axiosService: AxiosService,
    private readonly configService: ConfigService,
  ) {}

  private extractAuthToken(authHeader?: string): string {
    if (!authHeader) {
      return '';
    }
    const [type, token] = authHeader.split(' ');
    if (type?.toLowerCase() === 'bearer' && token) {
      return token;
    }
    return authHeader;
  }

  private async createVirtualAccountFromPayment(
    centerId: string,
    bvn: string,
    authHeader?: string,
  ): Promise<void> {
    const paymentBaseUrl =
      this.configService.get<string>('PAYMENT_SERVICE_URL') ||
      process.env.PAYMENT_SERVICE_URL ||
      '';
    if (!paymentBaseUrl) {
      throw new BadRequestException('PAYMENT_SERVICE_URL not configured');
    }

    const productKey = this.configService.get<string>('app.apiKey');
    const token = this.extractAuthToken(authHeader);

    const response = await this.axiosService.post(
      `${paymentBaseUrl}/api/v1/payment/virtual-account`,
      {
        // userId: centerId,
        // userType: 'CNG_STATION',
        bvn: bvn.toString(),
      },
      {
        headers: {
          'x-product-key': productKey,
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      },
    );

    const payload = response?.data as any;
    if (!payload || payload?.status === false) {
      this.logger.error(`Payment API failed: ${JSON.stringify(payload)}`);
      throw new BadRequestException(
        'Failed to create virtual account via payment service',
      );
    }
  }

  async create(
    payload: CreateCngConversionCenterDto,
    authHeader?: string,
  ): Promise<CngConversionStation> {
    try {
      const sequelize = this.centerRepository.getSequelize();
      if (!sequelize) {
        throw new BadRequestException(
          'Database connection not available for transaction',
        );
      }

      let bvn;
      if (payload?.bvn) {
        bvn = payload.bvn;
        delete payload?.bvn;
      } 

      delete payload?.bvn;


      return await sequelize.transaction(async (transaction) => {
        const center = await this.centerRepository.create(payload, {
          transaction,
        });

        await this.createVirtualAccountFromPayment(
          center.id,
          bvn,
          authHeader,
        );

        return center;
      });
    } catch (error) {
      this.logger.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        error instanceof Error ? error.message : String(error),
      );
    }
  }

  async update(
    id: string,
    payload: UpdateCngConversionCenterDto,
  ): Promise<CngConversionStation> {
    try {
      const [count, rows] = await this.centerRepository.update(id, payload);
      if (!count) {
        throw new NotFoundException(
          `CNG conversion center with ID ${id} not found`,
        );
      }

      const updated = rows?.[0];
      return updated ?? ({ id, ...payload } as CngConversionStation);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        error instanceof Error ? error.message : String(error),
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const count = await this.centerRepository.delete(id);
      if (!count) {
        throw new NotFoundException(
          `CNG conversion center with ID ${id} not found`,
        );
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        error instanceof Error ? error.message : String(error),
      );
    }
  }

  async findAll(query: FindCngConversionCentersQueryDto): Promise<{
    centers: CngConversionStation[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    try {
      const page = query.page ?? 1;
      const limit = query.limit ?? 10;
      const { rows, count } = await this.centerRepository.findAll({
        page,
        limit,
        search: query.search,
        isActive: query.isActive,
      });

      return {
        centers: rows,
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        error instanceof Error ? error.message : String(error),
      );
    }
  }

  async findById(id: string): Promise<CngConversionCenterWithVirtualAccount> {
    try {
      const center =
        await this.centerRepository.findByIdWithVirtualAccountRaw(id);
      if (!center) {
        throw new NotFoundException(
          `CNG conversion center with ID ${id} not found`,
        );
      }
      return center;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
