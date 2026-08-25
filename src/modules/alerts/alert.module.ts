import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AlertController } from './controllers/alert.controller';
import { AlertService } from './services/alert.service';
import { AlertRepository } from './repositories/alert.repository';

@Module({
  imports: [EventEmitterModule/*, ClientDevicesModule*/],
  controllers: [AlertController],
  providers: [AlertService, AlertRepository, /*AlertEventListener*/],
  exports: [AlertService, AlertRepository],
})
export class AlertsModule {}
