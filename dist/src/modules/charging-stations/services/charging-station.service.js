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
var ChargingStationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChargingStationService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const charging_station_favorite_entity_1 = require("../entities/charging-station-favorite.entity");
const charging_station_repository_1 = require("../repositories/charging-station.repository");
const user_entity_1 = require("../../users/entities/user.entity");
const driver_entity_1 = require("../../drivers/entities/driver.entity");
let ChargingStationService = ChargingStationService_1 = class ChargingStationService {
    chargingStationRepository;
    chargingStationFavoriteModel;
    userModel;
    driverModel;
    logger = new common_1.Logger(ChargingStationService_1.name);
    DEFAULT_IMAGE_URL = 'https://www.peppcruise.com/images/about/';
    constructor(chargingStationRepository, chargingStationFavoriteModel, userModel, driverModel) {
        this.chargingStationRepository = chargingStationRepository;
        this.chargingStationFavoriteModel = chargingStationFavoriteModel;
        this.userModel = userModel;
        this.driverModel = driverModel;
    }
    addDefaultImage(station) {
        const withJson = station;
        const stationData = typeof withJson.toJSON === 'function'
            ? withJson.toJSON()
            : { ...station };
        const raw = stationData.stationImage ?? 'default.png';
        return {
            ...stationData,
            stationImage: this.DEFAULT_IMAGE_URL + raw,
        };
    }
    addDefaultImages(stations) {
        return stations.map((station) => this.addDefaultImage(station));
    }
    async create(createDto) {
        try {
            const slugTaken = await this.chargingStationRepository.findByStationSlug(createDto.stationSlug);
            if (slugTaken) {
                throw new common_1.ConflictException(`Station slug "${createDto.stationSlug}" is already in use`);
            }
            const station = await this.chargingStationRepository.create({
                name: createDto.name,
                stationSlug: createDto.stationSlug,
                country: createDto.country,
                state: createDto.state,
                address: createDto.address,
                contactPhone: createDto.contactPhone,
                contactEmail: createDto.contactEmail,
                openingTime: createDto.openingTime,
                closingTime: createDto.closingTime,
                amountPerUnit: createDto.amountPerUnit,
                currency: createDto.currency || 'NGN',
                amountPerUnitType: createDto.amountPerUnitType || 'kwh',
                latitude: createDto.latitude,
                longitude: createDto.longitude,
                isActive: createDto.isActive !== undefined ? createDto.isActive : true,
            });
            this.logger.log(`Charging station created: ${station.id}`);
            return this.addDefaultImage(station);
        }
        catch (error) {
            this.logger.error(`Error creating charging station: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to create charging station: ${error.message}`);
        }
    }
    async findAll(findDto, userId) {
        try {
            if (findDto.latitude && findDto.longitude) {
                return await this.findNearbyStations({
                    latitude: findDto.latitude,
                    longitude: findDto.longitude,
                    radiusKm: findDto.radiusKm || 10,
                    country: findDto.country,
                    state: findDto.state,
                    isActive: findDto.isActive,
                    page: findDto.page,
                    limit: findDto.limit,
                    userId,
                });
            }
            const page = findDto.page || 1;
            const limit = findDto.limit || 10;
            const offset = (page - 1) * limit;
            const where = {};
            if (findDto.country)
                where.country = findDto.country;
            if (findDto.state)
                where.state = findDto.state;
            if (findDto.isActive !== undefined)
                where.isActive = findDto.isActive;
            const [stations, total] = await Promise.all([
                this.chargingStationRepository.findAll({
                    where,
                    limit,
                    offset,
                    order: [['createdAt', 'DESC']],
                }, userId),
                this.chargingStationRepository.count({ where }),
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
            this.logger.error(`Error fetching charging stations: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to fetch charging stations: ${error.message}`);
        }
    }
    async findActiveStations(options, userId) {
        try {
            const page = options?.page || 1;
            const limit = options?.limit || 10;
            const offset = (page - 1) * limit;
            const [stations, total] = await Promise.all([
                this.chargingStationRepository.findActiveStations({
                    limit,
                    offset,
                    country: options?.country,
                    state: options?.state,
                }, userId),
                this.chargingStationRepository.count({
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
            this.logger.error(`Error fetching active charging stations: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to fetch active charging stations: ${error.message}`);
        }
    }
    async findNearbyStations(findNearbyDto) {
        try {
            const { latitude, longitude, radiusKm = 10, page = 1, limit = 20, country, state, isActive, userId, } = findNearbyDto;
            if (!latitude || !longitude) {
                throw new common_1.BadRequestException('Latitude and longitude are required for nearby search');
            }
            const offset = (page - 1) * limit;
            const { stations, total } = await this.chargingStationRepository.findNearbyStations(latitude, longitude, radiusKm, {
                limit,
                offset,
                country,
                state,
                isActive,
                userId,
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
            this.logger.error(`Error finding nearby charging stations: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to find nearby charging stations: ${error.message}`);
        }
    }
    async findById(id, userId, latitude, longitude) {
        try {
            const station = await this.chargingStationRepository.findById(id, userId, latitude, longitude);
            if (!station) {
                throw new common_1.NotFoundException(`Charging station with ID ${id} not found`);
            }
            return this.addDefaultImage(station);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            this.logger.error(`Error fetching charging station by ID: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to fetch charging station: ${error.message}`);
        }
    }
    async update(id, updateDto) {
        try {
            await this.findById(id);
            if (updateDto.stationSlug) {
                const existing = await this.chargingStationRepository.findByStationSlug(updateDto.stationSlug);
                if (existing && existing.id !== id) {
                    throw new common_1.ConflictException(`stationSlug "${updateDto.stationSlug}" is already in use`);
                }
            }
            const [affectedCount, updatedStations] = await this.chargingStationRepository.update(id, updateDto);
            if (affectedCount === 0) {
                throw new common_1.NotFoundException(`Charging station with ID ${id} not found`);
            }
            this.logger.log(`Charging station updated: ${id}`);
            return this.addDefaultImage(updatedStations[0]);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            this.logger.error(`Error updating charging station: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to update charging station: ${error.message}`);
        }
    }
    async delete(id) {
        try {
            await this.findById(id);
            const deletedCount = await this.chargingStationRepository.delete(id);
            if (deletedCount === 0) {
                throw new common_1.NotFoundException(`Charging station with ID ${id} not found`);
            }
            this.logger.log(`Charging station deleted: ${id}`);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            this.logger.error(`Error deleting charging station: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to delete charging station: ${error.message}`);
        }
    }
    async search(searchDto, userId) {
        try {
            const limit = searchDto.limit || 20;
            const offset = searchDto.offset || 0;
            const { stations, total } = await this.chargingStationRepository.search(searchDto.query, {
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
            this.logger.error(`Error searching charging stations: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to search charging stations: ${error.message}`);
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
            const station = await this.chargingStationRepository.findById(stationId);
            if (!station) {
                throw new common_1.NotFoundException(`Charging station with ID ${stationId} not found`);
            }
            const existingFavorite = await this.chargingStationFavoriteModel.findOne({
                where: {
                    stationId,
                    userId,
                },
            });
            if (existingFavorite) {
                await existingFavorite.destroy();
                this.logger.log(`Favorite removed: User ${userId} unfavorited station ${stationId}`);
                return {
                    isFavorite: false,
                    message: 'Station removed from favorites',
                };
            }
            else {
                await this.chargingStationFavoriteModel.create({
                    stationId,
                    userId,
                });
                this.logger.log(`Favorite added: User ${userId} favorited station ${stationId}`);
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
            this.logger.error(`Error toggling favorite: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to toggle favorite: ${error.message}`);
        }
    }
};
exports.ChargingStationService = ChargingStationService;
exports.ChargingStationService = ChargingStationService = ChargingStationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, sequelize_1.InjectModel)(charging_station_favorite_entity_1.ChargingStationFavorite)),
    __param(2, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __param(3, (0, sequelize_1.InjectModel)(driver_entity_1.Driver)),
    __metadata("design:paramtypes", [charging_station_repository_1.ChargingStationRepository, Object, Object, Object])
], ChargingStationService);
//# sourceMappingURL=charging-station.service.js.map