export declare enum PeppFleetStatus {
    ACTIVE = "active",
    MAINTENANCE = "maintenance",
    UNASSIGNED = "unassigned"
}
export declare class CreatePeppVehicleDto {
    licenseNumber: string;
    brand: string;
    color: string;
    plateNumber: string;
    imagePlateNumber?: string;
    registrationImageUrl?: string;
    year?: string;
    vinNumber?: string;
    driverId?: string;
    expiryDate?: string;
    capacity?: number;
    region?: string;
    fleetStatus?: PeppFleetStatus;
    isPeppcruiseVehicle?: boolean;
}
declare const UpdatePeppVehicleDto_base: any;
export declare class UpdatePeppVehicleDto extends UpdatePeppVehicleDto_base {
}
export declare class PeppVehicleListItemDto {
    id: string;
    type: string;
    plateNumber: string;
    capacity: number | null;
    region: string | null;
    assignedDriverName: string;
    assignedDriverPhone: string;
    status: string;
}
export {};
