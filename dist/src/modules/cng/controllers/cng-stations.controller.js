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
exports.CngStationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cng_stations_service_1 = require("../services/cng-stations.service");
const user_cng_station_service_1 = require("../services/user-cng-station.service");
const cng_station_dto_1 = require("../dto/cng-station.dto");
const response_utils_1 = require("../../../utils/response.utils");
const validators_utils_1 = require("../../../utils/validators.utils");
const enums_1 = require("../../../enums");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const auth_guard_1 = require("../../auth/guards/auth.guard");
let CngStationsController = class CngStationsController {
    cngStationsService;
    userCngStationService;
    constructor(cngStationsService, userCngStationService) {
        this.cngStationsService = cngStationsService;
        this.userCngStationService = userCngStationService;
    }
    async findAll(findDto, req) {
        const userId = req.user?.userId;
        const data = await this.cngStationsService.findAll(findDto, userId);
        return response_utils_1.ResponseUtil.handleResponse(data, 'CNG stations retrieved successfully', common_1.HttpStatus.OK);
    }
    async findActiveStations(findDto, req) {
        const userId = req.user?.userId;
        const data = await this.cngStationsService.findActiveStations(findDto, userId);
        return response_utils_1.ResponseUtil.handleResponse(data, 'Active CNG stations retrieved successfully', common_1.HttpStatus.OK);
    }
    async findNearby(findNearbyDto, req) {
        const userId = req.user?.userId;
        const data = await this.cngStationsService.findNearbyStations({
            ...findNearbyDto,
            userId,
        });
        return response_utils_1.ResponseUtil.handleResponse(data, 'Nearby CNG stations retrieved successfully', common_1.HttpStatus.OK);
    }
    async search(searchDto, req) {
        const userId = req.user?.userId;
        const data = await this.cngStationsService.search(searchDto, userId);
        return response_utils_1.ResponseUtil.handleResponse(data, 'CNG stations retrieved successfully', common_1.HttpStatus.OK);
    }
    async findById(req, id, latitude, longitude) {
        const userId = req.user?.userId;
        const data = await this.cngStationsService.findById(id, userId, latitude ? Number(latitude) : undefined, longitude ? Number(longitude) : undefined);
        return response_utils_1.ResponseUtil.handleResponse(data, 'CNG station retrieved successfully', common_1.HttpStatus.OK);
    }
    async toggleFavorite(req, cngStationId) {
        const userId = validators_utils_1.Validators.validateUuid(req.user.userId);
        const data = await this.cngStationsService.toggleFavorite(userId, cngStationId);
        return response_utils_1.ResponseUtil.handleResponse(data, data.message, common_1.HttpStatus.OK);
    }
    async getRecentStations(req, page, limit) {
        const userId = validators_utils_1.Validators.validateUuid(req.user.userId);
        const data = await this.userCngStationService.getRecentStations(userId, {
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
        });
        return response_utils_1.ResponseUtil.handleResponse(data, 'Recent CNG stations retrieved successfully', common_1.HttpStatus.OK);
    }
    async removeFromRecent(req, cngStationId) {
        const userId = validators_utils_1.Validators.validateUuid(req.user.userId);
        const data = await this.userCngStationService.removeFromRecent(userId, cngStationId);
        return response_utils_1.ResponseUtil.handleResponse(data, data.message, common_1.HttpStatus.OK);
    }
    async getUserFavoriteStations(req, page, limit) {
        const userId = validators_utils_1.Validators.validateUuid(req.user.userId);
        const data = await this.userCngStationService.getUserFavoriteStations(userId, {
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
        });
        return response_utils_1.ResponseUtil.handleResponse(data, 'Favorite CNG stations retrieved successfully', common_1.HttpStatus.OK);
    }
    async startTrip(req, startTripDto) {
        const userId = validators_utils_1.Validators.validateUuid(req.user.userId);
        const data = await this.userCngStationService.startTrip(userId, startTripDto);
        return response_utils_1.ResponseUtil.handleResponse(data, 'Trip started successfully', common_1.HttpStatus.OK);
    }
    async endTrip(req, endTripDto) {
        const userId = validators_utils_1.Validators.validateUuid(req.user.userId);
        const data = await this.userCngStationService.endTrip(userId, endTripDto);
        return response_utils_1.ResponseUtil.handleResponse(data, 'Trip ended successfully', common_1.HttpStatus.OK);
    }
    async cancelTrip(req, cancelTripDto) {
        const userId = validators_utils_1.Validators.validateUuid(req.user.userId);
        await this.userCngStationService.cancelTrip(userId, cancelTripDto);
        return response_utils_1.ResponseUtil.handleResponse(null, 'Trip cancelled successfully', common_1.HttpStatus.OK);
    }
};
exports.CngStationsController = CngStationsController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(enums_1.UserType.PEPP_ADMIN, enums_1.UserType.SUPER_ADMIN, enums_1.UserType.USER, enums_1.UserType.DRIVER),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all CNG stations',
        description: 'Returns paginated list of CNG stations with optional filters',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'CNG stations retrieved successfully',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cng_station_dto_1.FindCngStationsQueryDto, Object]),
    __metadata("design:returntype", Promise)
], CngStationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, roles_decorator_1.Roles)(enums_1.UserType.PEPP_ADMIN, enums_1.UserType.SUPER_ADMIN, enums_1.UserType.USER, enums_1.UserType.DRIVER),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active CNG stations' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Active CNG stations retrieved successfully',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cng_station_dto_1.FindCngStationsQueryDto, Object]),
    __metadata("design:returntype", Promise)
], CngStationsController.prototype, "findActiveStations", null);
__decorate([
    (0, common_1.Get)('nearby'),
    (0, roles_decorator_1.Roles)(enums_1.UserType.PEPP_ADMIN, enums_1.UserType.SUPER_ADMIN, enums_1.UserType.USER, enums_1.UserType.DRIVER),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Find nearby CNG stations' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Nearby CNG stations retrieved successfully',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cng_station_dto_1.FindCngStationsDto, Object]),
    __metadata("design:returntype", Promise)
], CngStationsController.prototype, "findNearby", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, roles_decorator_1.Roles)(enums_1.UserType.PEPP_ADMIN, enums_1.UserType.SUPER_ADMIN, enums_1.UserType.USER, enums_1.UserType.DRIVER),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Search CNG stations',
        description: 'Search by name or address. If latitude and longitude are provided, results are ordered by distance (nearest first).',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'CNG stations retrieved successfully',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cng_station_dto_1.SearchCngStationsDto, Object]),
    __metadata("design:returntype", Promise)
], CngStationsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.UserType.PEPP_ADMIN, enums_1.UserType.SUPER_ADMIN, enums_1.UserType.USER, enums_1.UserType.DRIVER),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a CNG station by ID',
        description: 'Optionally provide latitude and longitude to calculate distance from user location',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'latitude',
        required: false,
        type: Number,
        description: 'User\'s current latitude for distance calculation',
        example: 6.5244,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'longitude',
        required: false,
        type: Number,
        description: 'User\'s current longitude for distance calculation',
        example: 3.3792,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'CNG station retrieved successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'CNG station not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Query)('latitude')),
    __param(3, (0, common_1.Query)('longitude')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number, Number]),
    __metadata("design:returntype", Promise)
], CngStationsController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)('/user/:cngStationId/favorite'),
    (0, roles_decorator_1.Roles)(enums_1.UserType.PEPP_ADMIN, enums_1.UserType.SUPER_ADMIN, enums_1.UserType.USER, enums_1.UserType.DRIVER),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Toggle favorite status' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Favorite status toggled successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'CNG station not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('cngStationId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CngStationsController.prototype, "toggleFavorite", null);
__decorate([
    (0, common_1.Get)('user/recents'),
    (0, roles_decorator_1.Roles)(enums_1.UserType.USER, enums_1.UserType.DRIVER),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get user recent CNG stations' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Recent CNG stations retrieved successfully',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], CngStationsController.prototype, "getRecentStations", null);
__decorate([
    (0, common_1.Delete)('user/recents/:cngStationId'),
    (0, roles_decorator_1.Roles)(enums_1.UserType.USER, enums_1.UserType.DRIVER),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Remove station from recent' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Station removed from recent successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Station not found in recent list' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('cngStationId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CngStationsController.prototype, "removeFromRecent", null);
__decorate([
    (0, common_1.Get)('user/favorites'),
    (0, roles_decorator_1.Roles)(enums_1.UserType.USER, enums_1.UserType.DRIVER),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get user favorite CNG stations' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Favorite CNG stations retrieved successfully',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], CngStationsController.prototype, "getUserFavoriteStations", null);
__decorate([
    (0, common_1.Post)('user/start-trip'),
    (0, roles_decorator_1.Roles)(enums_1.UserType.USER, enums_1.UserType.DRIVER),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Start a trip to a CNG station' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Trip started successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'CNG station not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cng_station_dto_1.StartCngTripDto]),
    __metadata("design:returntype", Promise)
], CngStationsController.prototype, "startTrip", null);
__decorate([
    (0, common_1.Put)('user/end-trip'),
    (0, roles_decorator_1.Roles)(enums_1.UserType.USER, enums_1.UserType.DRIVER),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'End a trip to a CNG station' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Trip ended successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Trip record not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cng_station_dto_1.EndCngTripDto]),
    __metadata("design:returntype", Promise)
], CngStationsController.prototype, "endTrip", null);
__decorate([
    (0, common_1.Put)('user/cancel-trip'),
    (0, roles_decorator_1.Roles)(enums_1.UserType.USER, enums_1.UserType.DRIVER),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel a trip to a CNG station' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Trip cancelled successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Trip record not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cng_station_dto_1.CancelCngTripDto]),
    __metadata("design:returntype", Promise)
], CngStationsController.prototype, "cancelTrip", null);
exports.CngStationsController = CngStationsController = __decorate([
    (0, swagger_1.ApiTags)('CNG Stations'),
    (0, common_1.Controller)('cng-stations'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [cng_stations_service_1.CngStationsService,
        user_cng_station_service_1.UserCngStationService])
], CngStationsController);
//# sourceMappingURL=cng-stations.controller.js.map