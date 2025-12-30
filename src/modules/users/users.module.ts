import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { User } from './entities/user.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { UserEventService } from './services/user-event.service';
import { UserEventListener } from './listeners/user.listener';
import { ClientDevicesModule } from '../client-devices/client-devices.module';
import { TripsModule } from '../trips/trips.module';
import { ReferredUsersModule } from '../referred-users/referred-users.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    EventEmitterModule,
    ClientDevicesModule,
    TripsModule,
    ReferredUsersModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserEventService, UserEventListener],
  exports: [UserService, UserRepository, UserEventService],
})
export class UsersModule {}
