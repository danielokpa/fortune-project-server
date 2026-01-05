import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
  ConflictException,
} from '@nestjs/common';
import { UserCngStation } from '../entities/user-cng-station.entity';
import { UserCngStationRepository } from '../repositories/user-cng-station.repository';
import { CngStationRepository } from '../repositories/cng-station.repository';
import {
  StartCngTripDto,
  EndCngTripDto,
  CancelCngTripDto,
} from '../dto/cng-station.dto';
import { SelfTripStatus } from '../../../enums/self-trip-status.enum';
import {
  IRecentStationsResponse,
  IFavoriteStationsResponse,
} from '../interfaces/cng-station.interface';

@Injectable()
export class UserCngStationService {
  private readonly logger = new Logger(UserCngStationService.name);

  constructor(
    private readonly userCngStationRepository: UserCngStationRepository,
    private readonly cngStationRepository: CngStationRepository,
  ) {}

  /**
   * Get user's recent CNG stations with station data
   */
  async getRecentStations(
    userId: string,
    options?: {
      page?: number;
      limit?: number;
    },
  ): Promise<IRecentStationsResponse> {
    try {
      const page = options?.page || 1;
      const limit = options?.limit || 10;
      const offset = (page - 1) * limit;

      const [stations, total, activeTripRecord] = await Promise.all([
        this.userCngStationRepository.findRecentByUserId(userId, {
          limit,
          offset,
        }),
        this.userCngStationRepository.count({ where: { userId } }),
        this.userCngStationRepository.findActiveTripByUserId(userId),
      ]);

      let activeTrip: {
        id: string;
        name: string;
        address: string;
        status: string;
      } | null = null;
      if (activeTripRecord) {
        const tripData = activeTripRecord.get
          ? activeTripRecord.get({ plain: true })
          : (activeTripRecord.toJSON ? activeTripRecord.toJSON() : activeTripRecord);
        const station = (tripData as any).cngStation;
        // Get status - try from model instance first, then from plain data
        const tripStatus = activeTripRecord.selfTripStatus 
          ? String(activeTripRecord.selfTripStatus)
          : String((tripData as any).selfTripStatus || '');
        // Use user_cng_stations record ID, not station ID
        const recordId = activeTripRecord.id || (tripData as any).id;
        if (station && recordId) {
          activeTrip = {
            id: String(recordId),
            name: String(station.name || ''),
            address: String(station.address || ''),
            status: tripStatus,
          };
        }
      }

      return {
        stations,
        activeTrip,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      this.logger.error(
        `Error fetching recent CNG stations: ${error.message}`,
      );
      throw new BadRequestException(
        `Failed to fetch recent stations: ${error.message}`,
      );
    }
  }

  /**
   * Remove station from recent
   */
  async removeFromRecent(
    userId: string,
    cngStationId: string,
  ): Promise<{ message: string }> {
    try {
      const deleted = await this.userCngStationRepository.deleteByUserIdAndStationId(
        userId,
        cngStationId,
      );

      if (deleted === 0) {
        throw new NotFoundException(
          'Station not found in recent list',
        );
      }

      this.logger.log(
        `Station ${cngStationId} removed from recent for user ${userId}`,
      );
      return { message: 'Station removed from recent successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Error removing station from recent: ${error.message}`,
      );
      throw new BadRequestException(
        `Failed to remove station from recent: ${error.message}`,
      );
    }
  }

  /**
   * Get user's favorite CNG stations from favorites table
   * Returns only id, name, and address with active trip
   */
  async getUserFavoriteStations(
    userId: string,
    options?: {
      page?: number;
      limit?: number;
    },
  ): Promise<IFavoriteStationsResponse> {
    try {
      const page = options?.page || 1;
      const limit = options?.limit || 10;
      const offset = (page - 1) * limit;

      const [stations, activeTripRecord] = await Promise.all([
        this.userCngStationRepository.findFavoritesByUserId(userId, {
          limit,
          offset,
        }),
        this.userCngStationRepository.findActiveTripByUserId(userId),
      ]);

      // Get total count of favorites from favorites table
      const total = await this.userCngStationRepository.countFavoritesByUserId(userId);

      let activeTrip: {
        id: string;
        name: string;
        address: string;
        status: string;
      } | null = null;
      if (activeTripRecord) {
        const tripData = activeTripRecord.get
          ? activeTripRecord.get({ plain: true })
          : (activeTripRecord.toJSON ? activeTripRecord.toJSON() : activeTripRecord);
        const station = (tripData as any).cngStation;
        // Get status - try from model instance first, then from plain data
        const tripStatus = activeTripRecord.selfTripStatus 
          ? String(activeTripRecord.selfTripStatus)
          : String((tripData as any).selfTripStatus || '');
        // Use user_cng_stations record ID, not station ID
        const recordId = activeTripRecord.id || (tripData as any).id;
        if (station && recordId) {
          activeTrip = {
            id: String(recordId),
            name: String(station.name || ''),
            address: String(station.address || ''),
            status: tripStatus,
          };
        }
      }

      return {
        stations,
        activeTrip,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      this.logger.error(
        `Error fetching user favorite CNG stations: ${error.message}`,
      );
      throw new BadRequestException(
        `Failed to fetch favorite stations: ${error.message}`,
      );
    }
  }

  /**
   * Start trip - Create record in user_cng_stations and set status to START_TRIP
   */
  async startTrip(
    userId: string,
    startTripDto: StartCngTripDto,
  ): Promise<UserCngStation> {
    try {
      // Verify station exists
      const station = await this.cngStationRepository.findById(
        startTripDto.id,
      );
      if (!station) {
        throw new NotFoundException(
          `CNG station with ID ${startTripDto.id} not found`,
        );
      }

      // Check if record already exists
      const existingRecord =
        await this.userCngStationRepository.findByUserIdSelfTripStatusAndStationId(
          userId,
          SelfTripStatus.START_TRIP,
          startTripDto.id,
        );

      if (existingRecord) {
        throw new ConflictException(
          'Trip already started for this station',
        );
      }
      
      // Create new record
      const userStation = await this.userCngStationRepository.create({
        userId,
        cngStationId: startTripDto.id,
        selfTripStatus: SelfTripStatus.START_TRIP,
        latitude: startTripDto.latitude,
        longitude: startTripDto.longitude,
        distance: this.calculateDistance(startTripDto.latitude || 0, startTripDto.longitude || 0, station.latitude || 0, station.longitude || 0),
      });

      return userStation;

    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
      }
      this.logger.error(`Error starting CNG trip: ${error.message}`);
      throw new BadRequestException(
        `Failed to start trip: ${error.message}`,
      );
    }
  }

  /**
   * End trip - Update trip status to END_TRIP
   */
  async endTrip(
    userId: string,
    endTripDto: EndCngTripDto,
  ): Promise<UserCngStation> {
    try {
      const userStation =
        await this.userCngStationRepository.findActiveTripByUserIdAndUserStationId(
          userId,
          endTripDto.id,
        );

      if (!userStation) {
        throw new NotFoundException(
          'Active trip not found. Please start a trip first.',
        );
      }

      const [affectedCount, updatedRecords] =
        await this.userCngStationRepository.updateByUserIdAndId(
          userId,
          endTripDto.id,
          {
            selfTripStatus: SelfTripStatus.END_TRIP,
          },
        );

      if (affectedCount === 0) {
        throw new NotFoundException('Active trip not found');
      }

      this.logger.log(
        `Trip ended: User ${userId} ended trip to CNG station ${endTripDto.id}`,
      );
      return updatedRecords[0];
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Error ending CNG trip: ${error.message}`);
      throw new BadRequestException(`Failed to end trip: ${error.message}`);
    }
  }

  /**
   * Cancel trip - Update trip status to CANCEL
   */
  async cancelTrip(
    userId: string,
    cancelTripDto: CancelCngTripDto,
  ): Promise<void> {
    try {
      const userStation =
        await this.userCngStationRepository.findActiveTripByUserIdAndUserStationId(
          userId,
          cancelTripDto.id,
        );

      if (!userStation) {
        throw new NotFoundException(
          'No active trip found to cancel',
        );
      }

      // Since findActiveTripByUserIdAndUserStationId already filters for active trips,
      // we can directly update it to CANCEL
      const [affectedCount] =
        await this.userCngStationRepository.updateByUserIdAndId(
          userId,
          cancelTripDto.id,
          {
            selfTripStatus: SelfTripStatus.CANCEL,
          },
        );

      if (affectedCount === 0) {
        throw new NotFoundException('Active trip not found or could not be updated');
      }

      this.logger.log(
        `Trip cancelled: User ${userId} cancelled CNG trip with record ID ${cancelTripDto.id}`,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Error cancelling CNG trip: ${error.message}`);
      throw new BadRequestException(
        `Failed to cancel trip: ${error.message}`,
      );
    }
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
    return Math.round((R * c) * 100) / 100; // Round to 2 decimal places
  }

  private toRad(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }
}

