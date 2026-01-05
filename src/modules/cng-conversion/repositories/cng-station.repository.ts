import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CngStation } from '../entities/cng-station.entity';
import { CngStationFavorite } from '../entities/cng-station-favorite.entity';
import { CngStationRating } from '../entities/cng-station-rating.entity';
import { CngStationReview } from '../entities/cng-station-review.entity';
import { Op, literal, fn, col } from 'sequelize';

@Injectable()
export class CngStationRepository {
  constructor(
    @InjectModel(CngStation)
    private readonly cngStationModel: typeof CngStation,
    @InjectModel(CngStationFavorite)
    private readonly cngStationFavoriteModel: typeof CngStationFavorite,
    @InjectModel(CngStationRating)
    private readonly cngStationRatingModel: typeof CngStationRating,
    @InjectModel(CngStationReview)
    private readonly cngStationReviewModel: typeof CngStationReview,
  ) {}

  async count(options?: any): Promise<number> {
    const count = await this.cngStationModel.count(options);
    return typeof count === 'number' ? count : (count as any).length || 0;
  }

  async findById(id: string, userId?: string): Promise<CngStation | null> {
    const station = await this.cngStationModel.findByPk(id);

    if (!station) return null;

    // Get aggregated data
    const [isFavorite, ratingData, totalReviews] = await Promise.all([
      userId
        ? this.cngStationFavoriteModel.findOne({
            where: { stationId: id, userId },
          })
        : Promise.resolve(null),
      this.cngStationRatingModel.findAll({
        attributes: [
          [fn('AVG', col('rating')), 'averageRating'],
          [fn('COUNT', col('id')), 'totalRatings'],
        ],
        where: { stationId: id },
        raw: true,
      }),
      this.cngStationReviewModel.count({ where: { stationId: id } }),
    ]);

    const ratingResult = ratingData[0] as any;
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
    } as any;
  }

  async findAll(
    options?: {
      where?: any;
      limit?: number;
      offset?: number;
      order?: any[];
      attributes?: any;
    },
    userId?: string,
  ): Promise<CngStation[]> {
    const stations = await this.cngStationModel.findAll({
      ...options,
    });

    if (stations.length === 0) return stations;

    const stationIds = stations.map((s) => s.id);

    // Get aggregated data for all stations
    const [favorites, ratingsData, reviewsCounts] = await Promise.all([
      userId
        ? this.cngStationFavoriteModel.findAll({
            where: { stationId: { [Op.in]: stationIds }, userId },
          })
        : Promise.resolve([]),
      this.cngStationRatingModel.findAll({
        attributes: [
          'stationId',
          [fn('AVG', col('rating')), 'averageRating'],
          [fn('COUNT', col('id')), 'totalRatings'],
        ],
        where: { stationId: { [Op.in]: stationIds } },
        group: ['stationId'],
        raw: true,
      }),
      this.cngStationReviewModel.findAll({
        attributes: [
          'stationId',
          [fn('COUNT', col('id')), 'count'],
        ],
        where: { stationId: { [Op.in]: stationIds } },
        group: ['stationId'],
        raw: true,
      }),
    ]);

    const favoriteStationIds = new Set(
      favorites.map((f) => f.stationId),
    );
    const ratingsMap = new Map(
      (ratingsData as any[]).map((r) => [
        r.stationId,
        {
          averageRating: r.averageRating ? parseFloat(r.averageRating) : 0,
          totalRatings: parseInt(r.totalRatings) || 0,
        },
      ]),
    );
    const reviewsMap = new Map(
      (reviewsCounts as any[]).map((r) => [r.stationId, Number(r.count)]),
    );

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
      } as any;
    });
  }

  async findActiveStations(
    options?: {
      limit?: number;
      offset?: number;
      country?: string;
      state?: string;
    },
    userId?: string,
  ): Promise<CngStation[]> {
    const where: any = {
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

    if (stations.length === 0) return stations;

    const stationIds = stations.map((s) => s.id);

    // Get aggregated data for all stations
    const [favorites, ratingsData, reviewsCounts] = await Promise.all([
      userId
        ? this.cngStationFavoriteModel.findAll({
            where: { stationId: { [Op.in]: stationIds }, userId },
          })
        : Promise.resolve([]),
      this.cngStationRatingModel.findAll({
        attributes: [
          'stationId',
          [fn('AVG', col('rating')), 'averageRating'],
          [fn('COUNT', col('id')), 'totalRatings'],
        ],
        where: { stationId: { [Op.in]: stationIds } },
        group: ['stationId'],
        raw: true,
      }),
      this.cngStationReviewModel.findAll({
        attributes: [
          'stationId',
          [fn('COUNT', col('id')), 'count'],
        ],
        where: { stationId: { [Op.in]: stationIds } },
        group: ['stationId'],
        raw: true,
      }),
    ]);

    const favoriteStationIds = new Set(
      favorites.map((f) => f.stationId),
    );
    const ratingsMap = new Map(
      (ratingsData as any[]).map((r) => [
        r.stationId,
        {
          averageRating: r.averageRating ? parseFloat(r.averageRating) : 0,
          totalRatings: parseInt(r.totalRatings) || 0,
        },
      ]),
    );
    const reviewsMap = new Map(
      (reviewsCounts as any[]).map((r) => [r.stationId, Number(r.count)]),
    );

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
      } as any;
    });
  }

  async findNearbyStations(
    latitude: number,
    longitude: number,
    radiusKm: number = 10,
    options?: {
      limit?: number;
      offset?: number;
      country?: string;
      state?: string;
      isActive?: boolean;
      userId?: string;
    },
  ): Promise<{ stations: CngStation[]; total: number }> {
    const bufferMultiplier = 1.2;
    const latDelta = (radiusKm * bufferMultiplier) / 111;
    const lonDelta = (radiusKm * bufferMultiplier) / (111 * Math.cos(this.toRad(latitude)));

    const whereConditions: any[] = [
      { latitude: { [Op.between]: [latitude - latDelta, latitude + latDelta] } },
      { longitude: { [Op.between]: [longitude - lonDelta, longitude + lonDelta] } },
      { latitude: { [Op.ne]: null } },
      { longitude: { [Op.ne]: null } },
    ];

    if (options?.country) {
      whereConditions.push({ country: options.country });
    }

    if (options?.state) {
      whereConditions.push({ state: options.state });
    }

    // whereConditions.push({
    //   isActive: options?.isActive !== undefined ? options.isActive : true,
    // });

    const radiusMeters = radiusKm * 1000;
    
    // Use column names directly in CONCAT (no table qualification needed in WHERE context)
    // Sequelize will handle the table context automatically
    const distanceExpression = literal(
      `(ST_Distance_Sphere(
        ST_GeomFromText(CONCAT('POINT(', longitude, ' ', latitude, ')'), 4326),
        ST_GeomFromText('POINT(${longitude} ${latitude})', 4326)
      ) / 1000)`,
    );

    const distanceCondition = literal(
      `ST_Distance_Sphere(
        ST_GeomFromText(CONCAT('POINT(', longitude, ' ', latitude, ')'), 4326),
        ST_GeomFromText('POINT(${longitude} ${latitude})', 4326)
      ) <= ${radiusMeters}`,
    );

    whereConditions.push(distanceCondition);

    const finalWhere = {
      [Op.and]: whereConditions,
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

      // Get aggregated data for all stations
      const [favorites, ratingsData, reviewsCounts] = await Promise.all([
        options?.userId
          ? this.cngStationFavoriteModel.findAll({
              where: { stationId: { [Op.in]: stationIds }, userId: options.userId },
            })
          : Promise.resolve([]),
        this.cngStationRatingModel.findAll({
          attributes: [
            'stationId',
            [fn('AVG', col('rating')), 'averageRating'],
            [fn('COUNT', col('id')), 'totalRatings'],
          ],
          where: { stationId: { [Op.in]: stationIds } },
          group: ['stationId'],
          raw: true,
        }),
        this.cngStationReviewModel.findAll({
          attributes: [
            'stationId',
            [fn('COUNT', col('id')), 'count'],
          ],
          where: { stationId: { [Op.in]: stationIds } },
          group: ['stationId'],
          raw: true,
        }),
      ]);

      const favoriteStationIds = new Set(
        favorites.map((f) => f.stationId),
      );
      const ratingsMap = new Map(
        (ratingsData as any[]).map((r) => [
          r.stationId,
          {
            averageRating: r.averageRating ? parseFloat(r.averageRating) : 0,
            totalRatings: parseInt(r.totalRatings) || 0,
          },
        ]),
      );
      const reviewsMap = new Map(
        (reviewsCounts as any[]).map((r) => [r.stationId, Number(r.count)]),
      );

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
        } as any;
      });

      return { stations: stationsWithData, total };
    }

    return { stations, total };
  }

  async create(cngStationData: Partial<CngStation>): Promise<CngStation> {
    const cngStation = await this.cngStationModel.create(cngStationData as any, {
      raw: true,
      returning: true,
    });
    return cngStation.toJSON() as CngStation;
  }

  async update(
    id: string,
    cngStationData: Partial<CngStation>,
  ): Promise<[number, CngStation[]]> {
    return await this.cngStationModel.update(cngStationData, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: string): Promise<number> {
    return await this.cngStationModel.destroy({
      where: { id },
    });
  }

  async search(
    query: string,
    options?: {
      limit?: number;
      offset?: number;
      latitude?: number;
      longitude?: number;
      radiusKm?: number;
      userId?: string;
    },
  ): Promise<{ stations: Array<{ id: string; name: string; address: string }>; total: number }> {
    const searchPattern = `%${query}%`;
    const where: any = {
      [Op.or]: [
        { name: { [Op.like]: searchPattern } },
        { address: { [Op.like]: searchPattern } },
      ],
    };

    // If coordinates provided, add distance calculation and filter
    if (options?.latitude && options?.longitude) {
      const radiusKm = options.radiusKm || 10;
      const bufferMultiplier = 1.2;
      const latDelta = (radiusKm * bufferMultiplier) / 111;
      const lonDelta = (radiusKm * bufferMultiplier) / (111 * Math.cos(this.toRad(options.latitude)));

      where.latitude = {
        [Op.between]: [options.latitude - latDelta, options.latitude + latDelta],
        [Op.ne]: null,
      };
      where.longitude = {
        [Op.between]: [options.longitude - lonDelta, options.longitude + lonDelta],
        [Op.ne]: null,
      };

      const radiusMeters = radiusKm * 1000;
      const distanceExpression = literal(
        `(ST_Distance_Sphere(
          ST_GeomFromText(CONCAT('POINT(', longitude, ' ', latitude, ')'), 4326),
          ST_GeomFromText('POINT(${options.longitude} ${options.latitude})', 4326)
        ) / 1000)`,
      );

      const distanceCondition = literal(
        `ST_Distance_Sphere(
          ST_GeomFromText(CONCAT('POINT(', longitude, ' ', latitude, ')'), 4326),
          ST_GeomFromText('POINT(${options.longitude} ${options.latitude})', 4326)
        ) <= ${radiusMeters}`,
      );

      where[Op.and] = [distanceCondition];

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

    // Search without coordinates (just name/address search)
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
      stations: (stations as any[]).map((s) => ({
        id: String(s.id || ''),
        name: String(s.name || ''),
        address: String(s.address || ''),
      })),
      total,
    };
  }

  /**
   * Helper method to convert degrees to radians
   */
  private toRad(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }
}

