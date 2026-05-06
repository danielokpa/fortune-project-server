import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserCngConversion } from './entities/user.cng-conversion.entity';
import { CngStation } from './entities/cng-station.entity';
import { CngConversionStation } from './entities/cng-conversion.stations.entity';
import { UserCngStation } from './entities/user.cng-station.entity';
import { CngStationFavorite } from './entities/cng-station-favorite.entity';
import { CngStationRating } from './entities/cng-station-rating.entity';
import { CngStationReview } from './entities/cng-station-review.entity';
import { User } from '../users/entities/user.entity';
import { Driver } from '../drivers/entities/driver.entity';
import { UsersModule } from '../users/users.module';
import { CngUserConversionController } from './controllers/cng-user-conversion.controller';
import { CngStationsController } from './controllers/cng-stations.controller';
import { CngConversionCenterController } from './controllers/cng-conversion-center.controller';
import { CngConversionService } from './services/cng-conversion.service';
import { CngStationService } from './services/cng-station.service';
import { CngStationsService } from './services/cng-stations.service';
import { UserCngStationService } from './services/user-cng-station.service';
import { CngConversionCenterService } from './services/cng-conversion-center.service';
import { UserCngConversionRepository } from './repositories/cng-conversion.repository';
import { CngStationRepository } from './repositories/cng-station.repository';
import { UserCngStationRepository } from './repositories/user-cng-station.repository';
import { CngConversionCenterRepository } from './repositories/cng-conversion-center.repository';
import { CivilServantInstallmentPaymentProof } from './entities/civil-servant-installment-verification.entity';
import { CivilServantInstallmentVerificationRepository } from './repositories/civil-servant-installment-verification.repository';
import { CivilServantInstallmentVerificationService } from './services/civil-servant-installment-verification.service';
import { CngInstallmentUserInfoController } from './controllers/cng-installment-user-info.controller';
import { AxiosModule } from 'src/services/axios/axios.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      UserCngConversion,
      CngStation,
      CngConversionStation,
      UserCngStation,
      CngStationFavorite,
      CngStationRating,
      CngStationReview,
      CivilServantInstallmentPaymentProof,
      User,
      Driver,
    ]),
    UsersModule,
    AxiosModule,
  ],
  controllers: [
    CngUserConversionController,
    CngStationsController,
    CngConversionCenterController,
    CngInstallmentUserInfoController,
  ],
  providers: [
    CngConversionService,
    CngStationService,
    CngStationsService,
    UserCngStationService,
    CngConversionCenterService,
    UserCngConversionRepository,
    CngStationRepository,
    UserCngStationRepository,
    CngConversionCenterRepository,
    CivilServantInstallmentVerificationRepository,
    CivilServantInstallmentVerificationService,
  ],
  exports: [
    CngConversionService,
    CngStationService,
    CngStationsService,
    UserCngStationService,
    CngConversionCenterService,
    UserCngConversionRepository,
    CngStationRepository,
    UserCngStationRepository,
    CngConversionCenterRepository,
    CivilServantInstallmentVerificationRepository,
    CivilServantInstallmentVerificationService,
  ],
})
export class CngConversionModule {}

