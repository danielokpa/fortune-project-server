import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ChargingStation } from '../entities/charging-station.entity';
import { ChargingStationFavorite } from '../entities/charging-station-favorite.entity';
import { ChargingStationRepository } from '../repositories/charging-station.repository';
import {
  CreateChargingStationDto,
  UpdateChargingStationDto,
  FindNearbyStationsDto,
  FindChargingStationsDto,
  SearchChargingStationsDto,
} from '../dto/charging-station.dto';

@Injectable()
export class ChargingStationService {
  private readonly logger = new Logger(ChargingStationService.name);
  private readonly DEFAULT_IMAGE_URL = 'https://www.peppcruise.com/images/about/';

  constructor(
    private readonly chargingStationRepository: ChargingStationRepository,
    @InjectModel(ChargingStationFavorite)
    private readonly chargingStationFavoriteModel: typeof ChargingStationFavorite,
  ) {}

  /**
   * Add default image URL to station if not present
   */
  private addDefaultImage(station: ChargingStation): ChargingStation {
    const stationData = station.toJSON ? station.toJSON() : station;
    return {
      ...stationData,
      stationImage: this.DEFAULT_IMAGE_URL + stationData.stationImage,
    } as ChargingStation;
  }

  /**
   * Add default image URL to multiple stations
   */
  private addDefaultImages(stations: ChargingStation[]): ChargingStation[] {
    return stations.map((station) => this.addDefaultImage(station));
  }

  /**
   * Create a new charging station
   */
  async create(
    createDto: CreateChargingStationDto,
  ): Promise<ChargingStation> {
    try {
      const station = await this.chargingStationRepository.create({
        name: createDto.name,
        country: createDto.country,
        state: createDto.state,
        address: createDto.address,
        contactPhone: createDto.contactPhone,
        contactEmail: createDto.contactEmail,
        openingTime: createDto.openingTime,
        closingTime: createDto.closingTime,
        amountPerUnit: createDto.amountPerUnit,
        currency: createDto.currency || 'NGN',
        amountPerUnitType: createDto.amountPerUnitType || 'kwh',
        latitude: createDto.latitude,
        longitude: createDto.longitude,
        isActive: createDto.isActive !== undefined ? createDto.isActive : true,
      });

      this.logger.log(`Charging station created: ${station.id}`);
      return this.addDefaultImage(station);
    } catch (error) {
      this.logger.error(`Error creating charging station: ${error.message}`);
      throw new BadRequestException(
        `Failed to create charging station: ${error.message}`,
      );
    }
  }

  /**
   * Get all charging stations with optional filters
   * If latitude and longitude are provided, returns nearby stations
   */
  async findAll(
    findDto: FindChargingStationsDto,
    userId?: string,
  ): Promise<{
    stations: ChargingStation[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    try {
      // If coordinates are provided, use nearby search
      if (findDto.latitude && findDto.longitude) {
        return await this.findNearbyStations({
          latitude: findDto.latitude,
          longitude: findDto.longitude,
          radiusKm: findDto.radiusKm || 10,
          country: findDto.country,
          state: findDto.state,
          isActive: findDto.isActive,
          page: findDto.page,
          limit: findDto.limit,
          userId,
        });
      }

      // Otherwise, use regular filtered search
      const page = findDto.page || 1;
      const limit = findDto.limit || 10;
      const offset = (page - 1) * limit;

      const where: any = {};
      if (findDto.country) where.country = findDto.country;
      if (findDto.state) where.state = findDto.state;
      if (findDto.isActive !== undefined) where.isActive = findDto.isActive;

      const [stations, total] = await Promise.all([
        this.chargingStationRepository.findAll(
          {
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
          },
          userId,
        ),
        this.chargingStationRepository.count({ where }),
      ]);

      return {
        stations: this.addDefaultImages(stations),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      this.logger.error(`Error fetching charging stations: ${error.message}`);
      throw new BadRequestException(
        `Failed to fetch charging stations: ${error.message}`,
      );
    }
  }

  /**
   * Get active charging stations
   */
  async findActiveStations(
    options?: {
      page?: number;
      limit?: number;
      country?: string;
      state?: string;
    },
    userId?: string,
  ): Promise<{
    stations: ChargingStation[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    try {
      const page = options?.page || 1;
      const limit = options?.limit || 10;
      const offset = (page - 1) * limit;

      const [stations, total] = await Promise.all([
        this.chargingStationRepository.findActiveStations(
          {
            limit,
            offset,
            country: options?.country,
            state: options?.state,
          },
          userId,
        ),
        this.chargingStationRepository.count({
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
        `Error fetching active charging stations: ${error.message}`,
      );
      throw new BadRequestException(
        `Failed to fetch active charging stations: ${error.message}`,
      );
    }
  }

  /**
   * Find nearby charging stations based on coordinates
   */
  async findNearbyStations(
    findNearbyDto: FindNearbyStationsDto & {
      country?: string;
      state?: string;
      isActive?: boolean;
      page?: number;
      limit?: number;
      userId?: string;
    },
  ): Promise<{
    stations: ChargingStation[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    try {
      const {
        latitude,
        longitude,
        radiusKm = 10,
        page = 1,
        limit = 20,
        country,
        state,
        isActive,
        userId,
      } = findNearbyDto;

      if (!latitude || !longitude) {
        throw new BadRequestException(
          'Latitude and longitude are required for nearby search',
        );
      }

      const offset = (page - 1) * limit;

      const { stations, total } = await this.chargingStationRepository.findNearbyStations(
        latitude,
        longitude,
        radiusKm,
        {
          limit,
          offset,
          country,
          state,
          isActive,
          userId,
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
        `Error finding nearby charging stations: ${error.message}`,
      );
      throw new BadRequestException(
        `Failed to find nearby charging stations: ${error.message}`,
      );
    }
  }

  /**
   * Get a charging station by ID
   */
  async findById(id: string, userId?: string): Promise<ChargingStation> {
    try {
      const station = await this.chargingStationRepository.findById(id, userId);
      if (!station) {
        throw new NotFoundException(`Charging station with ID ${id} not found`);
      }
      return this.addDefaultImage(station);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Error fetching charging station by ID: ${error.message}`,
      );
      throw new BadRequestException(
        `Failed to fetch charging station: ${error.message}`,
      );
    }
  }

  /**
   * Update a charging station
   */
  async update(
    id: string,
    updateDto: UpdateChargingStationDto,
  ): Promise<ChargingStation> {
    try {
      // Verify station exists
      await this.findById(id);

      const [affectedCount, updatedStations] =
        await this.chargingStationRepository.update(id, updateDto);

      if (affectedCount === 0) {
        throw new NotFoundException(`Charging station with ID ${id} not found`);
      }

      this.logger.log(`Charging station updated: ${id}`);
      return this.addDefaultImage(updatedStations[0]);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Error updating charging station: ${error.message}`);
      throw new BadRequestException(
        `Failed to update charging station: ${error.message}`,
      );
    }
  }

  /**
   * Delete a charging station (soft delete)
   */
  async delete(id: string): Promise<void> {
    try {
      // Verify station exists
      await this.findById(id);

      const deletedCount = await this.chargingStationRepository.delete(id);
      if (deletedCount === 0) {
        throw new NotFoundException(`Charging station with ID ${id} not found`);
      }

      this.logger.log(`Charging station deleted: ${id}`);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Error deleting charging station: ${error.message}`);
      throw new BadRequestException(
        `Failed to delete charging station: ${error.message}`,
      );
    }
  }

  /**
   * Search charging stations by name or address
   * Optionally order by nearest if coordinates are provided
   * Returns only id and name fields
   */
  async search(
    searchDto: SearchChargingStationsDto,
    userId?: string,
  ): Promise<{
    stations: Array<{ id: string; name: string; address: string }>;
    total: number;
    limit: number;
    offset: number;
    totalPages: number;
  }> {
    try {
      const limit = searchDto.limit || 20;
      const offset = searchDto.offset || 0;

      const { stations, total } = await this.chargingStationRepository.search(
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
      this.logger.error(`Error searching charging stations: ${error.message}`);
      throw new BadRequestException(
        `Failed to search charging stations: ${error.message}`,
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
  ): Promise<{ isFavorite: boolean; message: string }> {
    try {
      // Verify station exists
      const station = await this.chargingStationRepository.findById(stationId);
      if (!station) {
        throw new NotFoundException(
          `Charging station with ID ${stationId} not found`,
        );
      }

      // Check if favorite already exists
      const existingFavorite = await this.chargingStationFavoriteModel.findOne({
        where: {
          stationId,
          userId,
        },
      });

      if (existingFavorite) {
        // Delete favorite (unfavorite)
        await existingFavorite.destroy();
        this.logger.log(
          `Favorite removed: User ${userId} unfavorited station ${stationId}`,
        );
        return {
          isFavorite: false,
          message: 'Station removed from favorites',
        };
      } else {
        // Create favorite
        await this.chargingStationFavoriteModel.create({
          stationId,
          userId,
        } as any);
        this.logger.log(
          `Favorite added: User ${userId} favorited station ${stationId}`,
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
      this.logger.error(`Error toggling favorite: ${error.message}`);
      throw new BadRequestException(
        `Failed to toggle favorite: ${error.message}`,
      );
    }
  }
}

