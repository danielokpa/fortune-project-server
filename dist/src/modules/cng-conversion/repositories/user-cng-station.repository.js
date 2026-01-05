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
exports.UserCngStationRepository = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_cng_station_entity_1 = require("../entities/user-cng-station.entity");
const cng_station_favorite_entity_1 = require("../entities/cng-station-favorite.entity");
const cng_station_entity_1 = require("../entities/cng-station.entity");
const sequelize_2 = require("sequelize");
let UserCngStationRepository = class UserCngStationRepository {
    userCngStationModel;
    cngStationFavoriteModel;
    cngStationModel;
    constructor(userCngStationModel, cngStationFavoriteModel, cngStationModel) {
        this.userCngStationModel = userCngStationModel;
        this.cngStationFavoriteModel = cngStationFavoriteModel;
        this.cngStationModel = cngStationModel;
    }
    async count(options) {
        const count = await this.userCngStationModel.count(options);
        return typeof count === 'number' ? count : count.length || 0;
    }
    async findById(id) {
        return await this.userCngStationModel.findByPk(id, {
            include: ['cngStation', 'user'],
        });
    }
    async findByUserIdAndStationId(userId, cngStationId) {
        return await this.userCngStationModel.findOne({
            where: {
                userId,
                cngStationId,
            },
            include: ['cngStation'],
        });
    }
    async findByUserIdSelfTripStatusAndStationId(userId, selfTripStatus, cngStationId) {
        return await this.userCngStationModel.findOne({
            where: {
                userId,
                cngStationId,
                selfTripStatus,
            },
            include: ['cngStation'],
        });
    }
    async findActiveTripByUserIdAndUserStationId(userId, id) {
        return await this.userCngStationModel.findOne({
            where: {
                userId,
                id,
                selfTripStatus: {
                    [sequelize_2.Op.in]: ['START_TRIP', 'ONGOING_TRIP'],
                },
            },
            include: ['cngStation'],
        });
    }
    async findActiveTripByUserId(userId) {
        return await this.userCngStationModel.findOne({
            where: {
                userId,
                selfTripStatus: {
                    [sequelize_2.Op.in]: ['START_TRIP', 'ONGOING_TRIP'],
                },
            },
            attributes: ['id', 'selfTripStatus'],
            include: [
                {
                    model: cng_station_entity_1.CngStation,
                    as: 'cngStation',
                    attributes: ['id', 'name', 'address'],
                },
            ],
            order: [['updatedAt', 'DESC']],
        });
    }
    async findRecentByUserId(userId, options) {
        const recentStations = await this.userCngStationModel.findAll({
            where: { userId },
            include: [
                {
                    model: cng_station_entity_1.CngStation,
                    as: 'cngStation',
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
            const station = recentData.cngStation;
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
        const favorites = await this.cngStationFavoriteModel.findAll({
            where: { userId },
            include: [
                {
                    model: cng_station_entity_1.CngStation,
                    as: 'cngStation',
                    attributes: ['id', 'name', 'address'],
                },
            ],
            limit: options?.limit,
            offset: options?.offset,
            order: [['createdAt', 'DESC']],
        });
        return favorites
            .map((favorite) => {
            const favoriteData = favorite.get ? favorite.get({ plain: true }) : (favorite.toJSON ? favorite.toJSON() : favorite);
            const station = favoriteData.cngStation;
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
        return await this.cngStationFavoriteModel.count({
            where: { userId },
        });
    }
    async create(userCngStationData) {
        const userStation = await this.userCngStationModel.create(userCngStationData, { raw: true, returning: true });
        return userStation.toJSON();
    }
    async update(id, userCngStationData) {
        return await this.userCngStationModel.update(userCngStationData, {
            where: { id },
            returning: true,
        });
    }
    async updateByUserIdAndId(userId, id, userCngStationData) {
        return await this.userCngStationModel.update(userCngStationData, {
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
    async updateByUserIdAndStationId(userId, cngStationId, userCngStationData) {
        return await this.userCngStationModel.update(userCngStationData, {
            where: {
                userId,
                cngStationId,
            },
            returning: true,
        });
    }
    async deleteByUserIdAndStationId(userId, cngStationId) {
        return await this.userCngStationModel.destroy({
            where: {
                userId,
                cngStationId,
            },
        });
    }
};
exports.UserCngStationRepository = UserCngStationRepository;
exports.UserCngStationRepository = UserCngStationRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_cng_station_entity_1.UserCngStation)),
    __param(1, (0, sequelize_1.InjectModel)(cng_station_favorite_entity_1.CngStationFavorite)),
    __param(2, (0, sequelize_1.InjectModel)(cng_station_entity_1.CngStation)),
    __metadata("design:paramtypes", [Object, Object, Object])
], UserCngStationRepository);
//# sourceMappingURL=user-cng-station.repository.js.map