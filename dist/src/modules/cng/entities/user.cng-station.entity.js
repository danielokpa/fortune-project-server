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
exports.UserCngStation = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const cng_station_entity_1 = require("./cng-station.entity");
const self_trip_status_enum_1 = require("../../../enums/self-trip-status.enum");
const user_type_enum_1 = require("../../../enums/user-type.enum");
let UserCngStation = class UserCngStation extends sequelize_typescript_1.Model {
    userId;
    cngStationId;
    cngStation;
    isFavorite;
    longitude;
    latitude;
    distance;
    selfTripStatus;
    userType;
};
exports.UserCngStation = UserCngStation;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Default)(sequelize_typescript_1.DataType.UUIDV4),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], UserCngStation.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], UserCngStation.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.ForeignKey)(() => cng_station_entity_1.CngStation),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], UserCngStation.prototype, "cngStationId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => cng_station_entity_1.CngStation),
    __metadata("design:type", cng_station_entity_1.CngStation)
], UserCngStation.prototype, "cngStation", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], UserCngStation.prototype, "isFavorite", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 8),
        allowNull: true,
    }),
    __metadata("design:type", Number)
], UserCngStation.prototype, "longitude", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(11, 8),
        allowNull: true,
    }),
    __metadata("design:type", Number)
], UserCngStation.prototype, "latitude", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 8),
        allowNull: true,
    }),
    __metadata("design:type", Number)
], UserCngStation.prototype, "distance", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('START_TRIP', 'ONGOING_TRIP', 'CANCEL', 'END_TRIP'),
        allowNull: true,
    }),
    __metadata("design:type", String)
], UserCngStation.prototype, "selfTripStatus", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('SUPER_ADMIN', 'PEPP_ADMIN', 'PEPP_MANAGER', 'USER', 'DRIVER'),
        allowNull: true,
    }),
    __metadata("design:type", String)
], UserCngStation.prototype, "userType", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
    }),
    __metadata("design:type", Date)
], UserCngStation.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
    }),
    __metadata("design:type", Date)
], UserCngStation.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    }),
    __metadata("design:type", Object)
], UserCngStation.prototype, "deletedAt", void 0);
exports.UserCngStation = UserCngStation = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'user_cng_stations',
        timestamps: true,
        paranoid: true,
        defaultScope: {
            attributes: {
                exclude: ['deletedAt'],
            },
        },
    })
], UserCngStation);
//# sourceMappingURL=user.cng-station.entity.js.map