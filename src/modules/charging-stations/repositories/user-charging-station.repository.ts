import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserChargingStation } from '../entities/user-charging-station.entity';
import { ChargingStationFavorite } from '../entities/charging-station-favorite.entity';
import { ChargingStation } from '../entities/charging-station.entity';
import { Op } from 'sequelize';
import { SelfTripStatus } from 'src/enums/self-trip-status.enum';

@Injectable()
export class UserChargingStationRepository {
  constructor(
    @InjectModel(UserChargingStation)
    private readonly userChargingStationModel: typeof UserChargingStation,
    @InjectModel(ChargingStationFavorite)
    private readonly chargingStationFavoriteModel: typeof ChargingStationFavorite,
  ) {}

  async count(options?: any): Promise<number> {
    const count = await this.userChargingStationModel.count(options);
    return typeof count === 'number' ? count : (count as any).length || 0;
  }

  async findById(id: string): Promise<UserChargingStation | null> {
    return await this.userChargingStationModel.findByPk(id, {
      include: ['chargingStation', 'user'],
    });
  }

  async findByUserIdAndStationId(
    userId: string,
    chargingStationId: string,
  ): Promise<UserChargingStation | null> {
    return await this.userChargingStationModel.findOne({
      where: {
        userId,
        chargingStationId,
      },
      include: ['chargingStation'],
    });
  }

  async findByUserIdSelfTripStatusAndStationId(
    userId: string,
    selfTripStatus: SelfTripStatus,
    chargingStationId: string,
  ): Promise<UserChargingStation | null> {
    return await this.userChargingStationModel.findOne({
      where: {
        userId,
        chargingStationId,
        selfTripStatus,
      },
      include: ['chargingStation'],
    });
  }

  async findActiveTripByUserIdAndUserStationId(
    userId: string,
    id: string,
  ): Promise<UserChargingStation | null> {
    return await this.userChargingStationModel.findOne({
      where: {
        userId,
        id,
        selfTripStatus: {
          [Op.in]: ['START_TRIP', 'ONGOING_TRIP'],
        },
      },
      include: ['chargingStation'],
    });
  }

  async findActiveTripByUserId(
    userId: string,
  ): Promise<UserChargingStation | null> {
    return await this.userChargingStationModel.findOne({
      where: {
        userId,
        selfTripStatus: {
          [Op.in]: ['START_TRIP', 'ONGOING_TRIP'],
        },
      },
      attributes: ['id', 'selfTripStatus'],
      include: [
        {
          model: ChargingStation,
          as: 'chargingStation',
          attributes: ['id', 'name', 'address'],
        },
      ],
      order: [['updatedAt', 'DESC']],
    });
  }

  async findAll(options?: {
    where?: any;
    limit?: number;
    offset?: number;
    order?: any[];
    include?: any[];
  }): Promise<UserChargingStation[]> {
    return await this.userChargingStationModel.findAll(options || {});
  }

  async findByUserId(
    userId: string,
    options?: {
      limit?: number;
      offset?: number;
      isFavorite?: boolean;
    },
  ): Promise<UserChargingStation[]> {
    const where: any = { userId };

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

  async findRecentByUserId(
    userId: string,
    options?: {
      limit?: number;
      offset?: number;
    },
  ): Promise<Array<{ id: string; name: string; address: string }>> {
    const recentStations = await this.userChargingStationModel.findAll({
      where: { userId },
      include: [
        {
          model: ChargingStation,
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
        const station = (recentData as any).chargingStation;
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
    const favorites = await this.chargingStationFavoriteModel.findAll({
      where: { userId },
      include: [
        {
          model: ChargingStation,
          as: 'chargingStation',
          attributes: ['id', 'name', 'address'],
        },
      ],
      limit: options?.limit,
      offset: options?.offset,
      order: [['createdAt', 'DESC']],
    });

    console.log(userId)

    return favorites
      .map((favorite) => {
        const favoriteData = favorite.get ? favorite.get({ plain: true }) : (favorite.toJSON ? favorite.toJSON() : favorite);
        const station = (favoriteData as any).chargingStation;
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
    return await this.chargingStationFavoriteModel.count({
      where: { userId },
    });
  }

  async create(
    userChargingStationData: Partial<UserChargingStation>,
  ): Promise<UserChargingStation> {
    const userStation = await this.userChargingStationModel.create(
      userChargingStationData as any,
      { raw: true, returning: true },
    );
    return userStation.toJSON() as UserChargingStation;
  }

  async update(
    id: string,
    userChargingStationData: Partial<UserChargingStation>,
  ): Promise<[number, UserChargingStation[]]> {
    return await this.userChargingStationModel.update(
      userChargingStationData,
      {
        where: { id },
        returning: true,
      },
    );
  }

  async updateByUserIdAndStationId(
    userId: string,
    chargingStationId: string,
    userChargingStationData: Partial<UserChargingStation>,
  ): Promise<[number, UserChargingStation[]]> {
    return await this.userChargingStationModel.update(
      userChargingStationData,
      {
        where: {
          userId,
          chargingStationId,
        },
        returning: true,
      },
    );
  }

  async updateByUserIdAndId(
    userId: string,
    id: string,
    userChargingStationData: Partial<UserChargingStation>,
  ): Promise<[number, UserChargingStation[]]> {
    return await this.userChargingStationModel.update(
      userChargingStationData,
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

  async delete(id: string): Promise<number> {
    return await this.userChargingStationModel.destroy({
      where: { id },
    });
  }

  async deleteByUserIdAndStationId(
    userId: string,
    chargingStationId: string,
  ): Promise<number> {
    return await this.userChargingStationModel.destroy({
      where: {
        userId,
        chargingStationId,
      },
    });
  }
}





