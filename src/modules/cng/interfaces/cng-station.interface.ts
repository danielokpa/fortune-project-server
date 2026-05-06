/**
 * Interfaces for CNG Station responses
 * Used to avoid exposing entity types directly
 */

export interface ICngStationBasic {
  id: string;
  name: string;
  address: string;
}

export interface ICngStation extends ICngStationBasic {
  country: string;
  state: string;
  contactPhone: string;
  contactEmail: string;
  openingTime: string;
  closingTime: string;
  amountPerUnit: number;
  currency: string;
  amountPerUnitType: string;
  latitude?: number;
  longitude?: number;
  stationImage?: string;
  isActive: boolean;
  isFavorite?: boolean;
  rating?: number;
  reviews?: number;
  totalRatings?: number;
  totalReviews?: number;
  distance?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IActiveTrip {
  id: string;
  name: string;
  address: string;
  status: string;
}

export interface IStationsListResponse {
  stations: ICngStation[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IStationsSearchResponse {
  stations: ICngStationBasic[];
  total: number;
  limit: number;
  offset: number;
  totalPages: number;
}

export interface IRecentStationsResponse {
  stations: ICngStationBasic[];
  activeTrip: IActiveTrip | null;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IFavoriteStationsResponse {
  stations: ICngStationBasic[];
  activeTrip: IActiveTrip | null;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IToggleFavoriteResponse {
  isFavorite: boolean;
  message: string;
}

export interface ITripResponse {
  id: string;
  userId: string;
  cngStationId: string;
  selfTripStatus: string;
  latitude?: number;
  longitude?: number;
  distance?: number;
  createdAt: Date;
  updatedAt: Date;
}

