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
    TRIP_BOOKED = "TRIP_BOOKED",
    TRIP_ASSIGNED = "TRIP_ASSIGNED",
    DRIVER_ARRIVED = "DRIVER_ARRIVED",
    DRIVER_ACCEPTED = "DRIVER_ACCEPTED",
    DRIVER_DECLINED = "DRIVER_DECLINED",
    TRIP_RE_ASSIGN = "TRIP_RE_ASSIGN",
    TRIP_STARTED = "TRIP_STARTED",
    TRIP_COMPLETED = "TRIP_COMPLETED",
    TRIP_CANCELLED_BY_USER = "TRIP_CANCELLED_BY_USER",
    TRIP_CANCELLED_BY_DRIVER = "TRIP_CANCELLED_BY_DRIVER",
    TRIP_CANCELLED = "TRIP_CANCELLED"
}
export declare enum TripPaymentStatus {
    UNPAID = "UNPAID",
    PAID = "PAID"
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
    dropoffAddress?: string;
    pickupAddress?: string;
    pickupLocation?: string;
    dropoffLocation?: string;
    pickupLatitude?: number;
    pickupLongitude?: number;
    dropoffLatitude?: number;
    dropoffLongitude?: number;
    status: TripStatus;
    paymentStatus: TripPaymentStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
