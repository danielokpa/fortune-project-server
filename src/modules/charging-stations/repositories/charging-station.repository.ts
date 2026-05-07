import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ChargingStation } from '../entities/charging-station.entity';
import { ChargingStationFavorite } from '../entities/charging-station-favorite.entity';
import { ChargingStationRating } from '../entities/charging-station-rating.entity';
import { ChargingStationReview } from '../entities/charging-station-review.entity';
import { Op, literal, fn, col, QueryTypes } from 'sequelize';

/** Plain row shape (matches raw SQL / JSON), not a Sequelize Model instance */
export type ChargingStationRow = Pick<
  ChargingStation,
  | 'id'
  | 'name'
  | 'state'
  | 'country'
  | 'address'
  | 'contactPhone'
  | 'openingTime'
  | 'closingTime'
  | 'amountPerUnit'
  | 'currency'
  | 'amountPerUnitType'
  | 'contactEmail'
  | 'isActive'
  | 'longitude'
  | 'latitude'
  | 'stationImage'
  | 'createdAt'
  | 'updatedAt'
>;

export type ChargingStationWithVirtualAccount = ChargingStationRow & {
  virtualAccount: {
    accountName: string;
    bankName: string;
    accountNumber: string;
  } | null;
};

/** Single-station fetch: station + VA + favorites/ratings (+ optional distance). */
export type ChargingStationDetail = ChargingStationWithVirtualAccount & {
  isFavorite: boolean;
  rating: number;
  reviews: number;
  totalRatings: number;
  totalReviews: number;
  distance?: number;
};

@Injectable()
export class ChargingStationRepository {
  constructor(
    @InjectModel(ChargingStation)
    private readonly chargingStationModel: typeof ChargingStation,
    @InjectModel(ChargingStationFavorite)
    private readonly chargingStationFavoriteModel: typeof ChargingStationFavorite,
    @InjectModel(ChargingStationRating)
    private readonly chargingStationRatingModel: typeof ChargingStationRating,
    @InjectModel(ChargingStationReview)
    private readonly chargingStationReviewModel: typeof ChargingStationReview,
  ) {}

  async count(options?: any): Promise<number> {
    const count = await this.chargingStationModel.count(options);
    return typeof count === 'number' ? count : (count as any).length || 0;
  }

  /**
   * Raw SQL: charging station row + optional virtual_accounts (join on virtual_accounts.userId = station.id).
   * Does not use a Sequelize VirtualAccount model.
   */
  async findByIdWithVirtualAccountRaw(
    id: string,
  ): Promise<ChargingStationWithVirtualAccount | null> {
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
      type: QueryTypes.SELECT,
    });

    const row = rows[0] as Record<string, unknown> | undefined;
    if (!row) {
      return null;
    }

    const vaAccountNumber = row.va_accountNumber;

    console.log('vaAccountNumber', vaAccountNumber);

    const virtualAccount =
      vaAccountNumber != null && String(vaAccountNumber).length > 0
        ? {
            accountName: String(row.va_accountName ?? ''),
            bankName: String(row.va_bankName ?? ''),
            accountNumber: String(vaAccountNumber),
          }
        : null;

    const {
      va_accountName: _a,
      va_bankName: _b,
      va_accountNumber: _c,
      ...centerFields
    } = row;

    return {
      ...(centerFields as ChargingStationRow),
      virtualAccount,
    };
  }

  async findById(
    id: string,
    userId?: string,
    latitude?: number,
    longitude?: number,
  ): Promise<ChargingStationDetail | null> {
    const base = await this.findByIdWithVirtualAccountRaw(id);
    if (!base) return null;

    let distance: number | undefined;
    if (latitude !== undefined && longitude !== undefined) {
      const sequelize = this.chargingStationModel.sequelize;
      if (!sequelize) {
        throw new Error('Sequelize instance not available');
      }
      const userPoint = `POINT(${longitude} ${latitude})`;
      const distRows = await sequelize.query<{ distance: string | number }>(
        `
        SELECT (ST_Distance_Sphere(
          ST_GeomFromText(CONCAT('POINT(', cs.longitude, ' ', cs.latitude, ')'), 4326),
          ST_GeomFromText(:userPoint, 4326)
        ) / 1000) AS distance
        FROM \`charging_stations\` AS cs
        WHERE cs.\`id\` = :id AND cs.\`deletedAt\` IS NULL
        LIMIT 1
      `,
        {
          replacements: { id, userPoint },
          type: QueryTypes.SELECT,
        },
      );
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
          [fn('AVG', col('rating')), 'averageRating'],
          [fn('COUNT', col('id')), 'totalRatings'],
        ],
        where: { stationId: id },
        raw: true,
      }),
      this.chargingStationReviewModel.count({ where: { stationId: id } }),
    ]);

    const ratingResult = ratingData[0] as any;
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

  async findAll(
    options?: {
    where?: any;
    limit?: number;
    offset?: number;
    order?: any[];
    include?: any[];
    },
    userId?: string,
  ): Promise<ChargingStation[]> {
    const stations = await this.chargingStationModel.findAll(options || {});

    if (stations.length === 0) return stations;

    const stationIds = stations.map((s) => s.id);

    // Get aggregated data for all stations
    const [favorites, ratingsData, reviewsCounts] = await Promise.all([
      userId
        ? this.chargingStationFavoriteModel.findAll({
            where: { stationId: { [Op.in]: stationIds }, userId },
          })
        : Promise.resolve([]),
      this.chargingStationRatingModel.findAll({
        attributes: [
          'stationId',
          [fn('AVG', col('rating')), 'averageRating'],
          [fn('COUNT', col('id')), 'totalRatings'],
        ],
        where: { stationId: { [Op.in]: stationIds } },
        group: ['stationId'],
        raw: true,
      }),
      this.chargingStationReviewModel.findAll({
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
  ): Promise<ChargingStation[]> {
    const where: any = {
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

    if (stations.length === 0) return stations;

    const stationIds = stations.map((s) => s.id);

    // Get aggregated data for all stations
    const [favorites, ratingsData, reviewsCounts] = await Promise.all([
      userId
        ? this.chargingStationFavoriteModel.findAll({
            where: { stationId: { [Op.in]: stationIds }, userId },
          })
        : Promise.resolve([]),
      this.chargingStationRatingModel.findAll({
        attributes: [
          'stationId',
          [fn('AVG', col('rating')), 'averageRating'],
          [fn('COUNT', col('id')), 'totalRatings'],
        ],
        where: { stationId: { [Op.in]: stationIds } },
        group: ['stationId'],
        raw: true,
      }),
      this.chargingStationReviewModel.findAll({
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
  ): Promise<{ stations: ChargingStation[]; total: number }> {
    
    const bufferMultiplier = 1.2; // 20% buffer to ensure we capture all stations
    const latDelta = (radiusKm * bufferMultiplier) / 111;
    const lonDelta = (radiusKm * bufferMultiplier) / (111 * Math.cos(this.toRad(latitude)));

    // Build WHERE clause with bounding box for performance
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

    // Default to active stations if not specified
    whereConditions.push({
      isActive: options?.isActive !== undefined ? options.isActive : true,
    });

    const radiusMeters = radiusKm * 1000;
    
    // Use column names directly in CONCAT (no table qualification needed in WHERE context)
    // Sequelize will handle the table context automatically
    const distanceExpression = literal(
      `(ST_Distance_Sphere(
        ST_GeomFromText(CONCAT('POINT(', longitude, ' ', latitude, ')'), 4326),
        ST_GeomFromText('POINT(${longitude} ${latitude})', 4326)
      ) / 1000)`,
    );

    // Add distance filter to WHERE clause
    const distanceCondition = literal(
      `ST_Distance_Sphere(
        ST_GeomFromText(CONCAT('POINT(', longitude, ' ', latitude, ')'), 4326),
        ST_GeomFromText('POINT(${longitude} ${latitude})', 4326)
      ) <= ${radiusMeters}`,
    );

    whereConditions.push(distanceCondition);

    // Combine all conditions
    const finalWhere = {
      [Op.and]: whereConditions,
    };

    // Get total count first (for pagination metadata)
    const total = await this.chargingStationModel.count({ where: finalWhere });

    // Fetch paginated results ordered by distance
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

      // Get aggregated data for all stations
      const [favorites, ratingsData, reviewsCounts] = await Promise.all([
        options?.userId
          ? this.chargingStationFavoriteModel.findAll({
              where: { stationId: { [Op.in]: stationIds }, userId: options.userId },
            })
          : Promise.resolve([]),
        this.chargingStationRatingModel.findAll({
          attributes: [
            'stationId',
            [fn('AVG', col('rating')), 'averageRating'],
            [fn('COUNT', col('id')), 'totalRatings'],
          ],
          where: { stationId: { [Op.in]: stationIds } },
          group: ['stationId'],
          raw: true,
        }),
        this.chargingStationReviewModel.findAll({
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

    // Search without coordinates (just name/address search)
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
      stations: (stations as any[]).map((s) => ({
        id: String(s.id || ''),
        name: String(s.name || ''),
        address: String(s.address || ''),
      })),
      total,
    };
  }

  async create(
    chargingStationData: Partial<ChargingStation>,
  ): Promise<ChargingStation> {
    const station = await this.chargingStationModel.create(
      chargingStationData as any,
      { raw: true, returning: true },
    );
    return station.toJSON() as ChargingStation;
  }

  async update(
    id: string,
    chargingStationData: Partial<ChargingStation>,
  ): Promise<[number, ChargingStation[]]> {
    return await this.chargingStationModel.update(chargingStationData, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: string): Promise<number> {
    return await this.chargingStationModel.destroy({
      where: { id },
    });
  }

  /**
   * Calculate distance between two coordinates using Haversine formula
   * Returns distance in kilometers
   */
  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }
}

