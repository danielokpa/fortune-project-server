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
exports.UserChargingStationRepository = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_charging_station_entity_1 = require("../entities/user-charging-station.entity");
const charging_station_favorite_entity_1 = require("../entities/charging-station-favorite.entity");
const charging_station_entity_1 = require("../entities/charging-station.entity");
const sequelize_2 = require("sequelize");
let UserChargingStationRepository = class UserChargingStationRepository {
    userChargingStationModel;
    chargingStationFavoriteModel;
    constructor(userChargingStationModel, chargingStationFavoriteModel) {
        this.userChargingStationModel = userChargingStationModel;
        this.chargingStationFavoriteModel = chargingStationFavoriteModel;
    }
    async count(options) {
        const count = await this.userChargingStationModel.count(options);
        return typeof count === 'number' ? count : count.length || 0;
    }
    async findById(id) {
        return await this.userChargingStationModel.findByPk(id, {
            include: ['chargingStation', 'user'],
        });
    }
    async findByUserIdAndStationId(userId, chargingStationId) {
        return await this.userChargingStationModel.findOne({
            where: {
                userId,
                chargingStationId,
            },
            include: ['chargingStation'],
        });
    }
    async findByUserIdSelfTripStatusAndStationId(userId, selfTripStatus, chargingStationId) {
        return await this.userChargingStationModel.findOne({
            where: {
                userId,
                chargingStationId,
                selfTripStatus,
            },
            include: ['chargingStation'],
        });
    }
    async findActiveTripByUserIdAndUserStationId(userId, id) {
        return await this.userChargingStationModel.findOne({
            where: {
                userId,
                id,
                selfTripStatus: {
                    [sequelize_2.Op.in]: ['START_TRIP', 'ONGOING_TRIP'],
                },
            },
            include: ['chargingStation'],
        });
    }
    async findActiveTripByUserId(userId) {
        return await this.userChargingStationModel.findOne({
            where: {
                userId,
                selfTripStatus: {
                    [sequelize_2.Op.in]: ['START_TRIP', 'ONGOING_TRIP'],
                },
            },
            attributes: ['id', 'selfTripStatus'],
            include: [
                {
                    model: charging_station_entity_1.ChargingStation,
                    as: 'chargingStation',
                    attributes: ['id', 'name', 'address'],
                },
            ],
            order: [['updatedAt', 'DESC']],
        });
    }
    async findAll(options) {
        return await this.userChargingStationModel.findAll(options || {});
    }
    async findByUserId(userId, options) {
        const where = { userId };
        if (options?.isFavorite !== undefined) {
            where.isFavorite = options.isFavorite;
        }
        return await this.userChargingStationModel.findAll({
            where,
            include: ['chargingStation'],
            limit: options?.limit,
            offset: options?.offset,
            order: [['createdAt', 'DESC']],
        });
    }
    async findRecentByUserId(userId, options) {
        const recentStations = await this.userChargingStationModel.findAll({
            where: { userId },
            include: [
                {
                    model: charging_station_entity_1.ChargingStation,
                    as: 'chargingStation',
                    attributes: ['id', 'name', 'address'],
                },
            ],
            limit: options?.limit,
            offset: options?.offset,
            order: [['createdAt', 'DESC']],
        });
        return recentStations
            .map((recent) => {
            const recentData = recent.get ? recent.get({ plain: true }) : (recent.toJSON ? recent.toJSON() : recent);
            const station = recentData.chargingStation;
            if (!station)
                return null;
            return {
                id: String(station.id || ''),
                name: String(station.name || ''),
                address: String(station.address || ''),
            };
        })
            .filter((item) => item !== null);
    }
    async findFavoritesByUserId(userId, options) {
        const favorites = await this.chargingStationFavoriteModel.findAll({
            where: { userId },
            include: [
                {
                    model: charging_station_entity_1.ChargingStation,
                    as: 'chargingStation',
                    attributes: ['id', 'name', 'address'],
                },
            ],
            limit: options?.limit,
            offset: options?.offset,
            order: [['createdAt', 'DESC']],
        });
        console.log(userId);
        return favorites
            .map((favorite) => {
            const favoriteData = favorite.get ? favorite.get({ plain: true }) : (favorite.toJSON ? favorite.toJSON() : favorite);
            const station = favoriteData.chargingStation;
            if (!station)
                return null;
            return {
                id: String(station.id || ''),
                name: String(station.name || ''),
                address: String(station.address || ''),
            };
        })
            .filter((item) => item !== null);
    }
    async countFavoritesByUserId(userId) {
        return await this.chargingStationFavoriteModel.count({
            where: { userId },
        });
    }
    async create(userChargingStationData) {
        const userStation = await this.userChargingStationModel.create(userChargingStationData, { raw: true, returning: true });
        return userStation.toJSON();
    }
    async update(id, userChargingStationData) {
        return await this.userChargingStationModel.update(userChargingStationData, {
            where: { id },
            returning: true,
        });
    }
    async updateByUserIdAndStationId(userId, chargingStationId, userChargingStationData) {
        return await this.userChargingStationModel.update(userChargingStationData, {
            where: {
                userId,
                chargingStationId,
            },
            returning: true,
        });
    }
    async updateByUserIdAndId(userId, id, userChargingStationData) {
        return await this.userChargingStationModel.update(userChargingStationData, {
            where: {
                userId,
                id,
                selfTripStatus: {
                    [sequelize_2.Op.in]: ['START_TRIP', 'ONGOING_TRIP'],
                },
            },
            returning: true,
        });
    }
    async delete(id) {
        return await this.userChargingStationModel.destroy({
            where: { id },
        });
    }
    async deleteByUserIdAndStationId(userId, chargingStationId) {
        return await this.userChargingStationModel.destroy({
            where: {
                userId,
                chargingStationId,
            },
        });
    }
};
exports.UserChargingStationRepository = UserChargingStationRepository;
exports.UserChargingStationRepository = UserChargingStationRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_charging_station_entity_1.UserChargingStation)),
    __param(1, (0, sequelize_1.InjectModel)(charging_station_favorite_entity_1.ChargingStationFavorite)),
    __metadata("design:paramtypes", [Object, Object])
], UserChargingStationRepository);
//# sourceMappingURL=user-charging-station.repository.js.map