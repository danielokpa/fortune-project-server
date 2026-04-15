"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripsModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const trip_entity_1 = require("./entities/trip.entity");
const trip_repository_1 = require("./repositories/trip.repository");
const vehicle_registration_entity_1 = require("../drivers/entities/vehicle-registration.entity");
const vehicle_registration_repository_1 = require("../drivers/repositories/vehicle-registration.repository");
let TripsModule = class TripsModule {
};
exports.TripsModule = TripsModule;
exports.TripsModule = TripsModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([trip_entity_1.Trip, vehicle_registration_entity_1.VehicleRegistration])],
        providers: [trip_repository_1.TripRepository, vehicle_registration_repository_1.VehicleRegistrationRepository],
        exports: [trip_repository_1.TripRepository, vehicle_registration_repository_1.VehicleRegistrationRepository, sequelize_1.SequelizeModule],
    })
], TripsModule);
//# sourceMappingURL=trips.module.js.map