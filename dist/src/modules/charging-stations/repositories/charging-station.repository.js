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
exports.ChargingStationRepository = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const charging_station_entity_1 = require("../entities/charging-station.entity");
const charging_station_favorite_entity_1 = require("../entities/charging-station-favorite.entity");
const charging_station_rating_entity_1 = require("../entities/charging-station-rating.entity");
const charging_station_review_entity_1 = require("../entities/charging-station-review.entity");
const sequelize_2 = require("sequelize");
let ChargingStationRepository = class ChargingStationRepository {
    chargingStationModel;
    chargingStationFavoriteModel;
    chargingStationRatingModel;
    chargingStationReviewModel;
    constructor(chargingStationModel, chargingStationFavoriteModel, chargingStationRatingModel, chargingStationReviewModel) {
        this.chargingStationModel = chargingStationModel;
        this.chargingStationFavoriteModel = chargingStationFavoriteModel;
        this.chargingStationRatingModel = chargingStationRatingModel;
        this.chargingStationReviewModel = chargingStationReviewModel;
    }
    async count(options) {
        const count = await this.chargingStationModel.count(options);
        return typeof count === 'number' ? count : count.length || 0;
    }
    async findByIdWithVirtualAccountRaw(id) {
        const sequelize = this.chargingStationModel.sequelize;
        if (!sequelize) {
            throw new Error('Sequelize instance not available');
        }
        console.log("fetching virtual account for station", id);
        const sql = `
      SELECT
        cs.\`id\`,
        cs.\`name\`,
        cs.\`state\`,
        cs.\`country\`,
        cs.\`address\`,
        cs.\`contactPhone\`,
        cs.\`openingTime\`,
        cs.\`closingTime\`,
        cs.\`amountPerUnit\`,
        cs.\`currency\`,
        cs.\`amountPerUnitType\`,
        cs.\`contactEmail\`,
        cs.\`isActive\`,
        cs.\`longitude\`,
        cs.\`latitude\`,
        cs.\`stationImage\`,
        cs.\`createdAt\`,
        cs.\`updatedAt\`,
        va.\`accountName\` AS va_accountName,
        va.\`bankName\` AS va_bankName,
        va.\`accountNumber\` AS va_accountNumber
      FROM \`charging_stations\` AS cs
      LEFT JOIN \`virtual_accounts\` AS va ON va.\`userId\` = cs.\`id\`
      WHERE cs.\`id\` = :id AND cs.\`deletedAt\` IS NULL
      LIMIT 1
    `;
        const rows = await sequelize.query(sql, {
            replacements: { id },
            type: sequelize_2.QueryTypes.SELECT,
        });
        const row = rows[0];
        if (!row) {
            return null;
        }
        const vaAccountNumber = row.va_accountNumber;
        console.log('vaAccountNumber', vaAccountNumber);
        const virtualAccount = vaAccountNumber != null && String(vaAccountNumber).length > 0
            ? {
                accountName: String(row.va_accountName ?? ''),
                bankName: String(row.va_bankName ?? ''),
                accountNumber: String(vaAccountNumber),
            }
            : null;
        const { va_accountName: _a, va_bankName: _b, va_accountNumber: _c, ...centerFields } = row;
        return {
            ...centerFields,
            virtualAccount,
        };
    }
    async findById(id, userId, latitude, longitude) {
        const base = await this.findByIdWithVirtualAccountRaw(id);
        if (!base)
            return null;
        let distance;
        if (latitude !== undefined && longitude !== undefined) {
            const sequelize = this.chargingStationModel.sequelize;
            if (!sequelize) {
                throw new Error('Sequelize instance not available');
            }
            const userPoint = `POINT(${longitude} ${latitude})`;
            const distRows = await sequelize.query(`
        SELECT (ST_Distance_Sphere(
          ST_GeomFromText(CONCAT('POINT(', cs.longitude, ' ', cs.latitude, ')'), 4326),
          ST_GeomFromText(:userPoint, 4326)
        ) / 1000) AS distance
        FROM \`charging_stations\` AS cs
        WHERE cs.\`id\` = :id AND cs.\`deletedAt\` IS NULL
        LIMIT 1
      `, {
                replacements: { id, userPoint },
                type: sequelize_2.QueryTypes.SELECT,
            });
            const d = distRows[0]?.distance;
            if (d !== undefined && d !== null) {
                distance =
                    typeof d === 'number' ? d : parseFloat(String(d));
            }
        }
        const { virtualAccount, ...stationFields } = base;
        const [isFavorite, ratingData, totalReviews] = await Promise.all([
            userId
                ? this.chargingStationFavoriteModel.findOne({
                    where: { stationId: id, userId },
                })
                : Promise.resolve(null),
            this.chargingStationRatingModel.findAll({
                attributes: [
                    [(0, sequelize_2.fn)('AVG', (0, sequelize_2.col)('rating')), 'averageRating'],
                    [(0, sequelize_2.fn)('COUNT', (0, sequelize_2.col)('id')), 'totalRatings'],
                ],
                where: { stationId: id },
                raw: true,
            }),
            this.chargingStationReviewModel.count({ where: { stationId: id } }),
        ]);
        const ratingResult = ratingData[0];
        const averageRating = ratingResult?.averageRating
            ? parseFloat(ratingResult.averageRating)
            : 0;
        const totalRatings = ratingResult?.totalRatings
            ? parseInt(ratingResult.totalRatings, 10)
            : 0;
        return {
            ...stationFields,
            virtualAccount,
            isFavorite: !!isFavorite,
            rating: averageRating,
            reviews: totalReviews,
            totalRatings,
            totalReviews,
            ...(distance !== undefined ? { distance } : {}),
        };
    }
    async findAll(options, userId) {
        const stations = await this.chargingStationModel.findAll(options || {});
        if (stations.length === 0)
            return stations;
        const stationIds = stations.map((s) => s.id);
        const [favorites, ratingsData, reviewsCounts] = await Promise.all([
            userId
                ? this.chargingStationFavoriteModel.findAll({
                    where: { stationId: { [sequelize_2.Op.in]: stationIds }, userId },
                })
                : Promise.resolve([]),
            this.chargingStationRatingModel.findAll({
                attributes: [
                    'stationId',
                    [(0, sequelize_2.fn)('AVG', (0, sequelize_2.col)('rating')), 'averageRating'],
                    [(0, sequelize_2.fn)('COUNT', (0, sequelize_2.col)('id')), 'totalRatings'],
                ],
                where: { stationId: { [sequelize_2.Op.in]: stationIds } },
                group: ['stationId'],
                raw: true,
            }),
            this.chargingStationReviewModel.findAll({
                attributes: [
                    'stationId',
                    [(0, sequelize_2.fn)('COUNT', (0, sequelize_2.col)('id')), 'count'],
                ],
                where: { stationId: { [sequelize_2.Op.in]: stationIds } },
                group: ['stationId'],
                raw: true,
            }),
        ]);
        const favoriteStationIds = new Set(favorites.map((f) => f.stationId));
        const ratingsMap = new Map(ratingsData.map((r) => [
            r.stationId,
            {
                averageRating: r.averageRating ? parseFloat(r.averageRating) : 0,
                totalRatings: parseInt(r.totalRatings) || 0,
            },
        ]));
        const reviewsMap = new Map(reviewsCounts.map((r) => [r.stationId, Number(r.count)]));
        return stations.map((station) => {
            const stationData = station.toJSON ? station.toJSON() : station;
            const ratingInfo = ratingsMap.get(station.id) || { averageRating: 0, totalRatings: 0 };
            return {
                ...stationData,
                isFavorite: userId ? favoriteStationIds.has(station.id) : false,
                rating: ratingInfo.averageRating,
                reviews: reviewsMap.get(station.id) || 0,
                totalRatings: ratingInfo.totalRatings,
                totalReviews: reviewsMap.get(station.id) || 0,
            };
        });
    }
    async findActiveStations(options, userId) {
        const where = {
            isActive: true,
        };
        if (options?.country) {
            where.country = options.country;
        }
        if (options?.state) {
            where.state = options.state;
        }
        const stations = await this.chargingStationModel.findAll({
            where,
            limit: options?.limit,
            offset: options?.offset,
            order: [['createdAt', 'DESC']],
        });
        if (stations.length === 0)
            return stations;
        const stationIds = stations.map((s) => s.id);
        const [favorites, ratingsData, reviewsCounts] = await Promise.all([
            userId
                ? this.chargingStationFavoriteModel.findAll({
                    where: { stationId: { [sequelize_2.Op.in]: stationIds }, userId },
                })
                : Promise.resolve([]),
            this.chargingStationRatingModel.findAll({
                attributes: [
                    'stationId',
                    [(0, sequelize_2.fn)('AVG', (0, sequelize_2.col)('rating')), 'averageRating'],
                    [(0, sequelize_2.fn)('COUNT', (0, sequelize_2.col)('id')), 'totalRatings'],
                ],
                where: { stationId: { [sequelize_2.Op.in]: stationIds } },
                group: ['stationId'],
                raw: true,
            }),
            this.chargingStationReviewModel.findAll({
                attributes: [
                    'stationId',
                    [(0, sequelize_2.fn)('COUNT', (0, sequelize_2.col)('id')), 'count'],
                ],
                where: { stationId: { [sequelize_2.Op.in]: stationIds } },
                group: ['stationId'],
                raw: true,
            }),
        ]);
        const favoriteStationIds = new Set(favorites.map((f) => f.stationId));
        const ratingsMap = new Map(ratingsData.map((r) => [
            r.stationId,
            {
                averageRating: r.averageRating ? parseFloat(r.averageRating) : 0,
                totalRatings: parseInt(r.totalRatings) || 0,
            },
        ]));
        const reviewsMap = new Map(reviewsCounts.map((r) => [r.stationId, Number(r.count)]));
        return stations.map((station) => {
            const stationData = station.toJSON ? station.toJSON() : station;
            const ratingInfo = ratingsMap.get(station.id) || { averageRating: 0, totalRatings: 0 };
            return {
                ...stationData,
                isFavorite: userId ? favoriteStationIds.has(station.id) : false,
                rating: ratingInfo.averageRating,
                reviews: reviewsMap.get(station.id) || 0,
                totalRatings: ratingInfo.totalRatings,
                totalReviews: reviewsMap.get(station.id) || 0,
            };
        });
    }
    async findNearbyStations(latitude, longitude, radiusKm = 10, options) {
        const bufferMultiplier = 1.2;
        const latDelta = (radiusKm * bufferMultiplier) / 111;
        const lonDelta = (radiusKm * bufferMultiplier) / (111 * Math.cos(this.toRad(latitude)));
        const whereConditions = [
            { latitude: { [sequelize_2.Op.between]: [latitude - latDelta, latitude + latDelta] } },
            { longitude: { [sequelize_2.Op.between]: [longitude - lonDelta, longitude + lonDelta] } },
            { latitude: { [sequelize_2.Op.ne]: null } },
            { longitude: { [sequelize_2.Op.ne]: null } },
        ];
        if (options?.country) {
            whereConditions.push({ country: options.country });
        }
        if (options?.state) {
            whereConditions.push({ state: options.state });
        }
        whereConditions.push({
            isActive: options?.isActive !== undefined ? options.isActive : true,
        });
        const radiusMeters = radiusKm * 1000;
        const distanceExpression = (0, sequelize_2.literal)(`(ST_Distance_Sphere(
        ST_GeomFromText(CONCAT('POINT(', longitude, ' ', latitude, ')'), 4326),
        ST_GeomFromText('POINT(${longitude} ${latitude})', 4326)
      ) / 1000)`);
        const distanceCondition = (0, sequelize_2.literal)(`ST_Distance_Sphere(
        ST_GeomFromText(CONCAT('POINT(', longitude, ' ', latitude, ')'), 4326),
        ST_GeomFromText('POINT(${longitude} ${latitude})', 4326)
      ) <= ${radiusMeters}`);
        whereConditions.push(distanceCondition);
        const finalWhere = {
            [sequelize_2.Op.and]: whereConditions,
        };
        const total = await this.chargingStationModel.count({ where: finalWhere });
        const limit = options?.limit || 50;
        const offset = options?.offset || 0;
        const stations = await this.chargingStationModel.findAll({
            where: finalWhere,
            attributes: {
                include: [
                    [
                        distanceExpression,
                        'distance',
                    ],
                ],
            },
            order: [[distanceExpression, 'ASC']],
            limit,
            offset,
        });
        if (stations.length > 0) {
            const stationIds = stations.map((s) => s.id);
            const [favorites, ratingsData, reviewsCounts] = await Promise.all([
                options?.userId
                    ? this.chargingStationFavoriteModel.findAll({
                        where: { stationId: { [sequelize_2.Op.in]: stationIds }, userId: options.userId },
                    })
                    : Promise.resolve([]),
                this.chargingStationRatingModel.findAll({
                    attributes: [
                        'stationId',
                        [(0, sequelize_2.fn)('AVG', (0, sequelize_2.col)('rating')), 'averageRating'],
                        [(0, sequelize_2.fn)('COUNT', (0, sequelize_2.col)('id')), 'totalRatings'],
                    ],
                    where: { stationId: { [sequelize_2.Op.in]: stationIds } },
                    group: ['stationId'],
                    raw: true,
                }),
                this.chargingStationReviewModel.findAll({
                    attributes: [
                        'stationId',
                        [(0, sequelize_2.fn)('COUNT', (0, sequelize_2.col)('id')), 'count'],
                    ],
                    where: { stationId: { [sequelize_2.Op.in]: stationIds } },
                    group: ['stationId'],
                    raw: true,
                }),
            ]);
            const favoriteStationIds = new Set(favorites.map((f) => f.stationId));
            const ratingsMap = new Map(ratingsData.map((r) => [
                r.stationId,
                {
                    averageRating: r.averageRating ? parseFloat(r.averageRating) : 0,
                    totalRatings: parseInt(r.totalRatings) || 0,
                },
            ]));
            const reviewsMap = new Map(reviewsCounts.map((r) => [r.stationId, Number(r.count)]));
            const stationsWithData = stations.map((station) => {
                const stationData = station.toJSON ? station.toJSON() : station;
                const ratingInfo = ratingsMap.get(station.id) || { averageRating: 0, totalRatings: 0 };
                return {
                    ...stationData,
                    isFavorite: options?.userId ? favoriteStationIds.has(station.id) : false,
                    rating: ratingInfo.averageRating,
                    reviews: reviewsMap.get(station.id) || 0,
                    totalRatings: ratingInfo.totalRatings,
                    totalReviews: reviewsMap.get(station.id) || 0,
                };
            });
            return { stations: stationsWithData, total };
        }
        return { stations, total };
    }
    async search(query, options) {
        const searchPattern = `%${query}%`;
        const where = {
            [sequelize_2.Op.or]: [
                { name: { [sequelize_2.Op.like]: searchPattern } },
                { address: { [sequelize_2.Op.like]: searchPattern } },
            ],
        };
        if (options?.latitude && options?.longitude) {
            const radiusKm = options.radiusKm || 10;
            const bufferMultiplier = 1.2;
            const latDelta = (radiusKm * bufferMultiplier) / 111;
            const lonDelta = (radiusKm * bufferMultiplier) / (111 * Math.cos(this.toRad(options.latitude)));
            where.latitude = {
                [sequelize_2.Op.between]: [options.latitude - latDelta, options.latitude + latDelta],
                [sequelize_2.Op.ne]: null,
            };
            where.longitude = {
                [sequelize_2.Op.between]: [options.longitude - lonDelta, options.longitude + lonDelta],
                [sequelize_2.Op.ne]: null,
            };
            const radiusMeters = radiusKm * 1000;
            const distanceExpression = (0, sequelize_2.literal)(`(ST_Distance_Sphere(
          ST_GeomFromText(CONCAT('POINT(', longitude, ' ', latitude, ')'), 4326),
          ST_GeomFromText('POINT(${options.longitude} ${options.latitude})', 4326)
        ) / 1000)`);
            const distanceCondition = (0, sequelize_2.literal)(`ST_Distance_Sphere(
          ST_GeomFromText(CONCAT('POINT(', longitude, ' ', latitude, ')'), 4326),
          ST_GeomFromText('POINT(${options.longitude} ${options.latitude})', 4326)
        ) <= ${radiusMeters}`);
            where[sequelize_2.Op.and] = [distanceCondition];
            const limit = options?.limit || 20;
            const offset = options?.offset || 0;
            const [stations, total] = await Promise.all([
                this.chargingStationModel.findAll({
                    where,
                    attributes: ['id', 'name', 'address'],
                    order: [[distanceExpression, 'ASC']],
                    limit,
                    offset,
                }),
                this.chargingStationModel.count({ where }),
            ]);
            return {
                stations: stations.map((s) => {
                    const data = s.get ? s.get({ plain: true }) : (s.toJSON ? s.toJSON() : s);
                    return {
                        id: String(data.id || ''),
                        name: String(data.name || ''),
                        address: String(data.address || ''),
                    };
                }),
                total,
            };
        }
        const limit = options?.limit || 20;
        const offset = options?.offset || 0;
        const [stations, total] = await Promise.all([
            this.chargingStationModel.findAll({
                where,
                attributes: ['id', 'name', 'address'],
                limit,
                offset,
                order: [['name', 'ASC']],
                raw: true,
            }),
            this.chargingStationModel.count({ where }),
        ]);
        return {
            stations: stations.map((s) => ({
                id: String(s.id || ''),
                name: String(s.name || ''),
                address: String(s.address || ''),
            })),
            total,
        };
    }
    async create(chargingStationData) {
        const station = await this.chargingStationModel.create(chargingStationData, { raw: true, returning: true });
        return station.toJSON();
    }
    async update(id, chargingStationData) {
        return await this.chargingStationModel.update(chargingStationData, {
            where: { id },
            returning: true,
        });
    }
    async delete(id) {
        return await this.chargingStationModel.destroy({
            where: { id },
        });
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
        return R * c;
    }
    toRad(degrees) {
        return (degrees * Math.PI) / 180;
    }
};
exports.ChargingStationRepository = ChargingStationRepository;
exports.ChargingStationRepository = ChargingStationRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(charging_station_entity_1.ChargingStation)),
    __param(1, (0, sequelize_1.InjectModel)(charging_station_favorite_entity_1.ChargingStationFavorite)),
    __param(2, (0, sequelize_1.InjectModel)(charging_station_rating_entity_1.ChargingStationRating)),
    __param(3, (0, sequelize_1.InjectModel)(charging_station_review_entity_1.ChargingStationReview)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], ChargingStationRepository);
//# sourceMappingURL=charging-station.repository.js.map