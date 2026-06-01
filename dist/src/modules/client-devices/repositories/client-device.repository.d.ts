import { ClientDevice, Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
export declare class ClientDeviceRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<ClientDevice | null>;
    findByUserId(userId: string): Promise<ClientDevice[]>;
    findWithFcmByUserId(userId: string): Promise<ClientDevice[]>;
    findByIpAddress(ipAddress: string): Promise<ClientDevice[]>;
    findByDeviceToken(deviceFCMToken: string): Promise<ClientDevice | null>;
    findAll(params?: Prisma.ClientDeviceFindManyArgs): Promise<ClientDevice[]>;
    findByUserIdAndDeviceToken(userId: string, deviceFCMToken: string): Promise<ClientDevice | null>;
    create(deviceData: Prisma.ClientDeviceUncheckedCreateInput): Promise<ClientDevice>;
    update(id: string, deviceData: Prisma.ClientDeviceUpdateInput): Promise<ClientDevice>;
    delete(id: string): Promise<boolean>;
    deleteAllByUserId(userId: string): Promise<number>;
    findByUserAndDevice(userId: string, deviceFCMToken: string): Promise<ClientDevice | null>;
    updateOrCreateDevice(deviceData: Prisma.ClientDeviceUncheckedCreateInput): Promise<ClientDevice>;
}
