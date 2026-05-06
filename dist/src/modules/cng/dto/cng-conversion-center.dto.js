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
exports.FindCngConversionCentersQueryDto = exports.UpdateCngConversionCenterDto = exports.CreateCngConversionCenterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateCngConversionCenterDto {
    name;
    state;
    country;
    address;
    contactPhone;
    openingTime;
    closingTime;
    amountPerUnit;
    currency;
    amountPerUnitType;
    contactEmail;
    bvn;
    isActive;
    longitude;
    latitude;
    stationImage;
}
exports.CreateCngConversionCenterDto = CreateCngConversionCenterDto;
__decorate([
    (0, swagger_2.ApiProperty)({ example: 'Lekki CNG Conversion Center' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateCngConversionCenterDto.prototype, "name", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ example: 'Lagos' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateCngConversionCenterDto.prototype, "state", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ example: 'Nigeria' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateCngConversionCenterDto.prototype, "country", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ example: '12 Admiralty Way, Lekki Phase 1' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateCngConversionCenterDto.prototype, "address", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ example: '+2348012345678' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateCngConversionCenterDto.prototype, "contactPhone", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ example: '08:00:00' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCngConversionCenterDto.prototype, "openingTime", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ example: '18:00:00' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCngConversionCenterDto.prototype, "closingTime", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ example: 120.5 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCngConversionCenterDto.prototype, "amountPerUnit", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'NGN', default: 'NGN' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateCngConversionCenterDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'kwh', default: 'kwh' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateCngConversionCenterDto.prototype, "amountPerUnitType", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ example: 'support@center.com' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateCngConversionCenterDto.prototype, "contactEmail", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({
        example: '12345678901',
        description: 'BVN used to generate conversion center virtual account',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(11),
    (0, class_validator_1.MaxLength)(11),
    __metadata("design:type", String)
], CreateCngConversionCenterDto.prototype, "bvn", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: true, default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCngConversionCenterDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 3.3792 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCngConversionCenterDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 6.5244 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCngConversionCenterDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'default.png' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateCngConversionCenterDto.prototype, "stationImage", void 0);
class UpdateCngConversionCenterDto extends (0, swagger_1.PartialType)(CreateCngConversionCenterDto) {
}
exports.UpdateCngConversionCenterDto = UpdateCngConversionCenterDto;
class FindCngConversionCentersQueryDto {
    page;
    limit;
    search;
    isActive;
}
exports.FindCngConversionCentersQueryDto = FindCngConversionCentersQueryDto;
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 1, default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], FindCngConversionCentersQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 10, default: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], FindCngConversionCentersQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        example: 'Lekki',
        description: 'Search by center name, address, state or country',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FindCngConversionCentersQueryDto.prototype, "search", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], FindCngConversionCentersQueryDto.prototype, "isActive", void 0);
//# sourceMappingURL=cng-conversion-center.dto.js.map