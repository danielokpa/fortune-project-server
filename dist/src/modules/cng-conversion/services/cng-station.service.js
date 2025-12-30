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
var CngStationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CngStationService = void 0;
const common_1 = require("@nestjs/common");
const cng_station_repository_1 = require("../repositories/cng-station.repository");
let CngStationService = CngStationService_1 = class CngStationService {
    cngStationRepository;
    logger = new common_1.Logger(CngStationService_1.name);
    constructor(cngStationRepository) {
        this.cngStationRepository = cngStationRepository;
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
                    order: [['rating', 'DESC'], ['reviews', 'DESC'], ['createdAt', 'DESC']],
                }, userId),
                this.cngStationRepository.count({ where }),
            ]);
            const stationsWithImages = stations.map((station) => {
                const stationData = station.toJSON ? station.toJSON() : station;
                return {
                    ...stationData,
                    stationImage: stationData.stationImage || 'https://www.peppcruise.com/images/about/',
                };
            });
            return {
                stations: stationsWithImages,
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
            const stationsWithImages = stations.map((station) => {
                const stationData = station.toJSON ? station.toJSON() : station;
                return {
                    ...stationData,
                    stationImage: stationData.stationImage || 'https://www.peppcruise.com/images/about/',
                };
            });
            return {
                stations: stationsWithImages,
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
    async findById(id, userId) {
        const station = await this.cngStationRepository.findById(id, userId);
        if (!station) {
            throw new common_1.NotFoundException(`CNG station with ID ${id} not found`);
        }
        const stationData = station.toJSON ? station.toJSON() : station;
        return {
            ...stationData,
            stationImage: stationData.stationImage || 'https://www.peppcruise.com/images/about/',
        };
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
            const stationsWithImages = stations.map((station) => {
                const stationData = station.toJSON ? station.toJSON() : station;
                return {
                    ...stationData,
                    stationImage: stationData.stationImage || 'https://www.peppcruise.com/images/about/',
                };
            });
            return {
                stations: stationsWithImages,
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
};
exports.CngStationService = CngStationService;
exports.CngStationService = CngStationService = CngStationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cng_station_repository_1.CngStationRepository])
], CngStationService);
//# sourceMappingURL=cng-station.service.js.map