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
var CngStationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CngStationsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const cng_station_favorite_entity_1 = require("../entities/cng-station-favorite.entity");
const cng_station_repository_1 = require("../repositories/cng-station.repository");
const user_entity_1 = require("../../users/entities/user.entity");
const driver_entity_1 = require("../../drivers/entities/driver.entity");
let CngStationsService = CngStationsService_1 = class CngStationsService {
    cngStationRepository;
    cngStationFavoriteModel;
    userModel;
    driverModel;
    logger = new common_1.Logger(CngStationsService_1.name);
    DEFAULT_IMAGE_URL = 'https://www.peppcruise.com/images/about/';
    constructor(cngStationRepository, cngStationFavoriteModel, userModel, driverModel) {
        this.cngStationRepository = cngStationRepository;
        this.cngStationFavoriteModel = cngStationFavoriteModel;
        this.userModel = userModel;
        this.driverModel = driverModel;
    }
    addDefaultImage(station) {
        const stationData = station.toJSON ? station.toJSON() : station;
        return {
            ...stationData,
            stationImage: stationData.stationImage || this.DEFAULT_IMAGE_URL,
        };
    }
    addDefaultImages(stations) {
        return stations.map((station) => this.addDefaultImage(station));
    }
    async findAll(options, userId) {
        try {
            const page = options?.page || 1;
            const limit = options?.limit || 10;
            const offset = (page - 1) * limit;
            const where = {};
            if (options?.country)
                where.country = options.country;
            if (options?.state)
                where.state = options.state;
            if (options?.isActive !== undefined)
                where.isActive = options.isActive;
            const [stations, total] = await Promise.all([
                this.cngStationRepository.findAll({
                    where,
                    limit,
                    offset,
                    order: [['createdAt', 'DESC']],
                }, userId),
                this.cngStationRepository.count({ where }),
            ]);
            return {
                stations: this.addDefaultImages(stations),
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        }
        catch (error) {
            this.logger.error(`Error fetching CNG stations: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to fetch CNG stations: ${error.message}`);
        }
    }
    async findActiveStations(options, userId) {
        try {
            const page = options?.page || 1;
            const limit = options?.limit || 10;
            const offset = (page - 1) * limit;
            const [stations, total] = await Promise.all([
                this.cngStationRepository.findActiveStations({
                    ...options,
                    limit,
                    offset,
                }, userId),
                this.cngStationRepository.count({
                    where: {
                        isActive: true,
                        ...(options?.country && { country: options.country }),
                        ...(options?.state && { state: options.state }),
                    },
                }),
            ]);
            return {
                stations: this.addDefaultImages(stations),
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        }
        catch (error) {
            this.logger.error(`Error fetching active CNG stations: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to fetch active CNG stations: ${error.message}`);
        }
    }
    async findNearbyStations(findNearbyDto) {
        try {
            const page = findNearbyDto.page || 1;
            const limit = findNearbyDto.limit || 10;
            const offset = (page - 1) * limit;
            const radiusKm = findNearbyDto.radiusKm || 10;
            const { stations, total } = await this.cngStationRepository.findNearbyStations(findNearbyDto.latitude, findNearbyDto.longitude, radiusKm, {
                limit,
                offset,
                country: findNearbyDto.country,
                state: findNearbyDto.state,
                userId: findNearbyDto.userId,
            });
            return {
                stations: this.addDefaultImages(stations),
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        }
        catch (error) {
            this.logger.error(`Error finding nearby CNG stations: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to find nearby CNG stations: ${error.message}`);
        }
    }
    async findById(id, userId, latitude, longitude) {
        try {
            const station = await this.cngStationRepository.findById(id, userId, latitude, longitude);
            if (!station) {
                throw new common_1.NotFoundException(`CNG station with ID ${id} not found`);
            }
            return this.addDefaultImage(station);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            this.logger.error(`Error fetching CNG station by ID: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to fetch CNG station: ${error.message}`);
        }
    }
    async search(searchDto, userId) {
        try {
            const limit = searchDto.limit || 20;
            const offset = searchDto.offset || 0;
            const { stations, total } = await this.cngStationRepository.search(searchDto.query, {
                limit,
                offset,
                latitude: searchDto.latitude,
                longitude: searchDto.longitude,
                radiusKm: searchDto.radiusKm,
                userId,
            });
            return {
                stations,
                total,
                limit,
                offset,
                totalPages: Math.ceil(total / limit),
            };
        }
        catch (error) {
            this.logger.error(`Error searching CNG stations: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to search CNG stations: ${error.message}`);
        }
    }
    async toggleFavorite(userId, stationId) {
        try {
            const [user, driver] = await Promise.all([
                this.userModel.findByPk(userId),
                this.driverModel.findByPk(userId),
            ]);
            if (!user && !driver) {
                throw new common_1.NotFoundException(`User with ID ${userId} not found`);
            }
            const station = await this.cngStationRepository.findById(stationId);
            if (!station) {
                throw new common_1.NotFoundException(`CNG station with ID ${stationId} not found`);
            }
            const existingFavorite = await this.cngStationFavoriteModel.findOne({
                where: {
                    stationId,
                    userId,
                },
            });
            if (existingFavorite) {
                await existingFavorite.destroy();
                this.logger.log(`Favorite removed: User ${userId} unfavorited CNG station ${stationId}`);
                return {
                    isFavorite: false,
                    message: 'Station removed from favorites',
                };
            }
            else {
                await this.cngStationFavoriteModel.create({
                    stationId,
                    userId,
                });
                this.logger.log(`Favorite added: User ${userId} favorited CNG station ${stationId}`);
                return {
                    isFavorite: true,
                    message: 'Station added to favorites',
                };
            }
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            this.logger.error(`Error toggling CNG favorite: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to toggle favorite: ${error.message}`);
        }
    }
};
exports.CngStationsService = CngStationsService;
exports.CngStationsService = CngStationsService = CngStationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, sequelize_1.InjectModel)(cng_station_favorite_entity_1.CngStationFavorite)),
    __param(2, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __param(3, (0, sequelize_1.InjectModel)(driver_entity_1.Driver)),
    __metadata("design:paramtypes", [cng_station_repository_1.CngStationRepository, Object, Object, Object])
], CngStationsService);
//# sourceMappingURL=cng-stations.service.js.map