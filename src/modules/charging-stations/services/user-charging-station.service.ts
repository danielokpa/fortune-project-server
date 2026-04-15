import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
  ConflictException,
} from '@nestjs/common';
import { UserChargingStation } from '../entities/user-charging-station.entity';
import { UserChargingStationRepository } from '../repositories/user-charging-station.repository';
import { ChargingStationRepository } from '../repositories/charging-station.repository';
import {
  AddUserChargingStationDto,
  UpdateUserChargingStationDto,
  StartTripDto,
  EndTripDto,
  CancelTripDto,
} from '../dto/charging-station.dto';
import { SelfTripStatus } from '../../../enums/self-trip-status.enum';

@Injectable()
export class UserChargingStationService {
  private readonly logger = new Logger(UserChargingStationService.name);

  constructor(
    private readonly userChargingStationRepository: UserChargingStationRepository,
    private readonly chargingStationRepository: ChargingStationRepository,
  ) {}

  /**
   * Add a charging station to user's list
   */
  async addUserChargingStation(
    userId: string,
    addDto: AddUserChargingStationDto,
  ): Promise<UserChargingStation> {
    try {
      // Verify charging station exists
      const station = await this.chargingStationRepository.findById(
        addDto.chargingStationId,
      );
      if (!station) {
        throw new NotFoundException(
          `Charging station with ID ${addDto.chargingStationId} not found`,
        );
      }

      // Check if already exists
      const existing = await this.userChargingStationRepository.findByUserIdAndStationId(
        userId,
        addDto.chargingStationId,
      );

      if (existing) {
        throw new ConflictException(
          'Charging station already added to user list',
        );
      }

      // Calculate distance if coordinates provided
      let distance: number | undefined;
      if (
        addDto.latitude &&
        addDto.longitude &&
        station.latitude &&
        station.longitude
      ) {
        distance = this.calculateDistance(
          addDto.latitude,
          addDto.longitude,
          station.latitude,
          station.longitude,
        );
      }

      const userStation = await this.userChargingStationRepository.create({
        userId,
        chargingStationId: addDto.chargingStationId,
        latitude: addDto.latitude,
        longitude: addDto.longitude,
        distance,
      });

      this.logger.log(
        `Charging station ${addDto.chargingStationId} added to user ${userId}`,
      );
      return userStation;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      this.logger.error(
        `Error adding user charging station: ${error.message}`,
      );
      throw new BadRequestException(
        `Failed to add charging station: ${error.message}`,
      );
    }
  }

  /**
   * Get all charging stations for a user
   */
  async getUserChargingStations(
    userId: string,
    options?: {
      page?: number;
      limit?: number;
      isFavorite?: boolean;
    },
  ): Promise<{
    stations: UserChargingStation[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    try {
      const page = options?.page || 1;
      const limit = options?.limit || 10;
      const offset = (page - 1) * limit;

      const where: any = { userId };
      if (options?.isFavorite !== undefined) {
        where.isFavorite = options.isFavorite;
      }

      const [stations, total] = await Promise.all([
        this.userChargingStationRepository.findByUserId(userId, {
          limit,
          offset,
          isFavorite: options?.isFavorite,
        }),
        this.userChargingStationRepository.count({ where }),
      ]);

      return {
        stations,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      this.logger.error(
        `Error fetching user charging stations: ${error.message}`,
      );
      throw new BadRequestException(
        `Failed to fetch user charging stations: ${error.message}`,
      );
    }
  }

  /**
   * Get user's favorite charging stations from favorites table
   * Returns only id, name, and address with active trip
   */
  async getUserFavoriteStations(
    userId: string,
    options?: {
      page?: number;
      limit?: number;
    },
  ): Promise<{
    stations: Array<{ id: string; name: string; address: string }>;
    activeTrip: {
      id: string;
      name: string;
      address: string;
      status: string;
    } | null;
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    try {
      const page = options?.page || 1;
      const limit = options?.limit || 10;
      const offset = (page - 1) * limit;

      const [stations, activeTripRecord] = await Promise.all([
        this.userChargingStationRepository.findFavoritesByUserId(userId, {
          limit,
          offset,
        }),
        this.userChargingStationRepository.findActiveTripByUserId(userId),
      ]);

      // Get total count of favorites from favorites table
      const total = await this.userChargingStationRepository.countFavoritesByUserId(userId);

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
        const station = (tripData as any).chargingStation;
        // Get status - try from model instance first, then from plain data
        const tripStatus = activeTripRecord.selfTripStatus 
          ? String(activeTripRecord.selfTripStatus)
          : String((tripData as any).selfTripStatus || '');
        // Use user_charging_stations record ID, not station ID
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
        `Error fetching user favorite stations: ${error.message}`,
      );
      throw new BadRequestException(
        `Failed to fetch favorite stations: ${error.message}`,
      );
    }
  }

  /**
   * Update user charging station
   */
  async updateUserChargingStation(
    userId: string,
    chargingStationId: string,
    updateDto: UpdateUserChargingStationDto,
  ): Promise<UserChargingStation> {
    try {
      const userStation =
        await this.userChargingStationRepository.findByUserIdAndStationId(
          userId,
          chargingStationId,
        );

      if (!userStation) {
        throw new NotFoundException(
          'Charging station not found in user list',
        );
      }

      // If coordinates are updated, recalculate distance
      let distance = userStation.distance;
      if (
        updateDto.latitude &&
        updateDto.longitude &&
        userStation.chargingStation?.latitude &&
        userStation.chargingStation?.longitude
      ) {
        distance = this.calculateDistance(
          updateDto.latitude,
          updateDto.longitude,
          userStation.chargingStation.latitude,
          userStation.chargingStation.longitude,
        );
      }

      const [affectedCount, updatedStations] =
        await this.userChargingStationRepository.updateByUserIdAndStationId(
          userId,
          chargingStationId,
          {
            ...updateDto,
            distance,
          },
        );

      if (affectedCount === 0) {
        throw new NotFoundException(
          'Charging station not found in user list',
        );
      }

      this.logger.log(
        `User charging station updated: ${userId} - ${chargingStationId}`,
      );
      return updatedStations[0];
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Error updating user charging station: ${error.message}`,
      );
      throw new BadRequestException(
        `Failed to update user charging station: ${error.message}`,
      );
    }
  }

  /**
   * Remove charging station from user's list
   */
  async removeUserChargingStation(
    userId: string,
    chargingStationId: string,
  ): Promise<void> {
    try {
      const deletedCount =
        await this.userChargingStationRepository.deleteByUserIdAndStationId(
          userId,
          chargingStationId,
        );

      if (deletedCount === 0) {
        throw new NotFoundException(
          'Charging station not found in user list',
        );
      }

      this.logger.log(
        `Charging station ${chargingStationId} removed from user ${userId}`,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Error removing user charging station: ${error.message}`,
      );
      throw new BadRequestException(
        `Failed to remove charging station: ${error.message}`,
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

  /**
   * Get user's recent charging stations with station data
   */
  async getRecentStations(
    userId: string,
    options?: {
      page?: number;
      limit?: number;
    },
  ): Promise<{
    stations: Array<{ id: string; name: string; address: string }>;
    activeTrip: {
      id: string;
      name: string;
      address: string;
      status: string;
    } | null;
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    try {
      const page = options?.page || 1;
      const limit = options?.limit || 10;
      const offset = (page - 1) * limit;

      const [stations, total, activeTripRecord] = await Promise.all([
        this.userChargingStationRepository.findRecentByUserId(userId, {
          limit,
          offset,
        }),
        this.userChargingStationRepository.count({ where: { userId } }),
        this.userChargingStationRepository.findActiveTripByUserId(userId),
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
        const station = (tripData as any).chargingStation;
        // Get status - try from model instance first, then from plain data
        const tripStatus = activeTripRecord.selfTripStatus 
          ? String(activeTripRecord.selfTripStatus)
          : String((tripData as any).selfTripStatus || '');
        // Use user_charging_stations record ID, not station ID
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
        `Error fetching recent stations: ${error.message}`,
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
    chargingStationId: string,
  ): Promise<{ message: string }> {
    try {
      const deleted = await this.userChargingStationRepository.deleteByUserIdAndStationId(
        userId,
        chargingStationId,
      );

      if (deleted === 0) {
        throw new NotFoundException(
          'Station not found in recent list',
        );
      }

      this.logger.log(
        `Station ${chargingStationId} removed from recent for user ${userId}`,
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
   * Start trip - Create record in user_charging_stations and set status to START_TRIP
   */
  async startTrip(
    userId: string,
    startTripDto: StartTripDto,
  ): Promise<UserChargingStation> {
    try {
      // Verify station exists
      const station = await this.chargingStationRepository.findById(
        startTripDto.id,
      );
      if (!station) {
        throw new NotFoundException(
          `Charging station with ID ${startTripDto.id} not found`,
        );
      }

      // Check if record already exists
      const existingRecord =
        await this.userChargingStationRepository.findByUserIdSelfTripStatusAndStationId(
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
        const userStation = await this.userChargingStationRepository.create({
          userId,
          chargingStationId: startTripDto.id,
          selfTripStatus: SelfTripStatus.START_TRIP,
          latitude: startTripDto.latitude,
          longitude: startTripDto.longitude,
          distance: this.calculateDistance(startTripDto.latitude || 0, startTripDto.longitude || 0, station.latitude || 0, station.longitude || 0),
        });

        return userStation;

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Error starting trip: ${error.message}`);
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
    endTripDto: EndTripDto,
  ): Promise<UserChargingStation> {
    try {
      const userStation =
        await this.userChargingStationRepository.findActiveTripByUserIdAndUserStationId(
          userId,
          endTripDto.id,
        );

      if (!userStation) {
        throw new NotFoundException(
          'Active trip not found. Please start a trip first.',
        );
      }

      const [affectedCount, updatedRecords] =
        await this.userChargingStationRepository.updateByUserIdAndId(
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
        `Trip ended: User ${userId} ended trip to station ${endTripDto.id}`,
      );
      return updatedRecords[0];
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Error ending trip: ${error.message}`);
      throw new BadRequestException(`Failed to end trip: ${error.message}`);
    }
  }

  /**
   * Cancel trip - Update trip status to CANCEL
   */
  async cancelTrip(
    userId: string,
    cancelTripDto: CancelTripDto,
  ): Promise<UserChargingStation> {
    try {
      const userStation =
        await this.userChargingStationRepository.findActiveTripByUserIdAndUserStationId(
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
      const [affectedCount, updatedRecords] =
        await this.userChargingStationRepository.updateByUserIdAndId(
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
        `Trip cancelled: User ${userId} cancelled trip with record ID ${cancelTripDto.id}`,
      );
      return updatedRecords[0];
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Error cancelling trip: ${error.message}`);
      throw new BadRequestException(
        `Failed to cancel trip: ${error.message}`,
      );
    }
  }
}





