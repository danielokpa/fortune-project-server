import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CngConversionStation } from '../entities/cng-conversion.stations.entity';
import { UserCngConversion } from '../entities/user.cng-conversion.entity';
import {
  UserCngConversionRepository,
  type CivilServantProofSummary,
  type UserCngConversionDashboardStats,
} from '../repositories/cng-conversion.repository';
import {
  CreateCngConversionDto,
  UpdateUserCngConversionInspectionDto,
} from '../dto/cng-conversion.dto';
import { ENGINE_CONDITION } from 'src/enums/engine-condition.enum';
import { FUEL_TYPE } from 'src/enums/fuel-type.enum';
import { TRANSMISSION } from 'src/enums/transmission.enum';
import { UserCngConversionStatus } from 'src/enums/user-cng-conversion-status.enum';
import { UserService } from 'src/modules/users/services/user.service';
import { UserType } from 'src/enums/user-type.enum';
import { Op } from 'sequelize';

const USER_CNG_CONVERSION_SEARCH_MAX_LEN = 200;
const USER_CNG_STATS_RECENT_LIMIT = 3;

/** Fields omitted from `/cng-conversion/users/stats` only */
type UserCngStatsRecentConversion = Omit<
  UserCngConversion,
  | 'exteriorInspectionImages'
  | 'interiorInspectionImages'
  | 'engineImages'
  | 'keyAreasImages'
  | 'userId'
  | 'yearOfManufacture'
  | 'usualRoute'
>;

type UserCngStatsCivilServantProof = Omit<
  CivilServantProofSummary,
  'idCard' | 'paySlip'
>;

export type UserCngConversionStatsResponse = Omit<
  UserCngConversionDashboardStats,
  'civilServantProof'
> & {
  civilServantProof: UserCngStatsCivilServantProof | null;
  recentConversions: UserCngStatsRecentConversion[];
};

@Injectable()
export class CngConversionService {

  constructor(
    private readonly cngConversionRepository: UserCngConversionRepository,
    private readonly userService: UserService,
  ) {}

  fetchTransmission() {
    const transmissions = Object.values(TRANSMISSION);
    const fuelTypes = Object.values(FUEL_TYPE);
    const engine_condition = Object.values(ENGINE_CONDITION)
    return {
      transmissions,
      fuelTypes,
      engine_condition
    }

  }

  /**
   * Case-insensitive substring match (MySQL default collation) across plate
   * (`vehicleRegisterationNo`), VIN, NIN (“license”-style id), contact fields,
   * vehicle descriptors, route/address, and status.
   */
  private buildUserConversionSearchWhere(
    search?: string | null,
  ): Record<string, unknown> | undefined {
    const raw = search?.trim();
    if (!raw) {
      return undefined;
    }
    if (raw.length > USER_CNG_CONVERSION_SEARCH_MAX_LEN) {
      throw new BadRequestException(
        `Search must be at most ${USER_CNG_CONVERSION_SEARCH_MAX_LEN} characters`,
      );
    }
    const pattern = `%${raw}%`;
    return {
      [Op.or]: [
        { vehicleRegisterationNo: { [Op.like]: pattern } },
        { vinNumber: { [Op.like]: pattern } },
        { nin: { [Op.like]: pattern } },
        { fullName: { [Op.like]: pattern } },
        { email: { [Op.like]: pattern } },
        { contactPhone: { [Op.like]: pattern } },
        { brandOfVehicle: { [Op.like]: pattern } },
        { makeOfVehicle: { [Op.like]: pattern } },
        { color: { [Op.like]: pattern } },
        { yearOfManufacture: { [Op.like]: pattern } },
        { usualRoute: { [Op.like]: pattern } },
        { address: { [Op.like]: pattern } },
        { residentialState: { [Op.like]: pattern } },
        { lga: { [Op.like]: pattern } },
        { engineCapacity: { [Op.like]: pattern } },
        { cylinder: { [Op.like]: pattern } },
        { mileage: { [Op.like]: pattern } },
        { operatingMotorPark: { [Op.like]: pattern } },
        { additionalNote: { [Op.like]: pattern } },
        { status: { [Op.like]: pattern } },
        { id: { [Op.like]: pattern } },
      ],
    };
  }

  async fetchUserCngConversions(
    userId: string,
    page: number,
    limit: number,
    search?: string | null,
  ) {
    try {
      const offset = (page - 1) * limit;
      const searchWhere = this.buildUserConversionSearchWhere(search);
      const conversions = await this.cngConversionRepository.findAll({
        where: {
          userId,
          ...(searchWhere ?? {}),
        },
        order: [['createdAt', 'DESC']],
        limit: limit,
        offset: offset,
      });
      return {
        conversions
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(
        error instanceof Error ? error.message : String(error),
      );
    }
  }

  /**
   * Dashboard stats for the authenticated user (partitioned counts) plus the
   * most recent conversion rows, newest first.
   * Sensitive / bulky fields are stripped here for this endpoint only.
   */
  async fetchUserCngConversionsStats(
    userId: string,
  ): Promise<UserCngConversionStatsResponse> {
    try {
      const [stats, recentRows] = await Promise.all([
        this.cngConversionRepository.aggregateUserDashboardStats(userId),
        this.cngConversionRepository.findAll({
          where: { userId },
          order: [['createdAt', 'DESC']],
          limit: USER_CNG_STATS_RECENT_LIMIT,
        }),
      ]);

      return this.toStatsApiResponse(stats, recentRows);
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : String(error),
      );
    }
  }

  /**
   * Stats-only response shape: drops inspection image JSON and other fields
   * from recent conversions; drops document URLs from civil servant proof.
   */
  private toStatsApiResponse(
    stats: UserCngConversionDashboardStats,
    recentRows: UserCngConversion[],
  ): UserCngConversionStatsResponse {
    const civilServantProof = stats.civilServantProof
      ? (() => {
          const { idCard: _idCard, paySlip: _paySlip, ...proofRest } =
            stats.civilServantProof;
          return proofRest as UserCngStatsCivilServantProof;
        })()
      : null;

    const recentConversions: UserCngStatsRecentConversion[] = recentRows.map(
      (row) => {
        const j = row.toJSON() as unknown as Record<string, unknown>;
        const {
          exteriorInspectionImages: _e,
          interiorInspectionImages: _i,
          engineImages: _eng,
          keyAreasImages: _k,
          userId: _u,
          yearOfManufacture: _y,
          usualRoute: _r,
          ...rest
        } = j;
        return rest as UserCngStatsRecentConversion;
      },
    );

    return {
      pendingConversions: stats.pendingConversions,
      completedConversions: stats.completedConversions,
      myDrafts: stats.myDrafts,
      totalConversions: stats.totalConversions,
      civilServantProof,
      recentConversions,
    };
  }

  async fetchUserCngConversionById(
    userId: string,
    id: string,
  ): Promise<
    UserCngConversion & { conversionStation?: CngConversionStation | null }
  > {
    const row =
      await this.cngConversionRepository.findByIdAndUserId(
        id,
        userId,
      );
    if (!row) {
      throw new NotFoundException('CNG conversion request not found');
    }
    return row;
  }

  async findById(id: string): Promise<UserCngConversion | null> {
    return await this.cngConversionRepository.findById(id);
  }

  async findAll(): Promise<UserCngConversion[]> {
    return await this.cngConversionRepository.findAll();
  }

  async create(
    userId: string,
    userType: UserType,
    cngConversionData: CreateCngConversionDto,
  ): Promise<UserCngConversion> {
    try {
      if (
        userType === UserType.USER ||
        userType === UserType.DRIVER
      ) {
        const user = await this.userService.fetchUser(userId);
        if (!user) {
          throw new NotFoundException('User not found');
        }
      } else {
        throw new BadRequestException(
          'Only user or driver accounts can create a CNG conversion request',
        );
      }

      const data = await this.cngConversionRepository.create({
        fullName: cngConversionData.fullName,
        userId,
        email: cngConversionData.email,
        contactPhone: cngConversionData.contactPhone,
        nin: cngConversionData.nin,
        vehicleRegisterationNo: cngConversionData.vehicleRegisterationNo,
        brandOfVehicle: cngConversionData.brandOfVehicle,
        color: cngConversionData.color,
        makeOfVehicle: cngConversionData.makeOfVehicle,
        yearOfManufacture: cngConversionData.yearOfManufacture,
        vinNumber: cngConversionData.vinNumber,
        registerationExpiryDate: cngConversionData.registerationExpiryDate
          ? new Date(cngConversionData.registerationExpiryDate)
          : null,
        engineCapacity: cngConversionData.engineCapacity,
        cylinder: cngConversionData.cylinder,
        engineCondition: cngConversionData.engineCondition,
        fuelType: cngConversionData.fuelType,
        transmission: cngConversionData.transmission as UserCngConversion['transmission'],
        mileage: cngConversionData.mileage,
        usualRoute: cngConversionData.usualRoute,
        operatingMotorPark: cngConversionData.operatingMotorPark ?? null,
        conversionCenter: cngConversionData.conversionCenter ?? null,
        residentialState: cngConversionData.residentialState,
        lga: cngConversionData.lga,
        address: cngConversionData.address,
        additionalNote: cngConversionData.additionalNote ?? null,
        status: UserCngConversionStatus.IN_DRAFT,
        hasCompletedRegistration: true,
        hasCompletedOnlineInspection: false,
      });

      return data;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        error instanceof Error ? error.message : String(error),
      );
    }
  }

  async updateInspectionForUser(
    userId: string,
    dto: UpdateUserCngConversionInspectionDto,
  ): Promise<any> {
    try {
      const hasAnyField =
        dto.exteriorInspectionImages !== undefined ||
        dto.interiorInspectionImages !== undefined ||
        dto.engineImages !== undefined ||
        dto.keyAreasImages !== undefined;

      if (!hasAnyField) {
        throw new BadRequestException('No fields provided to update');
      }

      const patch: Partial<UserCngConversion> = {};
      if (dto.exteriorInspectionImages !== undefined) {
        patch.exteriorInspectionImages = dto.exteriorInspectionImages;
      }
      if (dto.interiorInspectionImages !== undefined) {
        patch.interiorInspectionImages = dto.interiorInspectionImages;
      }
      if (dto.engineImages !== undefined) {
        patch.engineImages = dto.engineImages;
      }
      if (dto.keyAreasImages !== undefined) {
        patch.keyAreasImages = dto.keyAreasImages;
      }
      patch.hasCompletedOnlineInspection = true;
      patch.status = UserCngConversionStatus.REQUEST_SUBMITTED;

      const existing = await this.cngConversionRepository.findByIdForUser(
        dto.conversionId,
        userId,
      );
      if (!existing || existing.status === UserCngConversionStatus.PAYMENT_COMPLETED) {
        throw new NotFoundException('CNG conversion request not found or payment completed');
      }

      if (existing.hasCompletedOnlineInspection) {
        throw new BadRequestException('CNG conversion has completed online inspection');
      }

      const [count] = await this.cngConversionRepository.updateForUser(
        dto.conversionId,
        userId,
        patch,
      );
      if (!count) {
        const existing = await this.cngConversionRepository.findByIdForUser(
          dto.conversionId,
          userId,
        );
        if (!existing) {
          throw new NotFoundException('CNG conversion request not found');
        }
      }

      return dto;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        error instanceof Error ? error.message : String(error),
      );
    }
  }

  async update(id: string, cngConversionData: Partial<UserCngConversion>): Promise<[number, UserCngConversion[]]> {
    return await this.cngConversionRepository.update(id, cngConversionData);
  }
}

