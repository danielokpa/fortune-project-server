import { PAYMENT_TYPE } from "../../enums/payment.enums";
export interface IDashboard {
    userId: string;
    email: string;
    username: string;
    phoneNo: string;
    paymentTypes: IPaymentType[];
    rating?: number;
}
export interface IPaymentType {
    type: PAYMENT_TYPE;
    label: string;
    amount: number;
    currency: string;
}
export declare class IDashboardInput {
    deviceFCMToken: string;
    ipAddress: string;
    name: string;
}
