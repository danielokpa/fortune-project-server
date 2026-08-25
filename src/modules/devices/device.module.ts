import { Module } from '@nestjs/common';
import { DeviceService } from './services/device.service';
import { DeviceRepository } from './repositories/device.repository';
import { DeviceController } from './controllers/device.controller';

@Module({
  imports: [],
  controllers: [DeviceController],
  providers: [DeviceService, DeviceRepository],
  exports: [DeviceService, DeviceRepository],
})
export class DevicesModule {}
