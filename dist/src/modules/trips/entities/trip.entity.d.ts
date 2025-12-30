import { Model } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { Driver } from '../../drivers/entities/driver.entity';
export declare enum PaymentType {
    PEPP_COIN = "PEPP_COIN",
    CASH = "CASH",
    PI_COIN = "PI_COIN",
    CARD = "CARD",
    WALLET = "WALLET"
}
export declare enum TripStatus {
    PENDING = "PENDING",
    ASSIGNED = "ASSIGNED",
    ACCEPTED = "ACCEPTED",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
    ON_THE_WAY = "ON_THE_WAY",
    ARRIVED = "ARRIVED"
}
export declare class Trip extends Model<Trip> {
    id: string;
    userId: string;
    user: User;
    driverId?: string;
    driver?: Driver;
    estimatedFee: number;
    startTime?: Date;
    endTime?: Date;
    arrivalTime?: Date;
    paymentType?: PaymentType;
    droffOffAddress?: string;
    pickupAddress?: string;
    pickupLocation?: string;
    dropoffLocation?: string;
    pickupLatitude?: number;
    pickupLongitude?: number;
    dropoffLatitude?: number;
    dropoffLongitude?: number;
    status: TripStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
