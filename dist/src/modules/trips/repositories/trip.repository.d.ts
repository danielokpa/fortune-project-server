import { Trip, TripStatus } from '../entities/trip.entity';
export declare class TripRepository {
    private readonly tripModel;
    constructor(tripModel: typeof Trip);
    create(data: Partial<Trip>): Promise<Trip>;
    findById(id: string): Promise<Trip | null>;
    findUserActiveTrip(userId: string): Promise<Trip | null>;
    findAll(options?: {
        limit?: number;
        offset?: number;
        userId?: string;
        driverId?: string;
        status?: TripStatus;
    }): Promise<Trip[]>;
    update(id: string, data: Partial<Trip>): Promise<[number, Trip[]]>;
    updateStatus(id: string, status: TripStatus): Promise<Trip | null>;
    delete(id: string): Promise<number>;
}
