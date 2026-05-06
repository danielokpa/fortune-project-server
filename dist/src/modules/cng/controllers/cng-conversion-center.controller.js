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
exports.CngConversionCenterController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../../enums");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const auth_guard_1 = require("../../auth/guards/auth.guard");
const response_utils_1 = require("../../../utils/response.utils");
const cng_conversion_center_dto_1 = require("../dto/cng-conversion-center.dto");
const cng_conversion_center_service_1 = require("../services/cng-conversion-center.service");
let CngConversionCenterController = class CngConversionCenterController {
    centerService;
    constructor(centerService) {
        this.centerService = centerService;
    }
    async findAll(query, _req) {
        const data = await this.centerService.findAll(query);
        return response_utils_1.ResponseUtil.handleResponse(data, 'CNG conversion centers fetched successfully', common_1.HttpStatus.OK);
    }
    async create(payload, req) {
        const data = await this.centerService.create(payload, req.headers.authorization);
        return response_utils_1.ResponseUtil.handleResponse(data, 'CNG conversion center created successfully', common_1.HttpStatus.CREATED);
    }
    async findById(id, _req) {
        const data = await this.centerService.findById(id);
        return response_utils_1.ResponseUtil.handleResponse(data, 'CNG conversion center fetched successfully', common_1.HttpStatus.OK);
    }
    async update(id, payload, _req) {
        const data = await this.centerService.update(id, payload);
        return response_utils_1.ResponseUtil.handleResponse(data, 'CNG conversion center updated successfully', common_1.HttpStatus.OK);
    }
    async remove(id, _req) {
        await this.centerService.delete(id);
        return response_utils_1.ResponseUtil.handleResponse(null, 'CNG conversion center deleted successfully', common_1.HttpStatus.OK);
    }
};
exports.CngConversionCenterController = CngConversionCenterController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Fetch/search CNG conversion centers (paginated)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'CNG conversion centers fetched successfully',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cng_conversion_center_dto_1.FindCngConversionCentersQueryDto, Object]),
    __metadata("design:returntype", Promise)
], CngConversionCenterController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(enums_1.UserType.SUPER_ADMIN, enums_1.UserType.PEPP_ADMIN, enums_1.UserType.PEPP_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Create CNG conversion center' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'CNG conversion center created successfully',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cng_conversion_center_dto_1.CreateCngConversionCenterDto, Object]),
    __metadata("design:returntype", Promise)
], CngConversionCenterController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Fetch one CNG conversion center',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'CNG conversion center fetched successfully',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CngConversionCenterController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.UserType.SUPER_ADMIN, enums_1.UserType.PEPP_ADMIN, enums_1.UserType.PEPP_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Update CNG conversion center' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'CNG conversion center updated successfully',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cng_conversion_center_dto_1.UpdateCngConversionCenterDto, Object]),
    __metadata("design:returntype", Promise)
], CngConversionCenterController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.UserType.SUPER_ADMIN, enums_1.UserType.PEPP_ADMIN, enums_1.UserType.PEPP_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Delete CNG conversion center' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'CNG conversion center deleted successfully',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CngConversionCenterController.prototype, "remove", null);
exports.CngConversionCenterController = CngConversionCenterController = __decorate([
    (0, swagger_1.ApiTags)('CNG Conversion Centers'),
    (0, common_1.Controller)('cng-conversion/centers'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [cng_conversion_center_service_1.CngConversionCenterService])
], CngConversionCenterController);
//# sourceMappingURL=cng-conversion-center.controller.js.map