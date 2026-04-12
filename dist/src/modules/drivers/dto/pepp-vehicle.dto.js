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
exports.PeppVehicleListItemDto = exports.UpdatePeppVehicleDto = exports.CreatePeppVehicleDto = exports.PeppFleetStatus = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var PeppFleetStatus;
(function (PeppFleetStatus) {
    PeppFleetStatus["ACTIVE"] = "active";
    PeppFleetStatus["MAINTENANCE"] = "maintenance";
    PeppFleetStatus["UNASSIGNED"] = "unassigned";
})(PeppFleetStatus || (exports.PeppFleetStatus = PeppFleetStatus = {}));
class CreatePeppVehicleDto {
    licenseNumber;
    brand;
    color;
    plateNumber;
    imagePlateNumber;
    registrationImageUrl;
    year;
    vinNumber;
    driverId;
    expiryDate;
    capacity;
    region;
    fleetStatus;
    isPeppcruiseVehicle;
}
exports.CreatePeppVehicleDto = CreatePeppVehicleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'LAG-847-KJA', description: 'License / registration reference' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], CreatePeppVehicleDto.prototype, "licenseNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Toyota Sienna', description: 'Brand or vehicle type label' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], CreatePeppVehicleDto.prototype, "brand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Silver' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(64),
    __metadata("design:type", String)
], CreatePeppVehicleDto.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'LAG 847-KJA' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(32),
    __metadata("design:type", String)
], CreatePeppVehicleDto.prototype, "plateNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'OCR / image plate text; defaults to plateNumber' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(32),
    __metadata("design:type", String)
], CreatePeppVehicleDto.prototype, "imagePlateNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(2000),
    __metadata("design:type", String)
], CreatePeppVehicleDto.prototype, "registrationImageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: '2020' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(8),
    __metadata("design:type", String)
], CreatePeppVehicleDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreatePeppVehicleDto.prototype, "vinNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Assign to driver UUID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreatePeppVehicleDto.prototype, "driverId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreatePeppVehicleDto.prototype, "expiryDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: 7 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(80),
    __metadata("design:type", Number)
], CreatePeppVehicleDto.prototype, "capacity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: 'Lagos' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(128),
    __metadata("design:type", String)
], CreatePeppVehicleDto.prototype, "region", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: PeppFleetStatus,
        required: false,
        description: 'If omitted, derived from driver assignment',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(PeppFleetStatus),
    __metadata("design:type", String)
], CreatePeppVehicleDto.prototype, "fleetStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePeppVehicleDto.prototype, "isPeppcruiseVehicle", void 0);
class UpdatePeppVehicleDto extends (0, swagger_1.PartialType)(CreatePeppVehicleDto) {
}
exports.UpdatePeppVehicleDto = UpdatePeppVehicleDto;
class PeppVehicleListItemDto {
    id;
    type;
    plateNumber;
    capacity;
    region;
    assignedDriverName;
    assignedDriverPhone;
    status;
}
exports.PeppVehicleListItemDto = PeppVehicleListItemDto;
//# sourceMappingURL=pepp-vehicle.dto.js.map