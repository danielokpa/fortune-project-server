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
}
export interface IPaymentType {
    type: PAYMENT_TYPE;
    label: string;
    amount: number;
}
export declare class IDashboardInput {
    deviceFCMToken: string;
    ipAddress: string;
    name: string;
}
