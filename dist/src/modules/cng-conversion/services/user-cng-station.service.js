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
var UserCngStationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCngStationService = void 0;
const common_1 = require("@nestjs/common");
const user_cng_station_repository_1 = require("../repositories/user-cng-station.repository");
const cng_station_repository_1 = require("../repositories/cng-station.repository");
const self_trip_status_enum_1 = require("../../../enums/self-trip-status.enum");
let UserCngStationService = UserCngStationService_1 = class UserCngStationService {
    userCngStationRepository;
    cngStationRepository;
    logger = new common_1.Logger(UserCngStationService_1.name);
    constructor(userCngStationRepository, cngStationRepository) {
        this.userCngStationRepository = userCngStationRepository;
        this.cngStationRepository = cngStationRepository;
    }
    async getRecentStations(userId, options) {
        try {
            const page = options?.page || 1;
            const limit = options?.limit || 10;
            const offset = (page - 1) * limit;
            const [stations, total, activeTripRecord] = await Promise.all([
                this.userCngStationRepository.findRecentByUserId(userId, {
                    limit,
                    offset,
                }),
                this.userCngStationRepository.count({ where: { userId } }),
                this.userCngStationRepository.findActiveTripByUserId(userId),
            ]);
            let activeTrip = null;
            if (activeTripRecord) {
                const tripData = activeTripRecord.get
                    ? activeTripRecord.get({ plain: true })
                    : (activeTripRecord.toJSON ? activeTripRecord.toJSON() : activeTripRecord);
                const station = tripData.cngStation;
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
            this.logger.error(`Error fetching recent CNG stations: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to fetch recent stations: ${error.message}`);
        }
    }
    async removeFromRecent(userId, cngStationId) {
        try {
            const deleted = await this.userCngStationRepository.deleteByUserIdAndStationId(userId, cngStationId);
            if (deleted === 0) {
                throw new common_1.NotFoundException('Station not found in recent list');
            }
            this.logger.log(`Station ${cngStationId} removed from recent for user ${userId}`);
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
    async getUserFavoriteStations(userId, options) {
        try {
            const page = options?.page || 1;
            const limit = options?.limit || 10;
            const offset = (page - 1) * limit;
            const [stations, activeTripRecord] = await Promise.all([
                this.userCngStationRepository.findFavoritesByUserId(userId, {
                    limit,
                    offset,
                }),
                this.userCngStationRepository.findActiveTripByUserId(userId),
            ]);
            const total = await this.userCngStationRepository.countFavoritesByUserId(userId);
            let activeTrip = null;
            if (activeTripRecord) {
                const tripData = activeTripRecord.get
                    ? activeTripRecord.get({ plain: true })
                    : (activeTripRecord.toJSON ? activeTripRecord.toJSON() : activeTripRecord);
                const station = tripData.cngStation;
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
            this.logger.error(`Error fetching user favorite CNG stations: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to fetch favorite stations: ${error.message}`);
        }
    }
    async startTrip(userId, startTripDto) {
        try {
            const station = await this.cngStationRepository.findById(startTripDto.id);
            if (!station) {
                throw new common_1.NotFoundException(`CNG station with ID ${startTripDto.id} not found`);
            }
            const existingRecord = await this.userCngStationRepository.findByUserIdSelfTripStatusAndStationId(userId, self_trip_status_enum_1.SelfTripStatus.START_TRIP, startTripDto.id);
            if (existingRecord) {
                throw new common_1.ConflictException('Trip already started for this station');
            }
            const userStation = await this.userCngStationRepository.create({
                userId,
                cngStationId: startTripDto.id,
                selfTripStatus: self_trip_status_enum_1.SelfTripStatus.START_TRIP,
                latitude: startTripDto.latitude,
                longitude: startTripDto.longitude,
                distance: this.calculateDistance(startTripDto.latitude || 0, startTripDto.longitude || 0, station.latitude || 0, station.longitude || 0),
            });
            return userStation;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.ConflictException) {
                throw error;
            }
            this.logger.error(`Error starting CNG trip: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to start trip: ${error.message}`);
        }
    }
    async endTrip(userId, endTripDto) {
        try {
            const userStation = await this.userCngStationRepository.findActiveTripByUserIdAndUserStationId(userId, endTripDto.id);
            if (!userStation) {
                throw new common_1.NotFoundException('Active trip not found. Please start a trip first.');
            }
            const [affectedCount, updatedRecords] = await this.userCngStationRepository.updateByUserIdAndId(userId, endTripDto.id, {
                selfTripStatus: self_trip_status_enum_1.SelfTripStatus.END_TRIP,
            });
            if (affectedCount === 0) {
                throw new common_1.NotFoundException('Active trip not found');
            }
            this.logger.log(`Trip ended: User ${userId} ended trip to CNG station ${endTripDto.id}`);
            return updatedRecords[0];
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            this.logger.error(`Error ending CNG trip: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to end trip: ${error.message}`);
        }
    }
    async cancelTrip(userId, cancelTripDto) {
        try {
            const userStation = await this.userCngStationRepository.findActiveTripByUserIdAndUserStationId(userId, cancelTripDto.id);
            if (!userStation) {
                throw new common_1.NotFoundException('No active trip found to cancel');
            }
            const [affectedCount] = await this.userCngStationRepository.updateByUserIdAndId(userId, cancelTripDto.id, {
                selfTripStatus: self_trip_status_enum_1.SelfTripStatus.CANCEL,
            });
            if (affectedCount === 0) {
                throw new common_1.NotFoundException('Active trip not found or could not be updated');
            }
            this.logger.log(`Trip cancelled: User ${userId} cancelled CNG trip with record ID ${cancelTripDto.id}`);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            this.logger.error(`Error cancelling CNG trip: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to cancel trip: ${error.message}`);
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
};
exports.UserCngStationService = UserCngStationService;
exports.UserCngStationService = UserCngStationService = UserCngStationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_cng_station_repository_1.UserCngStationRepository,
        cng_station_repository_1.CngStationRepository])
], UserCngStationService);
//# sourceMappingURL=user-cng-station.service.js.map