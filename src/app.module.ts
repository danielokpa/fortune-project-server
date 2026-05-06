import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { SequelizeModule } from '@nestjs/sequelize';
import appConfig from './config/app.config';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DriversModule } from './modules/drivers/drivers.module';
import { CountriesModule } from './modules/countries/countries.module';
import { CngConversionModule } from './modules/cng/cng-conversion.module';
import { ChargingStationsModule } from './modules/charging-stations/charging-stations.module';
import { ClientDevicesModule } from './modules/client-devices/client-devices.module';
import { TokenModule } from './services/token/token.module';
import { MailModule } from './services/mail/mail.module';
import { SmsModule } from './services/sms/sms.module';
import { AxiosModule } from './services/axios/axios.module';
import { ApiKeyInterceptor } from './interceptors/api-key.interceptors';

import { User } from './modules/users/entities';
import { Driver } from './modules/drivers/entities';
import { Guarantor } from './modules/drivers/entities/guarantor.entity';
import { kyc1PersonalInfo } from './modules/drivers/entities/kyc1-personal-Info.entity';
import { kyc2IdInformation } from './modules/drivers/entities/kyc2-Id-Information.entity';
import { kyc3ResidentialInformation } from './modules/drivers/entities/kyc3-residential-Information.entity';
import { Vehicle } from './modules/drivers/entities/vehicle.entity';
import { PeppDriverVehicles } from './modules/drivers/entities/pepp-driver-vehicles.entity';
import { Country, State, LGA } from './modules/countries/entities';
import { UserCngConversion } from './modules/cng/entities/user.cng-conversion.entity';
import { CngConversionStation } from './modules/cng/entities/cng-conversion.stations.entity';
import { CngStation } from './modules/cng/entities/cng-station.entity';
import { UserCngStation } from './modules/cng/entities/user.cng-station.entity';
import { ChargingStation } from './modules/charging-stations/entities/charging-station.entity';
import { UserChargingStation } from './modules/charging-stations/entities/user-charging-station.entity';
import { ChargingStationFavorite } from './modules/charging-stations/entities/charging-station-favorite.entity';
import { ChargingStationRating } from './modules/charging-stations/entities/charging-station-rating.entity';
import { ChargingStationReview } from './modules/charging-stations/entities/charging-station-review.entity';
import { CngStationFavorite } from './modules/cng/entities/cng-station-favorite.entity';
import { CngStationRating } from './modules/cng/entities/cng-station-rating.entity';
import { CngStationReview } from './modules/cng/entities/cng-station-review.entity';
import { ClientDevice } from './modules/client-devices/entities/client-device.entity';
import { Token } from './services/token/entities';
import { Trip } from './modules/trips/entities/trip.entity';
import { TripsModule } from './modules/trips/trips.module';
import { ReferredUser } from './modules/referred-users/entities/referred-user.entity';
import { CivilServantInstallmentPaymentProof } from './modules/cng/entities/civil-servant-installment-verification.entity';


@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql', // MySQL dialect
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadModels: true,
      models: [
        User,
        Driver,
        Guarantor,
        kyc1PersonalInfo,
        kyc2IdInformation,
        kyc3ResidentialInformation,
        Vehicle,
        PeppDriverVehicles,
        Country,
        State,
        LGA,
        CngConversionStation,
        UserCngConversion,
        CngStation,
        UserCngStation,
        CngStationFavorite,
        CngStationRating,
        CngStationReview,
        CivilServantInstallmentPaymentProof,
        ChargingStation,
        UserChargingStation,
        ChargingStationFavorite,
        ChargingStationRating,
        ChargingStationReview,
        ClientDevice,
        Token,
        Trip,
        ReferredUser,
      ],
      synchronize: process.env.NODE_ENV !== 'production', // Disable in production
      logging: process.env.NODE_ENV === 'development',
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get<number>('app.rateLimitTtl') || 60000,
          limit: config.get<number>('app.rateLimitLimit') || 10,
        },
      ],
    }),
    AuthModule,
    UsersModule,
    DriversModule,
    TripsModule,
    CountriesModule,
    CngConversionModule,
    ChargingStationsModule,
    ClientDevicesModule,
    TokenModule,
    MailModule,
    SmsModule,
    AxiosModule,
  ],
  controllers: [AppController],
  providers: [AppService, ApiKeyInterceptor],
})
export class AppModule {}
