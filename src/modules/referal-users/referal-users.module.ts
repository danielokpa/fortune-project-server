import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReferalUser } from './entities/referal-user.entity';
import { ReferalUserRepository } from './repositories/referal-user.repository';
import { ReferalUserService } from './services/referal-user.service';

@Module({
  imports: [SequelizeModule.forFeature([ReferalUser])],
  providers: [ReferalUserRepository, ReferalUserService],
  exports: [SequelizeModule, ReferalUserRepository, ReferalUserService],
})
export class ReferalUsersModule {}
