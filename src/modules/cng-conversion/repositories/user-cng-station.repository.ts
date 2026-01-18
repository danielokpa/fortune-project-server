import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserCngStation } from '../entities/user-cng-station.entity';
import { CngStationFavorite } from '../entities/cng-station-favorite.entity';
import { CngStation } from '../entities/cng-station.entity';
import { Op } from 'sequelize';
import { SelfTripStatus } from 'src/enums/self-trip-status.enum';

@Injectable()
export class UserCngStationRepository {
  constructor(
    @InjectModel(UserCngStation)
    private readonly userCngStationModel: typeof UserCngStation,
    @InjectModel(CngStationFavorite)
    private readonly cngStationFavoriteModel: typeof CngStationFavorite,
    @InjectModel(CngStation)
    private readonly cngStationModel: typeof CngStation,
  ) {}

  async count(options?: any): Promise<number> {
    const count = await this.userCngStationModel.count(options);
    return typeof count === 'number' ? count : (count as any).length || 0;
  }

  async findById(id: string): Promise<UserCngStation | null> {
    return await this.userCngStationModel.findByPk(id, {
      include: ['cngStation', 'user'],
    });
  }

  async findByUserIdAndStationId(
    userId: string,
    cngStationId: string,
  ): Promise<UserCngStation | null> {
    return await this.userCngStationModel.findOne({
      where: {
        userId,
        cngStationId,
      },
      include: ['cngStation'],
    });
  }

  async findByUserIdSelfTripStatusAndStationId(
    userId: string,
    selfTripStatus: SelfTripStatus,
  ): Promise<UserCngStation | null> {
    return await this.userCngStationModel.findOne({
      where: {
        userId,
        selfTripStatus,
      },
      include: ['cngStation'],
    });
  }

  async findActiveTripByUserIdAndId(
    userId: string,
    id: string,
  ): Promise<UserCngStation | null> {
    return await this.userCngStationModel.findOne({
      where: {
        userId,
        id,
        selfTripStatus: {
          [Op.in]: ['START_TRIP', 'ONGOING_TRIP'],
        },
      },
      include: ['cngStation'],
    });
  }

  async findActiveTripByUserId(
    userId: string,
  ): Promise<UserCngStation | null> {
    return await this.userCngStationModel.findOne({
      where: {
        userId,
        selfTripStatus: {
          [Op.in]: ['START_TRIP', 'ONGOING_TRIP'],
        },
      },
      attributes: ['id', 'selfTripStatus'],
      include: [
        {
          model: CngStation,
          as: 'cngStation',
          attributes: ['id', 'name', 'address'],
        },
      ],
      order: [['updatedAt', 'DESC']],
    });
  }

  async findRecentByUserId(
    userId: string,
    options?: {
      limit?: number;
      offset?: number;
    },
  ): Promise<Array<{ id: string; name: string; address: string }>> {
    const recentStations = await this.userCngStationModel.findAll({
      where: { userId },
      include: [
        {
          model: CngStation,
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
        const station = (recentData as any).cngStation;
        if (!station) return null;
        return {
          id: String(station.id || ''),
          name: String(station.name || ''),
          address: String(station.address || ''),
        };
      })
      .filter((item) => item !== null) as Array<{ id: string; name: string; address: string }>;
  }

  async findFavoritesByUserId(
    userId: string,
    options?: {
      limit?: number;
      offset?: number;
    },
  ): Promise<Array<{ id: string; name: string; address: string }>> {
    const favorites = await this.cngStationFavoriteModel.findAll({
      where: { userId },
      include: [
        {
          model: CngStation,
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
        const station = (favoriteData as any).cngStation;
        if (!station) return null;
        return {
          id: String(station.id || ''),
          name: String(station.name || ''),
          address: String(station.address || ''),
        };
      })
      .filter((item) => item !== null) as Array<{ id: string; name: string; address: string }>;
  }

  async countFavoritesByUserId(userId: string): Promise<number> {
    return await this.cngStationFavoriteModel.count({
      where: { userId },
    });
  }

  async create(
    userCngStationData: Partial<UserCngStation>,
  ): Promise<UserCngStation> {
    const userStation = await this.userCngStationModel.create(
      userCngStationData as any,
      { raw: true, returning: true },
    );
    return userStation.toJSON() as UserCngStation;
  }

  async update(
    id: string,
    userCngStationData: Partial<UserCngStation>,
  ): Promise<[number, UserCngStation[]]> {
    return await this.userCngStationModel.update(
      userCngStationData,
      {
        where: { id },
        returning: true,
      },
    );
  }

  async updateByUserIdAndId(
    userId: string,
    id: string,
    userCngStationData: Partial<UserCngStation>,
  ): Promise<[number, UserCngStation[]]> {
    return await this.userCngStationModel.update(
      userCngStationData,
      {
        where: {
          userId,
          id,
          selfTripStatus: {
            [Op.in]: ['START_TRIP', 'ONGOING_TRIP'],
          },
        },
        returning: true,
      },
    );
  }

  async updateByUserIdAndStationId(
    userId: string,
    cngStationId: string,
    userCngStationData: Partial<UserCngStation>,
  ): Promise<[number, UserCngStation[]]> {
    return await this.userCngStationModel.update(
      userCngStationData,
      {
        where: {
          userId,
          cngStationId,
        },
        returning: true,
      },
    );
  }

  async deleteByUserIdAndStationId(
    userId: string,
    cngStationId: string,
  ): Promise<number> {
    return await this.userCngStationModel.destroy({
      where: {
        userId,
        cngStationId,
      },
    });
  }
}

