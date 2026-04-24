"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripRepository = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const trip_entity_1 = require("../entities/trip.entity");
const sequelize_2 = require("sequelize");
const vehicle_registration_entity_1 = require("../../drivers/entities/vehicle-registration.entity");
let TripRepository = class TripRepository {
    tripModel;
    vehicleRegistrationModel;
    constructor(tripModel, vehicleRegistrationModel) {
        this.tripModel = tripModel;
        this.vehicleRegistrationModel = vehicleRegistrationModel;
    }
    async create(data) {
        return await this.tripModel.create(data);
    }
    async findById(id) {
        return await this.tripModel.findByPk(id, {
            include: ['user', 'driver'],
        });
    }
    async findUserActiveTrip(userId) {
        const trip = await this.tripModel.findOne({
            where: {
                userId,
                status: {
                    [sequelize_2.Op.in]: [
                        trip_entity_1.TripStatus.TRIP_BOOKED,
                        trip_entity_1.TripStatus.TRIP_ASSIGNED,
                        trip_entity_1.TripStatus.DRIVER_ACCEPTED,
                        trip_entity_1.TripStatus.DRIVER_ARRIVED,
                        trip_entity_1.TripStatus.TRIP_RE_ASSIGN,
                        trip_entity_1.TripStatus.TRIP_STARTED,
                    ],
                },
            },
            include: [
                {
                    association: 'user',
                    attributes: ['id', 'fullName', 'email', 'phoneNo', 'imageUrl'],
                },
                {
                    association: 'driver',
                    attributes: ['id', 'fullName', 'email', 'phoneNo', 'profileImageUrl'],
                    required: false,
                },
            ],
            order: [['createdAt', 'DESC']],
        });
        if (trip) {
            const vehicleRegistration = await this.vehicleRegistrationModel.findOne({
                where: { driverId: trip.driverId },
                attributes: ['id', 'brandOfVehicle', 'color', 'makeOfVehicle', 'plateNo'],
            });
            return { ...trip.toJSON(), vehicleRegistration: vehicleRegistration?.toJSON(), driverRating: 0, userRating: 0 };
        }
        return null;
    }
    async findDriverActiveTrip(driverId) {
        const trip = await this.tripModel.findOne({
            where: {
                driverId,
                status: {
                    [sequelize_2.Op.in]: [
                        trip_entity_1.TripStatus.TRIP_BOOKED,
                        trip_entity_1.TripStatus.TRIP_ASSIGNED,
                        trip_entity_1.TripStatus.DRIVER_ACCEPTED,
                        trip_entity_1.TripStatus.TRIP_RE_ASSIGN,
                        trip_entity_1.TripStatus.TRIP_STARTED,
                    ],
                },
            },
            include: [
                {
                    association: 'user',
                    attributes: ['id', 'fullName', 'email', 'phoneNo', 'imageUrl'],
                },
                {
                    association: 'driver',
                    attributes: ['id', 'fullName', 'email', 'phoneNo', 'profileImageUrl'],
                    required: false,
                },
            ],
            order: [['createdAt', 'DESC']],
        });
        if (trip) {
            const vehicleRegistration = await this.vehicleRegistrationModel.findOne({
                where: { driverId: trip.driverId },
                attributes: ['id', 'brandOfVehicle', 'color', 'makeOfVehicle', 'plateNo'],
            });
            return { ...trip.toJSON(), vehicleRegistration: vehicleRegistration?.toJSON(), driverRating: 0, userRating: 0 };
        }
        return null;
    }
    async findAll(options) {
        return await this.tripModel.findAll({
            where: {
                ...(options?.userId && { userId: options.userId }),
                ...(options?.driverId && { driverId: options.driverId }),
                ...(options?.status && { status: options.status }),
            },
            include: ['user', 'driver'],
            limit: options?.limit,
            offset: options?.offset,
            order: [['createdAt', 'DESC']],
        });
    }
};
exports.TripRepository = TripRepository;
exports.TripRepository = TripRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(trip_entity_1.Trip)),
    __param(1, (0, sequelize_1.InjectModel)(vehicle_registration_entity_1.VehicleRegistration)),
    __metadata("design:paramtypes", [Object, Object])
], TripRepository);
//# sourceMappingURL=trip.repository.js.map