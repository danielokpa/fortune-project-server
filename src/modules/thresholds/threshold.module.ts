import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThresholdController } from './controllers/threshold.controller';
import { ThresholdService } from './services/threshold.service';
import { ThresholdRepository } from './repositories/threshold.repository';

@Module({
  imports: [EventEmitterModule/*, ClientDevicesModule*/],
  controllers: [ThresholdController],
  providers: [ThresholdService, ThresholdRepository, /*AlertEventListener*/],
  exports: [ThresholdService, ThresholdRepository],
})
export class ThresholdsModule {}
