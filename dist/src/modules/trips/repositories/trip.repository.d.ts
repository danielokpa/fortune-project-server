import { Trip, TripStatus } from '../entities/trip.entity';
import { VehicleRegistration } from 'src/modules/drivers/entities/vehicle-registration.entity';
export declare class TripRepository {
    private readonly tripModel;
    private readonly vehicleRegistrationModel;
    constructor(tripModel: typeof Trip, vehicleRegistrationModel: typeof VehicleRegistration);
    create(data: Partial<Trip>): Promise<Trip>;
    findById(id: string): Promise<Trip | null>;
    findUserActiveTrip(userId: string): Promise<any | null>;
    findDriverActiveTrip(driverId: string): Promise<any | null>;
    findAll(options?: {
        limit?: number;
        offset?: number;
        userId?: string;
        driverId?: string;
        status?: TripStatus;
    }): Promise<Trip[]>;
}
