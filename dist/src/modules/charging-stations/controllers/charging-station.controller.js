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
exports.ChargingStationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const charging_station_service_1 = require("../services/charging-station.service");
const user_charging_station_service_1 = require("../services/user-charging-station.service");
const charging_station_dto_1 = require("../dto/charging-station.dto");
const response_utils_1 = require("../../../utils/response.utils");
const validators_utils_1 = require("../../../utils/validators.utils");
const enums_1 = require("../../../enums");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const auth_guard_1 = require("../../auth/guards/auth.guard");
let ChargingStationController = class ChargingStationController {
    chargingStationService;
    userChargingStationService;
    constructor(chargingStationService, userChargingStationService) {
        this.chargingStationService = chargingStationService;
        this.userChargingStationService = userChargingStationService;
    }
    async create(createDto) {
        const data = await this.chargingStationService.create(createDto);
        return response_utils_1.ResponseUtil.handleResponse(data, 'Charging station created successfully', common_1.HttpStatus.CREATED);
    }
    async findAll(findDto, req) {
        const userId = req.user?.userId;
        const data = await this.chargingStationService.findAll(findDto, userId);
        return response_utils_1.ResponseUtil.handleResponse(data, 'Charging stations retrieved successfully', common_1.HttpStatus.OK);
    }
    async findNearby(findNearbyDto, req) {
        const userId = req.user?.userId;
        const data = await this.chargingStationService.findNearbyStations({
            latitude: findNearbyDto.latitude,
            longitude: findNearbyDto.longitude,
            radiusKm: findNearbyDto.radiusKm,
            page: findNearbyDto.page,
            limit: findNearbyDto.limit,
            userId,
        });
        return response_utils_1.ResponseUtil.handleResponse(data, 'Nearby charging stations retrieved successfully', common_1.HttpStatus.OK);
    }
    async search(searchDto, req) {
        const userId = req.user?.userId;
        const data = await this.chargingStationService.search(searchDto, userId);
        return response_utils_1.ResponseUtil.handleResponse(data, 'Charging stations retrieved successfully', common_1.HttpStatus.OK);
    }
    async findById(req, id, latitude, longitude) {
        const userId = req.user?.userId;
        const data = await this.chargingStationService.findById(id, userId, latitude ? Number(latitude) : undefined, longitude ? Number(longitude) : undefined);
        return response_utils_1.ResponseUtil.handleResponse(data, 'Charging station retrieved successfully', common_1.HttpStatus.OK);
    }
    async startTrip(req, startTripDto) {
        const userId = validators_utils_1.Validators.validateUuid(req.user.userId);
        const data = await this.userChargingStationService.startTrip(userId, startTripDto);
        return response_utils_1.ResponseUtil.handleResponse(data, 'Trip started successfully', common_1.HttpStatus.OK);
    }
    async endTrip(req, endTripDto) {
        const userId = validators_utils_1.Validators.validateUuid(req.user.userId);
        const data = await this.userChargingStationService.endTrip(userId, endTripDto);
        return response_utils_1.ResponseUtil.handleResponse(data, 'Trip ended successfully', common_1.HttpStatus.OK);
    }
    async cancelTrip(req, cancelTripDto) {
        const userId = validators_utils_1.Validators.validateUuid(req.user.userId);
        const data = await this.userChargingStationService.cancelTrip(userId, cancelTripDto);
        return response_utils_1.ResponseUtil.handleResponse(data, 'Trip cancelled successfully', common_1.HttpStatus.OK);
    }
    async getRecentStations(req, page, limit) {
        const userId = validators_utils_1.Validators.validateUuid(req.user.userId);
        const data = await this.userChargingStationService.getRecentStations(userId, {
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
        });
        return response_utils_1.ResponseUtil.handleResponse(data, 'Recent charging stations retrieved successfully', common_1.HttpStatus.OK);
    }
    async removeFromRecent(req, chargingStationId) {
        const userId = validators_utils_1.Validators.validateUuid(req.user.userId);
        const data = await this.userChargingStationService.removeFromRecent(userId, chargingStationId);
        return response_utils_1.ResponseUtil.handleResponse(data, data.message, common_1.HttpStatus.OK);
    }
    async getUserFavoriteStations(req, page, limit) {
        const userId = validators_utils_1.Validators.validateUuid(req.user.userId);
        console.log(userId);
        const data = await this.userChargingStationService.getUserFavoriteStations(userId, {
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
        });
        return response_utils_1.ResponseUtil.handleResponse(data, 'Favorite charging stations retrieved successfully', common_1.HttpStatus.OK);
    }
    async toggleFavorite(req, chargingStationId) {
        const userId = validators_utils_1.Validators.validateUuid(req.user.userId);
        const data = await this.chargingStationService.toggleFavorite(userId, chargingStationId);
        return response_utils_1.ResponseUtil.handleResponse(data, data.message, common_1.HttpStatus.OK);
    }
};
exports.ChargingStationController = ChargingStationController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(enums_1.UserType.PEPP_ADMIN, enums_1.UserType.SUPER_ADMIN),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new charging station' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Charging station created successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [charging_station_dto_1.CreateChargingStationDto]),
    __metadata("design:returntype", Promise)
], ChargingStationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(enums_1.UserType.PEPP_ADMIN, enums_1.UserType.SUPER_ADMIN, enums_1.UserType.USER, enums_1.UserType.DRIVER),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all charging stations',
        description: 'If latitude and longitude are provided, returns nearby stations within the specified radius. Otherwise, returns filtered stations.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Charging stations retrieved successfully',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [charging_station_dto_1.FindChargingStationsDto, Object]),
    __metadata("design:returntype", Promise)
], ChargingStationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('nearby'),
    (0, roles_decorator_1.Roles)(enums_1.UserType.PEPP_ADMIN, enums_1.UserType.SUPER_ADMIN, enums_1.UserType.USER, enums_1.UserType.DRIVER),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Find nearby charging stations' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Nearby charging stations retrieved successfully',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [charging_station_dto_1.FindNearbyStationsDto, Object]),
    __metadata("design:returntype", Promise)
], ChargingStationController.prototype, "findNearby", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, roles_decorator_1.Roles)(enums_1.UserType.PEPP_ADMIN, enums_1.UserType.SUPER_ADMIN, enums_1.UserType.USER, enums_1.UserType.DRIVER),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Search charging stations',
        description: 'Search by name or address. If latitude and longitude are provided, results are ordered by distance (nearest first).',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Charging stations retrieved successfully',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [charging_station_dto_1.SearchChargingStationsDto, Object]),
    __metadata("design:returntype", Promise)
], ChargingStationController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.UserType.PEPP_ADMIN, enums_1.UserType.SUPER_ADMIN, enums_1.UserType.USER, enums_1.UserType.DRIVER),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a charging station by ID',
        description: 'Returns station details with optional linked virtual account (accountName, bankName, accountNumber) when a row exists in virtual_accounts for this station id (userId = station id), so users can fund purchases via bank transfer. If latitude and longitude are provided, distance (km) is included.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Charging station retrieved successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Charging station not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Query)('latitude')),
    __param(3, (0, common_1.Query)('longitude')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number, Number]),
    __metadata("design:returntype", Promise)
], ChargingStationController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)('user/start-trip'),
    (0, roles_decorator_1.Roles)(enums_1.UserType.USER, enums_1.UserType.DRIVER),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Start a trip to a charging station' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Trip started successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Charging station not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, charging_station_dto_1.StartTripDto]),
    __metadata("design:returntype", Promise)
], ChargingStationController.prototype, "startTrip", null);
__decorate([
    (0, common_1.Put)('user/end-trip'),
    (0, roles_decorator_1.Roles)(enums_1.UserType.USER, enums_1.UserType.DRIVER),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'End a trip to a charging station' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Trip ended successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Trip record not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, charging_station_dto_1.EndTripDto]),
    __metadata("design:returntype", Promise)
], ChargingStationController.prototype, "endTrip", null);
__decorate([
    (0, common_1.Put)('user/cancel-trip'),
    (0, roles_decorator_1.Roles)(enums_1.UserType.USER, enums_1.UserType.DRIVER),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel a trip to a charging station' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Trip cancelled successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Trip record not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, charging_station_dto_1.CancelTripDto]),
    __metadata("design:returntype", Promise)
], ChargingStationController.prototype, "cancelTrip", null);
__decorate([
    (0, common_1.Get)('user/recents'),
    (0, roles_decorator_1.Roles)(enums_1.UserType.USER, enums_1.UserType.DRIVER),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get user recent charging stations' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Recent charging stations retrieved successfully',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], ChargingStationController.prototype, "getRecentStations", null);
__decorate([
    (0, common_1.Delete)('user/recents/:chargingStationId'),
    (0, roles_decorator_1.Roles)(enums_1.UserType.USER, enums_1.UserType.DRIVER),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Remove station from recent' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Station removed from recent successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Station not found in recent list' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('chargingStationId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ChargingStationController.prototype, "removeFromRecent", null);
__decorate([
    (0, common_1.Get)('user/favorites'),
    (0, roles_decorator_1.Roles)(enums_1.UserType.USER, enums_1.UserType.DRIVER),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get user favorite charging stations' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Favorite charging stations retrieved successfully',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], ChargingStationController.prototype, "getUserFavoriteStations", null);
__decorate([
    (0, common_1.Put)('user/:chargingStationId/favorite'),
    (0, roles_decorator_1.Roles)(enums_1.UserType.PEPP_ADMIN, enums_1.UserType.SUPER_ADMIN, enums_1.UserType.USER, enums_1.UserType.DRIVER),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Toggle favorite status' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Favorite status toggled successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Charging station not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('chargingStationId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ChargingStationController.prototype, "toggleFavorite", null);
exports.ChargingStationController = ChargingStationController = __decorate([
    (0, swagger_1.ApiTags)('Charging Stations'),
    (0, common_1.Controller)('charging-stations'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [charging_station_service_1.ChargingStationService,
        user_charging_station_service_1.UserChargingStationService])
], ChargingStationController);
//# sourceMappingURL=charging-station.controller.js.map