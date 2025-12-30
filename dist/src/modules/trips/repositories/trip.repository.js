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
let TripRepository = class TripRepository {
    tripModel;
    constructor(tripModel) {
        this.tripModel = tripModel;
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
        return await this.tripModel.findOne({
            where: {
                userId,
                status: {
                    [sequelize_2.Op.in]: [trip_entity_1.TripStatus.PENDING, trip_entity_1.TripStatus.ACCEPTED, trip_entity_1.TripStatus.ON_THE_WAY, trip_entity_1.TripStatus.ARRIVED],
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
    async update(id, data) {
        return await this.tripModel.update(data, {
            where: { id },
            returning: true,
        });
    }
    async updateStatus(id, status) {
        const [affectedCount] = await this.tripModel.update({ status }, { where: { id } });
        if (affectedCount > 0) {
            return await this.findById(id);
        }
        return null;
    }
    async delete(id) {
        return await this.tripModel.destroy({
            where: { id },
        });
    }
};
exports.TripRepository = TripRepository;
exports.TripRepository = TripRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(trip_entity_1.Trip)),
    __metadata("design:paramtypes", [Object])
], TripRepository);
//# sourceMappingURL=trip.repository.js.map