import { ClientDeviceService } from '../services/client-device.service';
export declare class ClientDeviceController {
    private readonly clientDeviceService;
    constructor(clientDeviceService: ClientDeviceService);
    findAll(): Promise<import("src/utils/response.utils").ApiResponse<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        deviceName: string | null;
        ipAddress: string | null;
        deviceFCMToken: string | null;
        platform: string | null;
    }[]>>;
    getMyDevices(req: any): Promise<import("src/utils/response.utils").ApiResponse<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        deviceName: string | null;
        ipAddress: string | null;
        deviceFCMToken: string | null;
        platform: string | null;
    }[]> | {
        message: string;
        statusCode: number;
    }>;
}
