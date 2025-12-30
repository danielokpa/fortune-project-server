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
var UserChargingStationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserChargingStationService = void 0;
const common_1 = require("@nestjs/common");
const user_charging_station_repository_1 = require("../repositories/user-charging-station.repository");
const charging_station_repository_1 = require("../repositories/charging-station.repository");
const self_trip_status_enum_1 = require("../../../enums/self-trip-status.enum");
let UserChargingStationService = UserChargingStationService_1 = class UserChargingStationService {
    userChargingStationRepository;
    chargingStationRepository;
    logger = new common_1.Logger(UserChargingStationService_1.name);
    constructor(userChargingStationRepository, chargingStationRepository) {
        this.userChargingStationRepository = userChargingStationRepository;
        this.chargingStationRepository = chargingStationRepository;
    }
    async addUserChargingStation(userId, addDto) {
        try {
            const station = await this.chargingStationRepository.findById(addDto.chargingStationId);
            if (!station) {
                throw new common_1.NotFoundException(`Charging station with ID ${addDto.chargingStationId} not found`);
            }
            const existing = await this.userChargingStationRepository.findByUserIdAndStationId(userId, addDto.chargingStationId);
            if (existing) {
                throw new common_1.ConflictException('Charging station already added to user list');
            }
            let distance;
            if (addDto.latitude &&
                addDto.longitude &&
                station.latitude &&
                station.longitude) {
                distance = this.calculateDistance(addDto.latitude, addDto.longitude, station.latitude, station.longitude);
            }
            const userStation = await this.userChargingStationRepository.create({
                userId,
                chargingStationId: addDto.chargingStationId,
                latitude: addDto.latitude,
                longitude: addDto.longitude,
                distance,
            });
            this.logger.log(`Charging station ${addDto.chargingStationId} added to user ${userId}`);
            return userStation;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.ConflictException) {
                throw error;
            }
            this.logger.error(`Error adding user charging station: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to add charging station: ${error.message}`);
        }
    }
    async getUserChargingStations(userId, options) {
        try {
            const page = options?.page || 1;
            const limit = options?.limit || 10;
            const offset = (page - 1) * limit;
            const where = { userId };
            if (options?.isFavorite !== undefined) {
                where.isFavorite = options.isFavorite;
            }
            const [stations, total] = await Promise.all([
                this.userChargingStationRepository.findByUserId(userId, {
                    limit,
                    offset,
                    isFavorite: options?.isFavorite,
                }),
                this.userChargingStationRepository.count({ where }),
            ]);
            return {
                stations,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        }
        catch (error) {
            this.logger.error(`Error fetching user charging stations: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to fetch user charging stations: ${error.message}`);
        }
    }
    async getUserFavoriteStations(userId, options) {
        try {
            const page = options?.page || 1;
            const limit = options?.limit || 10;
            const offset = (page - 1) * limit;
            const [stations, activeTripRecord] = await Promise.all([
                this.userChargingStationRepository.findFavoritesByUserId(userId, {
                    limit,
                    offset,
                }),
                this.userChargingStationRepository.findActiveTripByUserId(userId),
            ]);
            const total = await this.userChargingStationRepository.countFavoritesByUserId(userId);
            let activeTrip = null;
            if (activeTripRecord) {
                const tripData = activeTripRecord.get
                    ? activeTripRecord.get({ plain: true })
                    : (activeTripRecord.toJSON ? activeTripRecord.toJSON() : activeTripRecord);
                const station = tripData.chargingStation;
                const tripStatus = activeTripRecord.selfTripStatus
                    ? String(activeTripRecord.selfTripStatus)
                    : String(tripData.selfTripStatus || '');
                const recordId = activeTripRecord.id || tripData.id;
                if (station && recordId) {
                    activeTrip = {
                        id: String(recordId),
                        name: String(station.name || ''),
                        address: String(station.address || ''),
                        status: tripStatus,
                    };
                }
            }
            return {
                stations,
                activeTrip,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        }
        catch (error) {
            this.logger.error(`Error fetching user favorite stations: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to fetch favorite stations: ${error.message}`);
        }
    }
    async updateUserChargingStation(userId, chargingStationId, updateDto) {
        try {
            const userStation = await this.userChargingStationRepository.findByUserIdAndStationId(userId, chargingStationId);
            if (!userStation) {
                throw new common_1.NotFoundException('Charging station not found in user list');
            }
            let distance = userStation.distance;
            if (updateDto.latitude &&
                updateDto.longitude &&
                userStation.chargingStation?.latitude &&
                userStation.chargingStation?.longitude) {
                distance = this.calculateDistance(updateDto.latitude, updateDto.longitude, userStation.chargingStation.latitude, userStation.chargingStation.longitude);
            }
            const [affectedCount, updatedStations] = await this.userChargingStationRepository.updateByUserIdAndStationId(userId, chargingStationId, {
                ...updateDto,
                distance,
            });
            if (affectedCount === 0) {
                throw new common_1.NotFoundException('Charging station not found in user list');
            }
            this.logger.log(`User charging station updated: ${userId} - ${chargingStationId}`);
            return updatedStations[0];
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            this.logger.error(`Error updating user charging station: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to update user charging station: ${error.message}`);
        }
    }
    async removeUserChargingStation(userId, chargingStationId) {
        try {
            const deletedCount = await this.userChargingStationRepository.deleteByUserIdAndStationId(userId, chargingStationId);
            if (deletedCount === 0) {
                throw new common_1.NotFoundException('Charging station not found in user list');
            }
            this.logger.log(`Charging station ${chargingStationId} removed from user ${userId}`);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            this.logger.error(`Error removing user charging station: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to remove charging station: ${error.message}`);
        }
    }
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = this.toRad(lat2 - lat1);
        const dLon = this.toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRad(lat1)) *
                Math.cos(this.toRad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round((R * c) * 100) / 100;
    }
    toRad(degrees) {
        return (degrees * Math.PI) / 180;
    }
    async getRecentStations(userId, options) {
        try {
            const page = options?.page || 1;
            const limit = options?.limit || 10;
            const offset = (page - 1) * limit;
            const [stations, total, activeTripRecord] = await Promise.all([
                this.userChargingStationRepository.findRecentByUserId(userId, {
                    limit,
                    offset,
                }),
                this.userChargingStationRepository.count({ where: { userId } }),
                this.userChargingStationRepository.findActiveTripByUserId(userId),
            ]);
            let activeTrip = null;
            if (activeTripRecord) {
                const tripData = activeTripRecord.get
                    ? activeTripRecord.get({ plain: true })
                    : (activeTripRecord.toJSON ? activeTripRecord.toJSON() : activeTripRecord);
                const station = tripData.chargingStation;
                const tripStatus = activeTripRecord.selfTripStatus
                    ? String(activeTripRecord.selfTripStatus)
                    : String(tripData.selfTripStatus || '');
                const recordId = activeTripRecord.id || tripData.id;
                if (station && recordId) {
                    activeTrip = {
                        id: String(recordId),
                        name: String(station.name || ''),
                        address: String(station.address || ''),
                        status: tripStatus,
                    };
                }
            }
            return {
                stations,
                activeTrip,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        }
        catch (error) {
            this.logger.error(`Error fetching recent stations: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to fetch recent stations: ${error.message}`);
        }
    }
    async removeFromRecent(userId, chargingStationId) {
        try {
            const deleted = await this.userChargingStationRepository.deleteByUserIdAndStationId(userId, chargingStationId);
            if (deleted === 0) {
                throw new common_1.NotFoundException('Station not found in recent list');
            }
            this.logger.log(`Station ${chargingStationId} removed from recent for user ${userId}`);
            return { message: 'Station removed from recent successfully' };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            this.logger.error(`Error removing station from recent: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to remove station from recent: ${error.message}`);
        }
    }
    async startTrip(userId, startTripDto) {
        try {
            const station = await this.chargingStationRepository.findById(startTripDto.id);
            if (!station) {
                throw new common_1.NotFoundException(`Charging station with ID ${startTripDto.id} not found`);
            }
            const existingRecord = await this.userChargingStationRepository.findByUserIdSelfTripStatusAndStationId(userId, self_trip_status_enum_1.SelfTripStatus.START_TRIP, startTripDto.id);
            if (existingRecord) {
                throw new common_1.ConflictException('Trip already started for this station');
            }
            const userStation = await this.userChargingStationRepository.create({
                userId,
                chargingStationId: startTripDto.id,
                selfTripStatus: self_trip_status_enum_1.SelfTripStatus.START_TRIP,
                latitude: startTripDto.latitude,
                longitude: startTripDto.longitude,
                distance: this.calculateDistance(startTripDto.latitude || 0, startTripDto.longitude || 0, station.latitude || 0, station.longitude || 0),
            });
            return userStation;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            this.logger.error(`Error starting trip: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to start trip: ${error.message}`);
        }
    }
    async endTrip(userId, endTripDto) {
        try {
            const userStation = await this.userChargingStationRepository.findActiveTripByUserIdAndUserStationId(userId, endTripDto.id);
            if (!userStation) {
                throw new common_1.NotFoundException('Active trip not found. Please start a trip first.');
            }
            const [affectedCount, updatedRecords] = await this.userChargingStationRepository.updateByUserIdAndId(userId, endTripDto.id, {
                selfTripStatus: self_trip_status_enum_1.SelfTripStatus.END_TRIP,
            });
            if (affectedCount === 0) {
                throw new common_1.NotFoundException('Active trip not found');
            }
            this.logger.log(`Trip ended: User ${userId} ended trip to station ${endTripDto.id}`);
            return updatedRecords[0];
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            this.logger.error(`Error ending trip: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to end trip: ${error.message}`);
        }
    }
    async cancelTrip(userId, cancelTripDto) {
        try {
            const userStation = await this.userChargingStationRepository.findActiveTripByUserIdAndUserStationId(userId, cancelTripDto.id);
            if (!userStation) {
                throw new common_1.NotFoundException('No active trip found to cancel');
            }
            const [affectedCount, updatedRecords] = await this.userChargingStationRepository.updateByUserIdAndId(userId, cancelTripDto.id, {
                selfTripStatus: self_trip_status_enum_1.SelfTripStatus.CANCEL,
            });
            if (affectedCount === 0) {
                throw new common_1.NotFoundException('Active trip not found or could not be updated');
            }
            this.logger.log(`Trip cancelled: User ${userId} cancelled trip with record ID ${cancelTripDto.id}`);
            return updatedRecords[0];
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            this.logger.error(`Error cancelling trip: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to cancel trip: ${error.message}`);
        }
    }
};
exports.UserChargingStationService = UserChargingStationService;
exports.UserChargingStationService = UserChargingStationService = UserChargingStationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_charging_station_repository_1.UserChargingStationRepository,
        charging_station_repository_1.ChargingStationRepository])
], UserChargingStationService);
//# sourceMappingURL=user-charging-station.service.js.map