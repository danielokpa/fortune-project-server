import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CngConversion } from './entities/cng-conversion.entity';
import { CngStation } from './entities/cng-station.entity';
import { UserCngStation } from './entities/user-cng-station.entity';
import { CngStationFavorite } from './entities/cng-station-favorite.entity';
import { CngStationRating } from './entities/cng-station-rating.entity';
import { CngStationReview } from './entities/cng-station-review.entity';
import { User } from '../users/entities/user.entity';
import { Driver } from '../drivers/entities/driver.entity';
import { UsersModule } from '../users/users.module';
import { CngConversionController } from './controllers/cng-conversion.controller';
import { CngStationsController } from './controllers/cng-stations.controller';
import { CngConversionService } from './services/cng-conversion.service';
import { CngStationService } from './services/cng-station.service';
import { CngStationsService } from './services/cng-stations.service';
import { UserCngStationService } from './services/user-cng-station.service';
import { CngConversionRepository } from './repositories/cng-conversion.repository';
import { CngStationRepository } from './repositories/cng-station.repository';
import { UserCngStationRepository } from './repositories/user-cng-station.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([
      CngConversion,
      CngStation,
      UserCngStation,
      CngStationFavorite,
      CngStationRating,
      CngStationReview,
      User,
      Driver,
    ]),
    UsersModule,
  ],
  controllers: [CngConversionController, CngStationsController],
  providers: [
    CngConversionService,
    CngStationService,
    CngStationsService,
    UserCngStationService,
    CngConversionRepository,
    CngStationRepository,
    UserCngStationRepository,
  ],
  exports: [
    CngConversionService,
    CngStationService,
    CngStationsService,
    UserCngStationService,
    CngConversionRepository,
    CngStationRepository,
    UserCngStationRepository,
  ],
})
export class CngConversionModule {}

