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
exports.Trip = exports.TripPaymentStatus = exports.TripStatus = exports.PaymentType = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_entity_1 = require("../../users/entities/user.entity");
const driver_entity_1 = require("../../drivers/entities/driver.entity");
var PaymentType;
(function (PaymentType) {
    PaymentType["PEPP_COIN"] = "PEPP_COIN";
    PaymentType["CASH"] = "CASH";
    PaymentType["PI_COIN"] = "PI_COIN";
    PaymentType["CARD"] = "CARD";
    PaymentType["WALLET"] = "WALLET";
})(PaymentType || (exports.PaymentType = PaymentType = {}));
var TripStatus;
(function (TripStatus) {
    TripStatus["TRIP_BOOKED"] = "TRIP_BOOKED";
    TripStatus["TRIP_ASSIGNED"] = "TRIP_ASSIGNED";
    TripStatus["DRIVER_ARRIVED"] = "DRIVER_ARRIVED";
    TripStatus["DRIVER_ACCEPTED"] = "DRIVER_ACCEPTED";
    TripStatus["DRIVER_DECLINED"] = "DRIVER_DECLINED";
    TripStatus["TRIP_RE_ASSIGN"] = "TRIP_RE_ASSIGN";
    TripStatus["TRIP_STARTED"] = "TRIP_STARTED";
    TripStatus["TRIP_COMPLETED"] = "TRIP_COMPLETED";
    TripStatus["TRIP_CANCELLED_BY_USER"] = "TRIP_CANCELLED_BY_USER";
    TripStatus["TRIP_CANCELLED_BY_DRIVER"] = "TRIP_CANCELLED_BY_DRIVER";
    TripStatus["TRIP_CANCELLED"] = "TRIP_CANCELLED";
})(TripStatus || (exports.TripStatus = TripStatus = {}));
var TripPaymentStatus;
(function (TripPaymentStatus) {
    TripPaymentStatus["UNPAID"] = "UNPAID";
    TripPaymentStatus["PAID"] = "PAID";
})(TripPaymentStatus || (exports.TripPaymentStatus = TripPaymentStatus = {}));
let Trip = class Trip extends sequelize_typescript_1.Model {
};
exports.Trip = Trip;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], Trip.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_entity_1.User),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
    }),
    __metadata("design:type", String)
], Trip.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Trip.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => driver_entity_1.Driver),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
    }),
    __metadata("design:type", String)
], Trip.prototype, "driverId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => driver_entity_1.Driver),
    __metadata("design:type", driver_entity_1.Driver)
], Trip.prototype, "driver", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
        allowNull: true,
    }),
    __metadata("design:type", Number)
], Trip.prototype, "tax", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
    }),
    __metadata("design:type", Number)
], Trip.prototype, "estimatedFee", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
    }),
    __metadata("design:type", Number)
], Trip.prototype, "finalFee", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
    }),
    __metadata("design:type", Date)
], Trip.prototype, "startTime", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
    }),
    __metadata("design:type", Date)
], Trip.prototype, "endTime", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
    }),
    __metadata("design:type", Date)
], Trip.prototype, "driverArrivalTime", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(PaymentType.CASH),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(...Object.values(PaymentType)),
    }),
    __metadata("design:type", String)
], Trip.prototype, "paymentType", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(5000),
        allowNull: true,
    }),
    __metadata("design:type", String)
], Trip.prototype, "dropoffAddress", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(5000),
        allowNull: true,
    }),
    __metadata("design:type", String)
], Trip.prototype, "pickupAddress", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(1000),
        allowNull: true,
    }),
    __metadata("design:type", String)
], Trip.prototype, "pickupLocation", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(1000),
        allowNull: true,
    }),
    __metadata("design:type", String)
], Trip.prototype, "dropoffLocation", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(1000),
        allowNull: true,
    }),
    __metadata("design:type", String)
], Trip.prototype, "stopLocation", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(9, 6),
        allowNull: true,
    }),
    __metadata("design:type", String)
], Trip.prototype, "stopLongitude", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(9, 6),
        allowNull: true,
    }),
    __metadata("design:type", String)
], Trip.prototype, "stopLatitude", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    }),
    __metadata("design:type", Date)
], Trip.prototype, "stopCompletedTime", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(9, 6),
        allowNull: true,
    }),
    __metadata("design:type", String)
], Trip.prototype, "distanceToPickup", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(9, 6),
        allowNull: true,
    }),
    __metadata("design:type", String)
], Trip.prototype, "distanceCovered", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(9, 6),
        allowNull: true,
    }),
    __metadata("design:type", Number)
], Trip.prototype, "pickupLatitude", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(9, 6),
        allowNull: true,
    }),
    __metadata("design:type", Number)
], Trip.prototype, "pickupLongitude", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(9, 6),
        allowNull: true,
    }),
    __metadata("design:type", Number)
], Trip.prototype, "dropoffLatitude", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(9, 6),
        allowNull: true,
    }),
    __metadata("design:type", Number)
], Trip.prototype, "dropoffLongitude", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(TripPaymentStatus.UNPAID),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(...Object.values(TripPaymentStatus)),
    }),
    __metadata("design:type", String)
], Trip.prototype, "paymentStatus", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(TripStatus.TRIP_BOOKED),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(...Object.values(TripStatus)),
    }),
    __metadata("design:type", String)
], Trip.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
    }),
    __metadata("design:type", Date)
], Trip.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    }),
    __metadata("design:type", Date)
], Trip.prototype, "cancelledAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
    }),
    __metadata("design:type", Date)
], Trip.prototype, "completedAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    }),
    __metadata("design:type", Date)
], Trip.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    }),
    __metadata("design:type", Object)
], Trip.prototype, "deletedAt", void 0);
exports.Trip = Trip = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'trips',
        timestamps: true,
        paranoid: true,
        defaultScope: {
            attributes: {
                exclude: ['deletedAt'],
            },
        },
    })
], Trip);
//# sourceMappingURL=trip.entity.js.map