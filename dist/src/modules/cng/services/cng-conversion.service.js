"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CngConversionService = void 0;
const common_1 = require("@nestjs/common");
const cng_conversion_repository_1 = require("../repositories/cng-conversion.repository");
const engine_condition_enum_1 = require("../../../enums/engine-condition.enum");
const fuel_type_enum_1 = require("../../../enums/fuel-type.enum");
const transmission_enum_1 = require("../../../enums/transmission.enum");
const user_cng_conversion_status_enum_1 = require("../../../enums/user-cng-conversion-status.enum");
const user_service_1 = require("../../users/services/user.service");
const user_type_enum_1 = require("../../../enums/user-type.enum");
const sequelize_1 = require("sequelize");
const USER_CNG_CONVERSION_SEARCH_MAX_LEN = 200;
const USER_CNG_STATS_RECENT_LIMIT = 3;
let CngConversionService = class CngConversionService {
    cngConversionRepository;
    userService;
    constructor(cngConversionRepository, userService) {
        this.cngConversionRepository = cngConversionRepository;
        this.userService = userService;
    }
    fetchTransmission() {
        const transmissions = Object.values(transmission_enum_1.TRANSMISSION);
        const fuelTypes = Object.values(fuel_type_enum_1.FUEL_TYPE);
        const engine_condition = Object.values(engine_condition_enum_1.ENGINE_CONDITION);
        return {
            transmissions,
            fuelTypes,
            engine_condition
        };
    }
    buildUserConversionSearchWhere(search) {
        const raw = search?.trim();
        if (!raw) {
            return undefined;
        }
        if (raw.length > USER_CNG_CONVERSION_SEARCH_MAX_LEN) {
            throw new common_1.BadRequestException(`Search must be at most ${USER_CNG_CONVERSION_SEARCH_MAX_LEN} characters`);
        }
        const pattern = `%${raw}%`;
        return {
            [sequelize_1.Op.or]: [
                { vehicleRegisterationNo: { [sequelize_1.Op.like]: pattern } },
                { vinNumber: { [sequelize_1.Op.like]: pattern } },
                { nin: { [sequelize_1.Op.like]: pattern } },
                { fullName: { [sequelize_1.Op.like]: pattern } },
                { email: { [sequelize_1.Op.like]: pattern } },
                { contactPhone: { [sequelize_1.Op.like]: pattern } },
                { brandOfVehicle: { [sequelize_1.Op.like]: pattern } },
                { makeOfVehicle: { [sequelize_1.Op.like]: pattern } },
                { color: { [sequelize_1.Op.like]: pattern } },
                { yearOfManufacture: { [sequelize_1.Op.like]: pattern } },
                { usualRoute: { [sequelize_1.Op.like]: pattern } },
                { address: { [sequelize_1.Op.like]: pattern } },
                { residentialState: { [sequelize_1.Op.like]: pattern } },
                { lga: { [sequelize_1.Op.like]: pattern } },
                { engineCapacity: { [sequelize_1.Op.like]: pattern } },
                { cylinder: { [sequelize_1.Op.like]: pattern } },
                { mileage: { [sequelize_1.Op.like]: pattern } },
                { operatingMotorPark: { [sequelize_1.Op.like]: pattern } },
                { additionalNote: { [sequelize_1.Op.like]: pattern } },
                { status: { [sequelize_1.Op.like]: pattern } },
                { id: { [sequelize_1.Op.like]: pattern } },
            ],
        };
    }
    async fetchUserCngConversions(userId, page, limit, search) {
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
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException(error instanceof Error ? error.message : String(error));
        }
    }
    async fetchUserCngConversionsStats(userId) {
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
        }
        catch (error) {
            throw new common_1.BadRequestException(error instanceof Error ? error.message : String(error));
        }
    }
    toStatsApiResponse(stats, recentRows) {
        const civilServantProof = stats.civilServantProof
            ? (() => {
                const { idCard: _idCard, paySlip: _paySlip, ...proofRest } = stats.civilServantProof;
                return proofRest;
            })()
            : null;
        const recentConversions = recentRows.map((row) => {
            const j = row.toJSON();
            const { exteriorInspectionImages: _e, interiorInspectionImages: _i, engineImages: _eng, keyAreasImages: _k, userId: _u, yearOfManufacture: _y, usualRoute: _r, ...rest } = j;
            return rest;
        });
        return {
            pendingConversions: stats.pendingConversions,
            completedConversions: stats.completedConversions,
            myDrafts: stats.myDrafts,
            totalConversions: stats.totalConversions,
            civilServantProof,
            recentConversions,
        };
    }
    async fetchUserCngConversionById(userId, id) {
        const row = await this.cngConversionRepository.findByIdAndUserId(id, userId);
        if (!row) {
            throw new common_1.NotFoundException('CNG conversion request not found');
        }
        return row;
    }
    async findById(id) {
        return await this.cngConversionRepository.findById(id);
    }
    async findAll() {
        return await this.cngConversionRepository.findAll();
    }
    async create(userId, userType, cngConversionData) {
        try {
            if (userType === user_type_enum_1.UserType.USER ||
                userType === user_type_enum_1.UserType.DRIVER) {
                const user = await this.userService.fetchUser(userId);
                if (!user) {
                    throw new common_1.NotFoundException('User not found');
                }
            }
            else {
                throw new common_1.BadRequestException('Only user or driver accounts can create a CNG conversion request');
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
                transmission: cngConversionData.transmission,
                mileage: cngConversionData.mileage,
                usualRoute: cngConversionData.usualRoute,
                operatingMotorPark: cngConversionData.operatingMotorPark ?? null,
                conversionCenter: cngConversionData.conversionCenter ?? null,
                residentialState: cngConversionData.residentialState,
                lga: cngConversionData.lga,
                address: cngConversionData.address,
                additionalNote: cngConversionData.additionalNote ?? null,
                status: user_cng_conversion_status_enum_1.UserCngConversionStatus.IN_DRAFT,
                hasCompletedRegistration: true,
                hasCompletedOnlineInspection: false,
            });
            return data;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException(error instanceof Error ? error.message : String(error));
        }
    }
    async updateInspectionForUser(userId, dto) {
        const hasAnyField = dto.exteriorInspectionImages !== undefined ||
            dto.interiorInspectionImages !== undefined ||
            dto.engineImages !== undefined ||
            dto.keyAreasImages !== undefined;
        if (!hasAnyField) {
            throw new common_1.BadRequestException('No fields provided to update');
        }
        const patch = {};
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
        patch.status = user_cng_conversion_status_enum_1.UserCngConversionStatus.REQUEST_SUBMITTED;
        const [count] = await this.cngConversionRepository.updateForUser(dto.conversionId, userId, patch);
        if (!count) {
            throw new common_1.NotFoundException('CNG conversion request not found');
        }
        return dto;
    }
    async update(id, cngConversionData) {
        return await this.cngConversionRepository.update(id, cngConversionData);
    }
};
exports.CngConversionService = CngConversionService;
exports.CngConversionService = CngConversionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cng_conversion_repository_1.UserCngConversionRepository,
        user_service_1.UserService])
], CngConversionService);
//# sourceMappingURL=cng-conversion.service.js.map