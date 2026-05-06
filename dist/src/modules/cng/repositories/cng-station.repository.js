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
exports.CngStationRepository = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const cng_station_entity_1 = require("../entities/cng-station.entity");
const cng_station_favorite_entity_1 = require("../entities/cng-station-favorite.entity");
const cng_station_rating_entity_1 = require("../entities/cng-station-rating.entity");
const cng_station_review_entity_1 = require("../entities/cng-station-review.entity");
const sequelize_2 = require("sequelize");
let CngStationRepository = class CngStationRepository {
    cngStationModel;
    cngStationFavoriteModel;
    cngStationRatingModel;
    cngStationReviewModel;
    constructor(cngStationModel, cngStationFavoriteModel, cngStationRatingModel, cngStationReviewModel) {
        this.cngStationModel = cngStationModel;
        this.cngStationFavoriteModel = cngStationFavoriteModel;
        this.cngStationRatingModel = cngStationRatingModel;
        this.cngStationReviewModel = cngStationReviewModel;
    }
    async count(options) {
        const count = await this.cngStationModel.count(options);
        return typeof count === 'number' ? count : count.length || 0;
    }
    async findById(id, userId, latitude, longitude) {
        let findOptions = {};
        if (latitude !== undefined && longitude !== undefined) {
            const distanceExpression = (0, sequelize_2.literal)(`(ST_Distance_Sphere(
          ST_GeomFromText(CONCAT('POINT(', longitude, ' ', latitude, ')'), 4326),
          ST_GeomFromText('POINT(${longitude} ${latitude})', 4326)
        ) / 1000)`);
            findOptions.attributes = {
                include: [
                    [distanceExpression, 'distance'],
                ],
            };
        }
        const station = await this.cngStationModel.findByPk(id, findOptions);
        if (!station)
            return null;
        const [isFavorite, ratingData, totalReviews] = await Promise.all([
            userId
                ? this.cngStationFavoriteModel.findOne({
                    where: { stationId: id, userId },
                })
                : Promise.resolve(null),
            this.cngStationRatingModel.findAll({
                attributes: [
                    [(0, sequelize_2.fn)('AVG', (0, sequelize_2.col)('rating')), 'averageRating'],
                    [(0, sequelize_2.fn)('COUNT', (0, sequelize_2.col)('id')), 'totalRatings'],
                ],
                where: { stationId: id },
                raw: true,
            }),
            this.cngStationReviewModel.count({ where: { stationId: id } }),
        ]);
        const ratingResult = ratingData[0];
        const averageRating = ratingResult?.averageRating
            ? parseFloat(ratingResult.averageRating)
            : 0;
        const totalRatings = ratingResult?.totalRatings
            ? parseInt(ratingResult.totalRatings)
            : 0;
        const stationData = station.toJSON ? station.toJSON() : station;
        return {
            ...stationData,
            isFavorite: !!isFavorite,
            rating: averageRating,
            reviews: totalReviews,
            totalRatings,
            totalReviews,
        };
    }
    async findAll(options, userId) {
        const stations = await this.cngStationModel.findAll({
            ...options,
        });
        if (stations.length === 0)
            return stations;
        const stationIds = stations.map((s) => s.id);
        const [favorites, ratingsData, reviewsCounts] = await Promise.all([
            userId
                ? this.cngStationFavoriteModel.findAll({
                    where: { stationId: { [sequelize_2.Op.in]: stationIds }, userId },
                })
                : Promise.resolve([]),
            this.cngStationRatingModel.findAll({
                attributes: [
                    'stationId',
                    [(0, sequelize_2.fn)('AVG', (0, sequelize_2.col)('rating')), 'averageRating'],
                    [(0, sequelize_2.fn)('COUNT', (0, sequelize_2.col)('id')), 'totalRatings'],
                ],
                where: { stationId: { [sequelize_2.Op.in]: stationIds } },
                group: ['stationId'],
                raw: true,
            }),
            this.cngStationReviewModel.findAll({
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
        const stations = await this.cngStationModel.findAll({
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
                ? this.cngStationFavoriteModel.findAll({
                    where: { stationId: { [sequelize_2.Op.in]: stationIds }, userId },
                })
                : Promise.resolve([]),
            this.cngStationRatingModel.findAll({
                attributes: [
                    'stationId',
                    [(0, sequelize_2.fn)('AVG', (0, sequelize_2.col)('rating')), 'averageRating'],
                    [(0, sequelize_2.fn)('COUNT', (0, sequelize_2.col)('id')), 'totalRatings'],
                ],
                where: { stationId: { [sequelize_2.Op.in]: stationIds } },
                group: ['stationId'],
                raw: true,
            }),
            this.cngStationReviewModel.findAll({
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
        const total = await this.cngStationModel.count({ where: finalWhere });
        const limit = options?.limit || 50;
        const offset = options?.offset || 0;
        const stations = await this.cngStationModel.findAll({
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
                    ? this.cngStationFavoriteModel.findAll({
                        where: { stationId: { [sequelize_2.Op.in]: stationIds }, userId: options.userId },
                    })
                    : Promise.resolve([]),
                this.cngStationRatingModel.findAll({
                    attributes: [
                        'stationId',
                        [(0, sequelize_2.fn)('AVG', (0, sequelize_2.col)('rating')), 'averageRating'],
                        [(0, sequelize_2.fn)('COUNT', (0, sequelize_2.col)('id')), 'totalRatings'],
                    ],
                    where: { stationId: { [sequelize_2.Op.in]: stationIds } },
                    group: ['stationId'],
                    raw: true,
                }),
                this.cngStationReviewModel.findAll({
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
    async create(cngStationData) {
        const cngStation = await this.cngStationModel.create(cngStationData, {
            raw: true,
            returning: true,
        });
        return cngStation.toJSON();
    }
    async update(id, cngStationData) {
        return await this.cngStationModel.update(cngStationData, {
            where: { id },
            returning: true,
        });
    }
    async delete(id) {
        return await this.cngStationModel.destroy({
            where: { id },
        });
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
                this.cngStationModel.findAll({
                    where,
                    attributes: ['id', 'name', 'address'],
                    order: [[distanceExpression, 'ASC']],
                    limit,
                    offset,
                }),
                this.cngStationModel.count({ where }),
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
            this.cngStationModel.findAll({
                where,
                attributes: ['id', 'name', 'address'],
                order: [['name', 'ASC']],
                raw: true,
            }),
            this.cngStationModel.count({ where }),
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
    toRad(degrees) {
        return (degrees * Math.PI) / 180;
    }
};
exports.CngStationRepository = CngStationRepository;
exports.CngStationRepository = CngStationRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(cng_station_entity_1.CngStation)),
    __param(1, (0, sequelize_1.InjectModel)(cng_station_favorite_entity_1.CngStationFavorite)),
    __param(2, (0, sequelize_1.InjectModel)(cng_station_rating_entity_1.CngStationRating)),
    __param(3, (0, sequelize_1.InjectModel)(cng_station_review_entity_1.CngStationReview)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], CngStationRepository);
//# sourceMappingURL=cng-station.repository.js.map