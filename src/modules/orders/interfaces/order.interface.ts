export interface ICreateOrder {
  userId: string;

  recipientName: string;

  recipientPhoneNo: string;

  deliveryAddress: string;

  deliveryCity: string;

  deliveryState: string;

  deliveryCountry: string;

  postalCode?: string;

  notes?: string;
}

export interface IOrderSearchParams {
  userId: string;

  cursor?: string;

  limit?: number;
}

export interface ICancelOrder {
  orderId: string;

  userId: string;
}

export interface ICreateOrderRepository {
  userId: string;

  recipientName: string;

  recipientPhoneNo: string;

  deliveryAddress: string;

  deliveryCity: string;

  deliveryState: string;

  deliveryCountry: string;

  postalCode?: string;

  notes?: string;
}
