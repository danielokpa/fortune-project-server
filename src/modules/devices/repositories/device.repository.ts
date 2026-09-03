// device.repository.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Device, DeviceStatus, Prisma } from '@prisma/client';
import { CursorUtil } from 'src/utils/cursor.util';
import { handleDatabaseError } from 'src/utils/db-error-handler.util';
import { DeviceFilters } from '../interfaces/device.interface';

@Injectable()
export class DeviceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(deviceData: Prisma.DeviceUncheckedCreateInput): Promise<Device> {
    try {
      const device = await this.prisma.device.create({
        data: deviceData,
      });

      if (!device) {
        throw new InternalServerErrorException('Failed to create device');
      }

      return device;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findById(id: string): Promise<Device | null> {
    try {
      const device = await this.prisma.device.findUnique({
        where: { id },
      });

      if (!device) {
        throw new NotFoundException('Device not found');
      }

      return device;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async update(id: string, deviceData: Prisma.DeviceUpdateInput): Promise<Device> {
    try {
      const existingDevice = await this.prisma.device.findUnique({
        where: { id },
      });

      if (!existingDevice) {
        throw new NotFoundException('Device not found');
      }

      const updatedDevice = await this.prisma.device.update({
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
      const existingDevice = await this.prisma.device.findUnique({
        where: { id },
      });

      if (!existingDevice) {
        throw new NotFoundException('Device not found');
      }

      await this.prisma.device.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findAll(filters: DeviceFilters): Promise<Device[]> {
    try {
      const where = this.buildWhereClause(filters);

      const devices = await this.prisma.device.findMany({
        where,
        take: filters.limit + 1,
        orderBy: [
          { createdAt: 'desc' },
          { id: 'desc' },
        ],
      });

      if (!devices || devices.length === 0) {
        throw new NotFoundException('Devices not found');
      }

      return devices;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  private buildWhereClause(filters: DeviceFilters): Prisma.DeviceWhereInput {
    const andConditions: Prisma.DeviceWhereInput[] = [];

    /**
     * ---------------------------------------------------------
     * Search
     * ---------------------------------------------------------
     */
    if (filters.search?.trim()) {
      const keyword = filters.search.trim();
      
      // 1. Define standard text search conditions
      const orConditions: Prisma.DeviceWhereInput[] = [
        {
          deviceName: {
            contains: keyword,
            mode: 'insensitive',
          },
        },
      ];

      // 2. Safely check if the keyword is a valid DeviceStatus enum value
      const searchStatus = keyword.toUpperCase();
      if (Object.values(DeviceStatus).includes(searchStatus as DeviceStatus)) {
        orConditions.push({
          status: {
            equals: searchStatus as DeviceStatus,
          },
        });
      }

      andConditions.push({ OR: orConditions });
    }

    /**
     * ---------------------------------------------------------
     * Cursor Pagination (Keyset Pagination)
     * ---------------------------------------------------------
     */
    if (filters.cursor) {
      const cursor = CursorUtil.decode(filters.cursor);
      const cursorDate = cursor?.createdAt ? new Date(cursor.createdAt) : undefined;

      andConditions.push({
        OR: [
          {
            createdAt: { lt: cursorDate },
          },
          {
            AND: [
              { createdAt: cursorDate },
              { id: { lt: cursor?.id } },
            ],
          },
        ],
      });
    }

    return andConditions.length > 0 ? { AND: andConditions } : {};
  }
}
