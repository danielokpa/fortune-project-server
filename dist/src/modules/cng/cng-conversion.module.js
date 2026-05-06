"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CngConversionModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_cng_conversion_entity_1 = require("./entities/user.cng-conversion.entity");
const cng_station_entity_1 = require("./entities/cng-station.entity");
const cng_conversion_stations_entity_1 = require("./entities/cng-conversion.stations.entity");
const user_cng_station_entity_1 = require("./entities/user.cng-station.entity");
const cng_station_favorite_entity_1 = require("./entities/cng-station-favorite.entity");
const cng_station_rating_entity_1 = require("./entities/cng-station-rating.entity");
const cng_station_review_entity_1 = require("./entities/cng-station-review.entity");
const user_entity_1 = require("../users/entities/user.entity");
const driver_entity_1 = require("../drivers/entities/driver.entity");
const users_module_1 = require("../users/users.module");
const cng_user_conversion_controller_1 = require("./controllers/cng-user-conversion.controller");
const cng_stations_controller_1 = require("./controllers/cng-stations.controller");
const cng_conversion_center_controller_1 = require("./controllers/cng-conversion-center.controller");
const cng_conversion_service_1 = require("./services/cng-conversion.service");
const cng_station_service_1 = require("./services/cng-station.service");
const cng_stations_service_1 = require("./services/cng-stations.service");
const user_cng_station_service_1 = require("./services/user-cng-station.service");
const cng_conversion_center_service_1 = require("./services/cng-conversion-center.service");
const cng_conversion_repository_1 = require("./repositories/cng-conversion.repository");
const cng_station_repository_1 = require("./repositories/cng-station.repository");
const user_cng_station_repository_1 = require("./repositories/user-cng-station.repository");
const cng_conversion_center_repository_1 = require("./repositories/cng-conversion-center.repository");
const civil_servant_installment_verification_entity_1 = require("./entities/civil-servant-installment-verification.entity");
const civil_servant_installment_verification_repository_1 = require("./repositories/civil-servant-installment-verification.repository");
const civil_servant_installment_verification_service_1 = require("./services/civil-servant-installment-verification.service");
const cng_installment_user_info_controller_1 = require("./controllers/cng-installment-user-info.controller");
const axios_module_1 = require("../../services/axios/axios.module");
let CngConversionModule = class CngConversionModule {
};
exports.CngConversionModule = CngConversionModule;
exports.CngConversionModule = CngConversionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([
                user_cng_conversion_entity_1.UserCngConversion,
                cng_station_entity_1.CngStation,
                cng_conversion_stations_entity_1.CngConversionStation,
                user_cng_station_entity_1.UserCngStation,
                cng_station_favorite_entity_1.CngStationFavorite,
                cng_station_rating_entity_1.CngStationRating,
                cng_station_review_entity_1.CngStationReview,
                civil_servant_installment_verification_entity_1.CivilServantInstallmentPaymentProof,
                user_entity_1.User,
                driver_entity_1.Driver,
            ]),
            users_module_1.UsersModule,
            axios_module_1.AxiosModule,
        ],
        controllers: [
            cng_user_conversion_controller_1.CngUserConversionController,
            cng_stations_controller_1.CngStationsController,
            cng_conversion_center_controller_1.CngConversionCenterController,
            cng_installment_user_info_controller_1.CngInstallmentUserInfoController,
        ],
        providers: [
            cng_conversion_service_1.CngConversionService,
            cng_station_service_1.CngStationService,
            cng_stations_service_1.CngStationsService,
            user_cng_station_service_1.UserCngStationService,
            cng_conversion_center_service_1.CngConversionCenterService,
            cng_conversion_repository_1.UserCngConversionRepository,
            cng_station_repository_1.CngStationRepository,
            user_cng_station_repository_1.UserCngStationRepository,
            cng_conversion_center_repository_1.CngConversionCenterRepository,
            civil_servant_installment_verification_repository_1.CivilServantInstallmentVerificationRepository,
            civil_servant_installment_verification_service_1.CivilServantInstallmentVerificationService,
        ],
        exports: [
            cng_conversion_service_1.CngConversionService,
            cng_station_service_1.CngStationService,
            cng_stations_service_1.CngStationsService,
            user_cng_station_service_1.UserCngStationService,
            cng_conversion_center_service_1.CngConversionCenterService,
            cng_conversion_repository_1.UserCngConversionRepository,
            cng_station_repository_1.CngStationRepository,
            user_cng_station_repository_1.UserCngStationRepository,
            cng_conversion_center_repository_1.CngConversionCenterRepository,
            civil_servant_installment_verification_repository_1.CivilServantInstallmentVerificationRepository,
            civil_servant_installment_verification_service_1.CivilServantInstallmentVerificationService,
        ],
    })
], CngConversionModule);
//# sourceMappingURL=cng-conversion.module.js.map