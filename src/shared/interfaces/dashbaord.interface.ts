import { IsString } from "class-validator";
import { PAYMENT_TYPE } from "src/enums/payment.enums";
import { Trip } from "src/modules/trips/entities/trip.entity";

export interface IDashboard {
    userId: string;
    email: string;
    fullName: string;
    phoneNo: string;
    paymentTypes: IPaymentType[];
    activeTrip: Trip | null;
    piWalletAddress?: string;
    rating?: number;
}

export interface IPaymentType {
    type: PAYMENT_TYPE;
    label: string;
    amount: number;
}

export class IDashboardInput {
    @IsString()
    deviceFCMToken: string;

    @IsString()
    ipAddress: string;

    @IsString()
    name: string;
}