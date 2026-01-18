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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChargingStationRating = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const charging_station_entity_1 = require("./charging-station.entity");
let ChargingStationRating = class ChargingStationRating extends sequelize_typescript_1.Model {
    stationId;
    chargingStation;
    userId;
    rating;
};
exports.ChargingStationRating = ChargingStationRating;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Default)(sequelize_typescript_1.DataType.UUIDV4),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], ChargingStationRating.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.ForeignKey)(() => charging_station_entity_1.ChargingStation),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], ChargingStationRating.prototype, "stationId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => charging_station_entity_1.ChargingStation),
    __metadata("design:type", charging_station_entity_1.ChargingStation)
], ChargingStationRating.prototype, "chargingStation", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], ChargingStationRating.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(3, 2),
        allowNull: false,
    }),
    __metadata("design:type", Number)
], ChargingStationRating.prototype, "rating", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
    }),
    __metadata("design:type", Date)
], ChargingStationRating.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
    }),
    __metadata("design:type", Date)
], ChargingStationRating.prototype, "updatedAt", void 0);
exports.ChargingStationRating = ChargingStationRating = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'charging_station_ratings',
        timestamps: true,
    })
], ChargingStationRating);
//# sourceMappingURL=charging-station-rating.entity.js.map