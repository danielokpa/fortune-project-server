import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChargingStation } from './entities/charging-station.entity';
import { UserChargingStation } from './entities/user-charging-station.entity';
import { ChargingStationFavorite } from './entities/charging-station-favorite.entity';
import { ChargingStationRating } from './entities/charging-station-rating.entity';
import { ChargingStationReview } from './entities/charging-station-review.entity';
import { User } from '../users/entities/user.entity';
import { Country } from '../countries/entities/country.entity';
import { State } from '../countries/entities/state.entity';
import { UsersModule } from '../users/users.module';
import { CountriesModule } from '../countries/countries.module';
import { ChargingStationController } from './controllers/charging-station.controller';
import { ChargingStationService } from './services/charging-station.service';
import { UserChargingStationService } from './services/user-charging-station.service';
import { ChargingStationRepository } from './repositories/charging-station.repository';
import { UserChargingStationRepository } from './repositories/user-charging-station.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([
      ChargingStation,
      UserChargingStation,
      ChargingStationFavorite,
      ChargingStationRating,
      ChargingStationReview,
      User,
      Country,
      State,
    ]),
    UsersModule,
    CountriesModule,
  ],
  controllers: [ChargingStationController],
  providers: [
    ChargingStationService,
    UserChargingStationService,
    ChargingStationRepository,
    UserChargingStationRepository,
  ],
  exports: [
    ChargingStationService,
    UserChargingStationService,
    ChargingStationRepository,
    UserChargingStationRepository,
  ],
})
export class ChargingStationsModule {}

