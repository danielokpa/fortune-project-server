// device.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, Device } from '@prisma/client';
import { DeviceRepository } from '../repositories/device.repository';
import { CursorUtil } from 'src/utils/cursor.util';
import { DeviceFilters } from '../interfaces/device-filters.interface';
import { GetDevicesDto, UpdateDeviceDto, CreateDeviceDto } from '../dto/device.dto';

@Injectable()
export class DeviceService {
  constructor(
    private readonly deviceRepository: DeviceRepository,
    private readonly configService: ConfigService,
  ) {}

  async fetchDevice(id: string): Promise<Partial<Device>> {
    const device = await this.deviceRepository.findById(id);

    if (!device) {
      throw new NotFoundException('Device not found');
    }

    return device;
  }

  async findAll(params: GetDevicesDto) {
    const filters: DeviceFilters = {
      cursor: params.cursor,
      limit: params.limit,
      search: params.search,
    };

    const devices = await this.deviceRepository.findAll(filters);
    const hasNextPage = devices.length > filters.limit;

    if (hasNextPage) devices.pop();
    const lastItem = devices[devices.length - 1];

    const nextCursor =
      hasNextPage && lastItem
        ? CursorUtil.encode({
            createdAt: lastItem.createdAt.toISOString(),
            id: lastItem.id,
          })
        : null;

    return {
      items: devices,
      pagination: {
        limit: filters.limit,
        hasNextPage,
        nextCursor,
      },
    };
  }

  async create(deviceData: CreateDeviceDto): Promise<Device> {
    const device = await this.deviceRepository.create(deviceData);
    if (!device) throw new NotFoundException('Failed to create device');
    return device;
  }

  async update(id: string, deviceData: Prisma.DeviceUncheckedUpdateInput): Promise<Device> {
    const data = await this.deviceRepository.update(id, deviceData);
    if (!data) throw new NotFoundException('Failed to update device');
    return data;
  }

  async deleteDevice(id: string): Promise<boolean> {
    const deleted = await this.deviceRepository.delete(id);
    if (!deleted) return false;
    return true;
  }
}
