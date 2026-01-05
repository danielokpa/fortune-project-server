import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CngStation } from '../entities/cng-station.entity';
import { CngStationFavorite } from '../entities/cng-station-favorite.entity';
import { CngStationRepository } from '../repositories/cng-station.repository';
import {
  FindCngStationsDto,
  SearchCngStationsDto,
  FindCngStationsQueryDto,
} from '../dto/cng-station.dto';
import {
  ICngStation,
  IStationsListResponse,
  IStationsSearchResponse,
  IToggleFavoriteResponse,
} from '../interfaces/cng-station.interface';

@Injectable()
export class CngStationsService {
  private readonly logger = new Logger(CngStationsService.name);
  private readonly DEFAULT_IMAGE_URL = 'https://www.peppcruise.com/images/about/';

  constructor(
    private readonly cngStationRepository: CngStationRepository,
    @InjectModel(CngStationFavorite)
    private readonly cngStationFavoriteModel: typeof CngStationFavorite,
  ) {}

  /**
   * Add default image URL to station if not present
   */
  private addDefaultImage(station: CngStation): ICngStation {
    const stationData = station.toJSON ? station.toJSON() : station;
    return {
      ...(stationData as any),
      stationImage:
        (stationData as any).stationImage || this.DEFAULT_IMAGE_URL,
    } as ICngStation;
  }

  /**
   * Add default image URL to multiple stations
   */
  private addDefaultImages(stations: CngStation[]): ICngStation[] {
    return stations.map((station) => this.addDefaultImage(station));
  }

  /**
   * Get all CNG stations with optional filters
   */
  async findAll(
    options?: FindCngStationsQueryDto,
    userId?: string,
  ): Promise<IStationsListResponse> {
    try {
      const page = options?.page || 1;
      const limit = options?.limit || 10;
      const offset = (page - 1) * limit;

      const where: any = {};
      if (options?.country) where.country = options.country;
      if (options?.state) where.state = options.state;
      if (options?.isActive !== undefined)
        where.isActive = options.isActive;

      const [stations, total] = await Promise.all([
        this.cngStationRepository.findAll(
          {
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
          },
          userId,
        ),
        this.cngStationRepository.count({ where }),
      ]);

      return {
        stations: this.addDefaultImages(stations),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      this.logger.error(`Error fetching CNG stations: ${error.message}`);
      throw new BadRequestException(
        `Failed to fetch CNG stations: ${error.message}`,
      );
    }
  }

  /**
   * Get all active CNG stations with optional filters
   */
  async findActiveStations(
    options?: FindCngStationsQueryDto,
    userId?: string,
  ): Promise<IStationsListResponse> {
    try {
      const page = options?.page || 1;
      const limit = options?.limit || 10;
      const offset = (page - 1) * limit;

      const [stations, total] = await Promise.all([
        this.cngStationRepository.findActiveStations(
          {
            ...options,
            limit,
            offset,
          },
          userId,
        ),
        this.cngStationRepository.count({
          where: {
            isActive: true,
            ...(options?.country && { country: options.country }),
            ...(options?.state && { state: options.state }),
          },
        }),
      ]);

      return {
        stations: this.addDefaultImages(stations),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      this.logger.error(
        `Error fetching active CNG stations: ${error.message}`,
      );
      throw new BadRequestException(
        `Failed to fetch active CNG stations: ${error.message}`,
      );
    }
  }

  /**
   * Find nearby CNG stations based on coordinates
   */
  async findNearbyStations(
    findNearbyDto: FindCngStationsDto & {
      country?: string;
      state?: string;
      isActive?: boolean;
      page?: number;
      limit?: number;
      userId?: string;
    },
  ): Promise<IStationsListResponse> {
    try {
      const page = findNearbyDto.page || 1;
      const limit = findNearbyDto.limit || 10;
      const offset = (page - 1) * limit;
      const radiusKm = findNearbyDto.radiusKm || 10;

      const { stations, total } =
        await this.cngStationRepository.findNearbyStations(
          findNearbyDto.latitude,
          findNearbyDto.longitude,
          radiusKm,
          {
            limit,
            offset,
            country: findNearbyDto.country,
            state: findNearbyDto.state,
            userId: findNearbyDto.userId,
          },
        );

      return {
        stations: this.addDefaultImages(stations),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      this.logger.error(
        `Error finding nearby CNG stations: ${error.message}`,
      );
      throw new BadRequestException(
        `Failed to find nearby CNG stations: ${error.message}`,
      );
    }
  }

  /**
   * Get a CNG station by ID
   */
  async findById(id: string, userId?: string): Promise<ICngStation> {
    try {
      const station = await this.cngStationRepository.findById(id, userId);
      if (!station) {
        throw new NotFoundException(`CNG station with ID ${id} not found`);
      }
      return this.addDefaultImage(station);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Error fetching CNG station by ID: ${error.message}`,
      );
      throw new BadRequestException(
        `Failed to fetch CNG station: ${error.message}`,
      );
    }
  }

  /**
   * Search CNG stations by name or address
   * Optionally order by nearest if coordinates are provided
   * Returns only id, name, and address fields
   */
  async search(
    searchDto: SearchCngStationsDto,
    userId?: string,
  ): Promise<IStationsSearchResponse> {
    try {
      const limit = searchDto.limit || 20;
      const offset = searchDto.offset || 0;

      const { stations, total } = await this.cngStationRepository.search(
        searchDto.query,
        {
          limit,
          offset,
          latitude: searchDto.latitude,
          longitude: searchDto.longitude,
          radiusKm: searchDto.radiusKm,
          userId,
        },
      );

      return {
        stations,
        total,
        limit,
        offset,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      this.logger.error(`Error searching CNG stations: ${error.message}`);
      throw new BadRequestException(
        `Failed to search CNG stations: ${error.message}`,
      );
    }
  }

  /**
   * Toggle favorite status using the favorites table
   * If favorite exists, delete it (unfavorite)
   * If favorite doesn't exist, create it (favorite)
   */
  async toggleFavorite(
    userId: string,
    stationId: string,
  ): Promise<IToggleFavoriteResponse> {
    try {
      // Verify station exists
      const station = await this.cngStationRepository.findById(stationId);
      if (!station) {
        throw new NotFoundException(
          `CNG station with ID ${stationId} not found`,
        );
      }

      // Check if favorite already exists
      const existingFavorite = await this.cngStationFavoriteModel.findOne({
        where: {
          stationId,
          userId,
        },
      });

      if (existingFavorite) {
        // Delete favorite (unfavorite)
        await existingFavorite.destroy();
        this.logger.log(
          `Favorite removed: User ${userId} unfavorited CNG station ${stationId}`,
        );
        return {
          isFavorite: false,
          message: 'Station removed from favorites',
        };
      } else {
        // Create favorite
        await this.cngStationFavoriteModel.create({
          stationId,
          userId,
        } as any);
        this.logger.log(
          `Favorite added: User ${userId} favorited CNG station ${stationId}`,
        );
        return {
          isFavorite: true,
          message: 'Station added to favorites',
        };
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Error toggling CNG favorite: ${error.message}`);
      throw new BadRequestException(
        `Failed to toggle favorite: ${error.message}`,
      );
    }
  }
}

