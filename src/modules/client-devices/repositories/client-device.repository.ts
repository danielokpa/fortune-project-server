import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientDevice, Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { handleDatabaseError } from 'src/utils/db-error-handler.util';

@Injectable()
export class ClientDeviceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<ClientDevice | null> {
    try {
      const device = await this.prisma.clientDevice.findUnique({
        where: { id },
      });

      return device;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findByUserId(userId: string): Promise<ClientDevice[]> {
    try {
      const devices = await this.prisma.clientDevice.findMany({
        where: { userId },
      });

      return devices;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findWithFcmByUserId(userId: string): Promise<ClientDevice[]> {
    try {
      const devices = await this.prisma.clientDevice.findMany({
        where: {
          userId,

          NOT: {
            deviceFCMToken: null,
          },
        },
      });

      return devices;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findByIpAddress(ipAddress: string): Promise<ClientDevice[]> {
    try {
      const devices = await this.prisma.clientDevice.findMany({
        where: { ipAddress },
      });

      return devices;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findByDeviceToken(deviceFCMToken: string): Promise<ClientDevice | null> {
    try {
      const device = await this.prisma.clientDevice.findFirst({
        where: { deviceFCMToken },
      });

      return device;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findAll(
    params?: Prisma.ClientDeviceFindManyArgs,
  ): Promise<ClientDevice[]> {
    try {
      const devices = await this.prisma.clientDevice.findMany(params);

      return devices;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findByUserIdAndDeviceToken(
    userId: string,
    deviceFCMToken: string,
  ): Promise<ClientDevice | null> {
    try {
      const device = await this.prisma.clientDevice.findFirst({
        where: {
          userId,
          deviceFCMToken,
        },
      });

      return device;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async create(
    deviceData: Prisma.ClientDeviceUncheckedCreateInput,
  ): Promise<ClientDevice> {
    try {
      const device = await this.prisma.clientDevice.create({
        data: deviceData,
      });

      if (!device) {
        throw new BadRequestException('Failed to create device');
      }

      return device;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async update(
    id: string,
    deviceData: Prisma.ClientDeviceUpdateInput,
  ): Promise<ClientDevice> {
    try {
      const existingDevice = await this.prisma.clientDevice.findUnique({
        where: { id },
      });

      if (!existingDevice) {
        throw new NotFoundException('Device not found');
      }

      const updatedDevice = await this.prisma.clientDevice.update({
        where: { id },
        data: deviceData,
      });

      return updatedDevice;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const existingDevice = await this.prisma.clientDevice.findUnique({
        where: { id },
      });

      if (!existingDevice) {
        throw new NotFoundException('Device not found');
      }

      await this.prisma.clientDevice.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async deleteAllByUserId(userId: string): Promise<number> {
    try {
      const result = await this.prisma.clientDevice.deleteMany({
        where: { userId },
      });

      return result.count;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findByUserAndDevice(
    userId: string,
    deviceFCMToken: string,
  ): Promise<ClientDevice | null> {
    try {
      const device = await this.prisma.clientDevice.findFirst({
        where: {
          userId,
          deviceFCMToken,
        },
      });

      return device;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async updateOrCreateDevice(
    deviceData: Prisma.ClientDeviceUncheckedCreateInput,
  ): Promise<ClientDevice> {
    try {
      const { userId, deviceToken, ipAddress } = deviceData as any;

      if (!deviceToken || !ipAddress) {
        throw new BadRequestException('deviceToken and ipAddress are required');
      }

      if (!userId) {
        throw new BadRequestException('userId is required');
      }

      const existingDevice = await this.findByUserAndDevice(
        userId,
        deviceToken,
      );

      if (existingDevice) {
        return await this.prisma.clientDevice.update({
          where: {
            id: existingDevice.id,
          },

          data: {
            ...deviceData,
          },
        });
      }

      return await this.prisma.clientDevice.create({
        data: deviceData,
      });
    } catch (error) {
      handleDatabaseError(error);
    }
  }
}
