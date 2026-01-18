"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChargingStationsModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const charging_station_entity_1 = require("./entities/charging-station.entity");
const user_charging_station_entity_1 = require("./entities/user-charging-station.entity");
const charging_station_favorite_entity_1 = require("./entities/charging-station-favorite.entity");
const charging_station_rating_entity_1 = require("./entities/charging-station-rating.entity");
const charging_station_review_entity_1 = require("./entities/charging-station-review.entity");
const user_entity_1 = require("../users/entities/user.entity");
const driver_entity_1 = require("../drivers/entities/driver.entity");
const country_entity_1 = require("../countries/entities/country.entity");
const state_entity_1 = require("../countries/entities/state.entity");
const users_module_1 = require("../users/users.module");
const countries_module_1 = require("../countries/countries.module");
const charging_station_controller_1 = require("./controllers/charging-station.controller");
const charging_station_service_1 = require("./services/charging-station.service");
const user_charging_station_service_1 = require("./services/user-charging-station.service");
const charging_station_repository_1 = require("./repositories/charging-station.repository");
const user_charging_station_repository_1 = require("./repositories/user-charging-station.repository");
let ChargingStationsModule = class ChargingStationsModule {
};
exports.ChargingStationsModule = ChargingStationsModule;
exports.ChargingStationsModule = ChargingStationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([
                charging_station_entity_1.ChargingStation,
                user_charging_station_entity_1.UserChargingStation,
                charging_station_favorite_entity_1.ChargingStationFavorite,
                charging_station_rating_entity_1.ChargingStationRating,
                charging_station_review_entity_1.ChargingStationReview,
                user_entity_1.User,
                driver_entity_1.Driver,
                country_entity_1.Country,
                state_entity_1.State,
            ]),
            users_module_1.UsersModule,
            countries_module_1.CountriesModule,
        ],
        controllers: [charging_station_controller_1.ChargingStationController],
        providers: [
            charging_station_service_1.ChargingStationService,
            user_charging_station_service_1.UserChargingStationService,
            charging_station_repository_1.ChargingStationRepository,
            user_charging_station_repository_1.UserChargingStationRepository,
        ],
        exports: [
            charging_station_service_1.ChargingStationService,
            user_charging_station_service_1.UserChargingStationService,
            charging_station_repository_1.ChargingStationRepository,
            user_charging_station_repository_1.UserChargingStationRepository,
        ],
    })
], ChargingStationsModule);
//# sourceMappingURL=charging-stations.module.js.map