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
var CngConversionCenterService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CngConversionCenterService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_service_1 = require("../../../services/axios/axios.service");
const cng_conversion_center_repository_1 = require("../repositories/cng-conversion-center.repository");
let CngConversionCenterService = CngConversionCenterService_1 = class CngConversionCenterService {
    centerRepository;
    axiosService;
    configService;
    logger = new common_1.Logger(CngConversionCenterService_1.name);
    constructor(centerRepository, axiosService, configService) {
        this.centerRepository = centerRepository;
        this.axiosService = axiosService;
        this.configService = configService;
    }
    extractAuthToken(authHeader) {
        if (!authHeader) {
            return '';
        }
        const [type, token] = authHeader.split(' ');
        if (type?.toLowerCase() === 'bearer' && token) {
            return token;
        }
        return authHeader;
    }
    async createVirtualAccountFromPayment(centerId, bvn, authHeader) {
        const paymentBaseUrl = this.configService.get('PAYMENT_SERVICE_URL') ||
            process.env.PAYMENT_SERVICE_URL ||
            '';
        if (!paymentBaseUrl) {
            throw new common_1.BadRequestException('PAYMENT_SERVICE_URL not configured');
        }
        const productKey = this.configService.get('app.apiKey');
        const token = this.extractAuthToken(authHeader);
        const response = await this.axiosService.post(`${paymentBaseUrl}/api/v1/payment/virtual-account`, {
            bvn: bvn.toString(),
        }, {
            headers: {
                'x-product-key': productKey,
                Authorization: token ? `Bearer ${token}` : undefined,
            },
        });
        const payload = response?.data;
        if (!payload || payload?.status === false) {
            this.logger.error(`Payment API failed: ${JSON.stringify(payload)}`);
            throw new common_1.BadRequestException('Failed to create virtual account via payment service');
        }
    }
    async create(payload, authHeader) {
        try {
            const sequelize = this.centerRepository.getSequelize();
            if (!sequelize) {
                throw new common_1.BadRequestException('Database connection not available for transaction');
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
                await this.createVirtualAccountFromPayment(center.id, bvn, authHeader);
                return center;
            });
        }
        catch (error) {
            this.logger.error(error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException(error instanceof Error ? error.message : String(error));
        }
    }
    async update(id, payload) {
        try {
            const [count, rows] = await this.centerRepository.update(id, payload);
            if (!count) {
                throw new common_1.NotFoundException(`CNG conversion center with ID ${id} not found`);
            }
            const updated = rows?.[0];
            return updated ?? { id, ...payload };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException(error instanceof Error ? error.message : String(error));
        }
    }
    async delete(id) {
        try {
            const count = await this.centerRepository.delete(id);
            if (!count) {
                throw new common_1.NotFoundException(`CNG conversion center with ID ${id} not found`);
            }
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException(error instanceof Error ? error.message : String(error));
        }
    }
    async findAll(query) {
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
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException(error instanceof Error ? error.message : String(error));
        }
    }
    async findById(id) {
        try {
            const center = await this.centerRepository.findByIdWithVirtualAccountRaw(id);
            if (!center) {
                throw new common_1.NotFoundException(`CNG conversion center with ID ${id} not found`);
            }
            return center;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException(error instanceof Error ? error.message : String(error));
        }
    }
};
exports.CngConversionCenterService = CngConversionCenterService;
exports.CngConversionCenterService = CngConversionCenterService = CngConversionCenterService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cng_conversion_center_repository_1.CngConversionCenterRepository,
        axios_service_1.AxiosService,
        config_1.ConfigService])
], CngConversionCenterService);
//# sourceMappingURL=cng-conversion-center.service.js.map