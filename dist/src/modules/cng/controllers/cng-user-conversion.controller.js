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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CngUserConversionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cng_conversion_service_1 = require("../services/cng-conversion.service");
const cng_conversion_dto_1 = require("../dto/cng-conversion.dto");
const response_utils_1 = require("../../../utils/response.utils");
const validators_utils_1 = require("../../../utils/validators.utils");
const enums_1 = require("../../../enums");
const auth_decorator_1 = require("../../auth/decorators/auth.decorator");
let CngUserConversionController = class CngUserConversionController {
    cngConversionService;
    constructor(cngConversionService) {
        this.cngConversionService = cngConversionService;
    }
    async create(cngConversionData, req) {
        const userId = validators_utils_1.Validators.validateUuid(req.user.userId);
        const data = await this.cngConversionService.create(userId, req.user.userType, cngConversionData);
        return response_utils_1.ResponseUtil.handleResponse(data, 'CNG conversion request created successfully', common_1.HttpStatus.CREATED);
    }
    async updateInspection(body, req) {
        const userId = validators_utils_1.Validators.validateUuid(req.user.userId);
        const data = await this.cngConversionService.updateInspectionForUser(userId, body);
        return response_utils_1.ResponseUtil.handleResponse(data, 'CNG conversion inspection updated successfully', common_1.HttpStatus.OK);
    }
    async getTransmissions() {
        const data = await this.cngConversionService.fetchTransmission();
        return response_utils_1.ResponseUtil.handleResponse(data, 'Transmission types retrieved successfully', common_1.HttpStatus.OK);
    }
    async fetchUserCngConversions(req, page = 1, limit = 10, search) {
        const userId = validators_utils_1.Validators.validateUuid(req.user.userId);
        const data = await this.cngConversionService.fetchUserCngConversions(userId, page, limit, search);
        return response_utils_1.ResponseUtil.handleResponse(data, 'Fetch cng conversions retrieved successfully', common_1.HttpStatus.OK);
    }
    async fetchUserCngConversionsStats(req) {
        const userId = validators_utils_1.Validators.validateUuid(req.user.userId);
        const data = await this.cngConversionService.fetchUserCngConversionsStats(userId);
        return response_utils_1.ResponseUtil.handleResponse(data, 'Fetch cng conversions retrieved successfully', common_1.HttpStatus.OK);
    }
    async fetchUserCngConversionById(id, req) {
        const userId = validators_utils_1.Validators.validateUuid(req.user.userId);
        const data = await this.cngConversionService.fetchUserCngConversionById(userId, id);
        return response_utils_1.ResponseUtil.handleResponse(data, 'CNG conversion request retrieved successfully', common_1.HttpStatus.OK);
    }
};
exports.CngUserConversionController = CngUserConversionController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a CNG conversion request' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'CNG conversion request created successfully' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cng_conversion_dto_1.CreateCngConversionDto, Object]),
    __metadata("design:returntype", Promise)
], CngUserConversionController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Update CNG conversion inspection images / file URLs and optional step flags',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'CNG conversion inspection updated successfully',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cng_conversion_dto_1.UpdateUserCngConversionInspectionDto, Object]),
    __metadata("design:returntype", Promise)
], CngUserConversionController.prototype, "updateInspection", null);
__decorate([
    (0, common_1.Get)('vehicle-transmissions'),
    (0, swagger_1.ApiOperation)({ summary: 'Get list of transmission types' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Transmission types retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CngUserConversionController.prototype, "getTransmissions", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'List current user’s CNG conversion requests (paginated, optional search)',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 10 }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        description: 'Substring match on plate (vehicle registration no.), VIN, NIN, name, email, phone, vehicle fields, route, address, status, id',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'CNG conversion requests retrieved successfully',
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, String]),
    __metadata("design:returntype", Promise)
], CngUserConversionController.prototype, "fetchUserCngConversions", null);
__decorate([
    (0, common_1.Get)('/stats'),
    (0, swagger_1.ApiOperation)({
        summary: 'User CNG conversion dashboard counts and 4 most recent conversion requests',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'pendingConversions, completedConversions, myDrafts, totalConversions, civilServantProof (joined civil servant installment row by userId, or null), recentConversions (up to 4, newest first)',
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CngUserConversionController.prototype, "fetchUserCngConversionsStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get one CNG conversion request for the current user (includes conversion center / station when set)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User CNG conversion with nested conversionStation (CngConversionStation) when conversionCenter is set',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CngUserConversionController.prototype, "fetchUserCngConversionById", null);
exports.CngUserConversionController = CngUserConversionController = __decorate([
    (0, swagger_1.ApiTags)('CNG Conversion'),
    (0, common_1.Controller)('cng-conversion/users'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, auth_decorator_1.Auth)([enums_1.UserType.USER, enums_1.UserType.DRIVER]),
    __metadata("design:paramtypes", [cng_conversion_service_1.CngConversionService])
], CngUserConversionController);
//# sourceMappingURL=cng-user-conversion.controller.js.map