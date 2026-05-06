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
exports.CngInstallmentUserInfoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_decorator_1 = require("../../auth/decorators/auth.decorator");
const response_utils_1 = require("../../../utils/response.utils");
const validators_utils_1 = require("../../../utils/validators.utils");
const enums_1 = require("../../../enums");
const civil_servant_installment_verification_service_1 = require("../services/civil-servant-installment-verification.service");
const civil_servant_installment_verification_dto_1 = require("../dto/civil-servant-installment-verification.dto");
const civil_servant_installment_verification_status_enum_1 = require("../../../enums/civil-servant-installment-verification-status.enum");
let CngInstallmentUserInfoController = class CngInstallmentUserInfoController {
    verificationService;
    constructor(verificationService) {
        this.verificationService = verificationService;
    }
    async create(dto, req) {
        const userId = validators_utils_1.Validators.validateUuid(req.user.userId);
        const data = await this.verificationService.create(userId, dto);
        return response_utils_1.ResponseUtil.handleResponse(data, 'Civil servant installment verification submitted', common_1.HttpStatus.CREATED);
    }
    async fetchUser(req) {
        const userId = validators_utils_1.Validators.validateUuid(req.user.userId);
        const data = await this.verificationService.fetchUser(userId);
        return response_utils_1.ResponseUtil.handleResponse(data, data
            ? 'Civil servant installment verification retrieved'
            : 'No verification record yet', common_1.HttpStatus.OK);
    }
    async deleteUser(req) {
        const userId = validators_utils_1.Validators.validateUuid(req.user.userId);
        await this.verificationService.deleteUser(userId);
        return response_utils_1.ResponseUtil.handleResponse(null, 'Civil servant installment verification deleted', common_1.HttpStatus.OK);
    }
    async adminList(page = 1, limit = 10, status) {
        const data = await this.verificationService.findAllForAdmin({
            page: Number(page),
            limit: Number(limit),
            status,
        });
        return response_utils_1.ResponseUtil.handleResponse(data, 'Civil servant installment verifications fetched', common_1.HttpStatus.OK);
    }
    async updateStatus(id, dto) {
        const data = await this.verificationService.updateStatusById(id, dto);
        return response_utils_1.ResponseUtil.handleResponse(data, 'Verification status updated', common_1.HttpStatus.OK);
    }
    async adminDelete(id) {
        await this.verificationService.deleteByIdForAdmin(id);
        return response_utils_1.ResponseUtil.handleResponse(null, 'Civil servant installment verification deleted', common_1.HttpStatus.OK);
    }
};
exports.CngInstallmentUserInfoController = CngInstallmentUserInfoController;
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)([enums_1.UserType.USER, enums_1.UserType.DRIVER]),
    (0, swagger_1.ApiOperation)({
        summary: 'Submit civil servant installment verification (one per user)',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Verification record created' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [civil_servant_installment_verification_dto_1.CreateCivilServantInstallmentUserInfoDto, Object]),
    __metadata("design:returntype", Promise)
], CngInstallmentUserInfoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorator_1.Auth)([enums_1.UserType.USER, enums_1.UserType.DRIVER]),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user civil servant verification record' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Record returned or null' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CngInstallmentUserInfoController.prototype, "fetchUser", null);
__decorate([
    (0, common_1.Delete)(),
    (0, auth_decorator_1.Auth)([enums_1.UserType.USER, enums_1.UserType.DRIVER]),
    (0, swagger_1.ApiOperation)({
        summary: 'Soft-delete own verification (only while status is PENDING)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Verification deleted' }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Record is not PENDING',
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CngInstallmentUserInfoController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)('admin/list'),
    (0, auth_decorator_1.Auth)([enums_1.UserType.SUPER_ADMIN, enums_1.UserType.PEPP_ADMIN, enums_1.UserType.PEPP_MANAGER]),
    (0, swagger_1.ApiOperation)({
        summary: 'List civil servant verification submissions (paginated, optional status)',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 10 }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        required: false,
        enum: civil_servant_installment_verification_status_enum_1.CivilServantInstallmentVerificationStatus,
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Paginated list' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], CngInstallmentUserInfoController.prototype, "adminList", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, auth_decorator_1.Auth)([enums_1.UserType.SUPER_ADMIN, enums_1.UserType.PEPP_ADMIN, enums_1.UserType.PEPP_MANAGER]),
    (0, swagger_1.ApiOperation)({
        summary: 'Set verification status (VERIFIED / UNVERIFIED / PENDING)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Status updated' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, civil_servant_installment_verification_dto_1.UpdateCivilServantInstallmentStatusDto]),
    __metadata("design:returntype", Promise)
], CngInstallmentUserInfoController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorator_1.Auth)([enums_1.UserType.SUPER_ADMIN, enums_1.UserType.PEPP_ADMIN, enums_1.UserType.PEPP_MANAGER]),
    (0, swagger_1.ApiOperation)({
        summary: 'Soft-delete a verification by id (admin; only while PENDING)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Verification deleted' }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Record is not PENDING',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CngInstallmentUserInfoController.prototype, "adminDelete", null);
exports.CngInstallmentUserInfoController = CngInstallmentUserInfoController = __decorate([
    (0, swagger_1.ApiTags)('CNG Installment — Civil servant verification'),
    (0, common_1.Controller)('cng-conversion/installment'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [civil_servant_installment_verification_service_1.CivilServantInstallmentVerificationService])
], CngInstallmentUserInfoController);
//# sourceMappingURL=cng-installment-user-info.controller.js.map