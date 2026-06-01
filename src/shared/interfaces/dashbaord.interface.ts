import { IsString } from 'class-validator';
import { PAYMENT_TYPE } from 'src/enums/payment.enums';

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

export class IDashboardInput {
  @IsString()
  deviceFCMToken: string;

  @IsString()
  ipAddress: string;

  @IsString()
  name: string;
}
