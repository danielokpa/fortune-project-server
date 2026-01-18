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
exports.CngStationFavorite = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const cng_station_entity_1 = require("./cng-station.entity");
let CngStationFavorite = class CngStationFavorite extends sequelize_typescript_1.Model {
    stationId;
    cngStation;
    userId;
};
exports.CngStationFavorite = CngStationFavorite;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Default)(sequelize_typescript_1.DataType.UUIDV4),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], CngStationFavorite.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.ForeignKey)(() => cng_station_entity_1.CngStation),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], CngStationFavorite.prototype, "stationId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => cng_station_entity_1.CngStation),
    __metadata("design:type", cng_station_entity_1.CngStation)
], CngStationFavorite.prototype, "cngStation", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], CngStationFavorite.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
    }),
    __metadata("design:type", Date)
], CngStationFavorite.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
    }),
    __metadata("design:type", Date)
], CngStationFavorite.prototype, "updatedAt", void 0);
exports.CngStationFavorite = CngStationFavorite = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'cng_station_favorites',
        timestamps: true,
    })
], CngStationFavorite);
//# sourceMappingURL=cng-station-favorite.entity.js.map