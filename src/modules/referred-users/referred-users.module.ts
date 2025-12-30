import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReferredUser } from './entities/referred-user.entity';
import { ReferredUserRepository } from './repositories/referred-user.repository';
import { ReferredUserService } from './services/referred-user.service';

@Module({
  imports: [SequelizeModule.forFeature([ReferredUser])],
  providers: [ReferredUserRepository, ReferredUserService],
  exports: [SequelizeModule, ReferredUserRepository, ReferredUserService],
})
export class ReferredUsersModule {}

