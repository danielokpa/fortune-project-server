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
exports.VehicleRepository = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const vehicle_entity_1 = require("../entities/vehicle.entity");
const driver_entity_1 = require("../entities/driver.entity");
let VehicleRepository = class VehicleRepository {
    vehicleModel;
    constructor(vehicleModel) {
        this.vehicleModel = vehicleModel;
    }
    async create(data, options) {
        const row = await this.vehicleModel.create(data, {
            transaction: options?.transaction,
        });
        return row;
    }
    async findByPk(id, opts) {
        return this.vehicleModel.findByPk(id, opts);
    }
    async findPeppFleet(where) {
        const clause = {
            isPeppcruiseVehicle: true,
        };
        if (where.fleetStatus) {
            clause['fleetStatus'] = where.fleetStatus;
        }
        return this.vehicleModel.findAll({
            where: clause,
            include: [
                {
                    model: driver_entity_1.Driver,
                    attributes: ['id', 'fullName', 'phoneNo', 'email'],
                    required: false,
                },
            ],
            order: [['createdAt', 'DESC']],
        });
    }
    async updateById(id, patch) {
        return this.vehicleModel.update(patch, { where: { id }, returning: true });
    }
};
exports.VehicleRepository = VehicleRepository;
exports.VehicleRepository = VehicleRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(vehicle_entity_1.Vehicle)),
    __metadata("design:paramtypes", [Object])
], VehicleRepository);
//# sourceMappingURL=vehicle.repository.js.map