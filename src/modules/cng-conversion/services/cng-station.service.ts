import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CngStation } from '../entities/cng-station.entity';
import { CngStationRepository } from '../repositories/cng-station.repository';
import { FindCngStationsDto } from '../dto/cng-station.dto';

@Injectable()
export class CngStationService {
  private readonly logger = new Logger(CngStationService.name);

  constructor(
    private readonly cngStationRepository: CngStationRepository,
  ) {}

  /**
   * Get all CNG stations with optional filters
   */
  async findAll(
    options?: {
      page?: number;
      limit?: number;
      country?: string;
      state?: string;
      isActive?: boolean;
    },
    userId?: string,
  ): Promise<{
    stations: CngStation[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
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
            order: [['rating', 'DESC'], ['reviews', 'DESC'], ['createdAt', 'DESC']],
          },
          userId,
        ),
        this.cngStationRepository.count({ where }),
      ]);

      // Add default image URL to stations
      const stationsWithImages = stations.map((station) => {
        const stationData = station.toJSON ? station.toJSON() : station;
        return {
          ...stationData,
          stationImage: (stationData as any).stationImage || 'https://www.peppcruise.com/images/about/',
        };
      });

      return {
        stations: stationsWithImages as any,
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
    options?: {
      page?: number;
      limit?: number;
      country?: string;
      state?: string;
    },
    userId?: string,
  ): Promise<{
    stations: CngStation[];
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

      // Add default image URL to stations
      const stationsWithImages = stations.map((station) => {
        const stationData = station.toJSON ? station.toJSON() : station;
        return {
          ...stationData,
          stationImage: (stationData as any).stationImage || 'https://www.peppcruise.com/images/about/',
        };
      });

      return {
        stations: stationsWithImages as any,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      this.logger.error(`Error fetching active CNG stations: ${error.message}`);
      throw new BadRequestException(
        `Failed to fetch active CNG stations: ${error.message}`,
      );
    }
  }

  /**
   * Get a CNG station by ID
   */
  async findById(id: string, userId?: string): Promise<CngStation> {
    const station = await this.cngStationRepository.findById(id, userId);
    if (!station) {
      throw new NotFoundException(`CNG station with ID ${id} not found`);
    }
    // Add default image URL
    const stationData = station.toJSON ? station.toJSON() : station;
    return {
      ...stationData,
      stationImage: (stationData as any).stationImage || 'https://www.peppcruise.com/images/about/',
    } as any;
  }

  /**
   * Find nearby CNG stations
   */
  async findNearbyStations(
    findNearbyDto: FindCngStationsDto & { userId?: string },
  ): Promise<{
    stations: CngStation[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    try {
      const page = findNearbyDto.page || 1;
      const limit = findNearbyDto.limit || 10;
      const offset = (page - 1) * limit;
      const radiusKm = findNearbyDto.radiusKm || 10;

      const { stations, total } = await this.cngStationRepository.findNearbyStations(
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

      // Add default image URL to stations
      const stationsWithImages = stations.map((station) => {
        const stationData = station.toJSON ? station.toJSON() : station;
        return {
          ...stationData,
          stationImage: (stationData as any).stationImage || 'https://www.peppcruise.com/images/about/',
        };
      });

      return {
        stations: stationsWithImages as any,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      this.logger.error(`Error finding nearby CNG stations: ${error.message}`);
      throw new BadRequestException(
        `Failed to find nearby CNG stations: ${error.message}`,
      );
    }
  }
}

