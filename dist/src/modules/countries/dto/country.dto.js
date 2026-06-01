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
exports.UpdateCountryDto = exports.CreateCountryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateCountryDto {
    name;
    isoCode;
    phoneCode;
    phoneLength;
    currency;
    flag;
}
exports.CreateCountryDto = CreateCountryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Country name',
        example: 'Nigeria',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateCountryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ISO 3166-1 Alpha-2 country code',
        example: 'NG',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsISO31661Alpha2)(),
    __metadata("design:type", String)
], CreateCountryDto.prototype, "isoCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'International phone dialing code',
        example: '+234',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], CreateCountryDto.prototype, "phoneCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Expected phone number length excluding country code',
        example: 11,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateCountryDto.prototype, "phoneLength", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Country currency code',
        example: 'NGN',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], CreateCountryDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Country flag emoji or image URL',
        example: '🇳🇬',
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateCountryDto.prototype, "flag", void 0);
class UpdateCountryDto extends (0, swagger_1.PartialType)(CreateCountryDto) {
}
exports.UpdateCountryDto = UpdateCountryDto;
//# sourceMappingURL=country.dto.js.map