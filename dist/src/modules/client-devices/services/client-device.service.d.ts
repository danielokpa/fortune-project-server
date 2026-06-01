import { Prisma, ClientDevice } from '@prisma/client';
import { ClientDeviceRepository } from '../repositories/client-device.repository';
import { UserType } from "../../../enums";
export declare class ClientDeviceService {
    private readonly clientDeviceRepository;
    constructor(clientDeviceRepository: ClientDeviceRepository);
    findById(id: string): Promise<ClientDevice | null>;
    findByUserId(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        deviceName: string | null;
        ipAddress: string | null;
        deviceFCMToken: string | null;
        platform: string | null;
    }[]>;
    getFcmTokensForUserId(userId: string): Promise<string[]>;
    findByIpAddress(ipAddress: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        deviceName: string | null;
        ipAddress: string | null;
        deviceFCMToken: string | null;
        platform: string | null;
    }[]>;
    findByUserIdAndDeviceToken(userId: string, deviceFCMToken: string): Promise<ClientDevice | null>;
    findAll(options?: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        deviceName: string | null;
        ipAddress: string | null;
        deviceFCMToken: string | null;
        platform: string | null;
    }[]>;
    create(clientDeviceData: Prisma.ClientDeviceUncheckedCreateInput): Promise<ClientDevice>;
    delete(id: string): Promise<boolean>;
    registerDevice(deviceData: {
        ipAddress: string;
        deviceFCMToken?: string;
        name?: string;
        userId: string;
        driverId?: string;
        userType?: UserType;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        deviceName: string | null;
        ipAddress: string | null;
        deviceFCMToken: string | null;
        platform: string | null;
    }>;
    updateDeviceToken(clientDeviceId: string, deviceFCMToken: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        deviceName: string | null;
        ipAddress: string | null;
        deviceFCMToken: string | null;
        platform: string | null;
    }>;
}
