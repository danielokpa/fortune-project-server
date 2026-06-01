import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
// import { UserEventService } from './services/user-event.service';
import { UserEventListener } from './listeners/user.listener';
import { ClientDevicesModule } from '../client-devices/client-devices.module';

@Module({
  imports: [EventEmitterModule, ClientDevicesModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserEventListener],
  exports: [UserService, UserRepository],
})
export class UsersModule {}
