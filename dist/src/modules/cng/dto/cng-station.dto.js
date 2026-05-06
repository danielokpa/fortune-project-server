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
exports.FindCngStationsQueryDto = exports.CancelCngTripDto = exports.EndCngTripDto = exports.StartCngTripDto = exports.SearchCngStationsDto = exports.FindCngStationsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class FindCngStationsDto {
    latitude;
    longitude;
    radiusKm;
    country;
    state;
    page;
    limit;
}
exports.FindCngStationsDto = FindCngStationsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User\'s current latitude',
        example: 6.4559,
        type: Number,
    }),
    (0, class_validator_1.IsLatitude)(),
    __metadata("design:type", Number)
], FindCngStationsDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User\'s current longitude',
        example: 3.3970,
        type: Number,
    }),
    (0, class_validator_1.IsLongitude)(),
    __metadata("design:type", Number)
], FindCngStationsDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Radius in kilometers to search for stations',
        example: 10,
        default: 10,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(10000000000000),
    __metadata("design:type", Number)
], FindCngStationsDto.prototype, "radiusKm", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Country name to filter by',
        example: 'Nigeria',
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FindCngStationsDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'State name to filter by',
        example: 'Lagos',
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FindCngStationsDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        name: 'page',
        description: 'Page number for pagination',
        example: 1,
        default: 1,
        minimum: 1,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], FindCngStationsDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        name: 'limit',
        description: 'Limit number of results per page',
        example: 20,
        default: 20,
        minimum: 1,
        maximum: 100,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], FindCngStationsDto.prototype, "limit", void 0);
class SearchCngStationsDto {
    query;
    latitude;
    longitude;
    radiusKm;
    limit;
    offset;
}
exports.SearchCngStationsDto = SearchCngStationsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Search query for name or address',
        example: 'CNG Station',
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], SearchCngStationsDto.prototype, "query", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Latitude coordinate for nearest search',
        example: 6.5244,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsLatitude)(),
    __metadata("design:type", Number)
], SearchCngStationsDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Longitude coordinate for nearest search',
        example: 3.3792,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsLongitude)(),
    __metadata("design:type", Number)
], SearchCngStationsDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Search radius in kilometers (used when latitude/longitude are provided)',
        example: 10,
        default: 10,
        minimum: 1,
        maximum: 10000000000000,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(10000000000000),
    __metadata("design:type", Number)
], SearchCngStationsDto.prototype, "radiusKm", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        name: 'limit',
        description: 'Limit number of results',
        example: 20,
        default: 20,
        minimum: 1,
        maximum: 100,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], SearchCngStationsDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        name: 'offset',
        description: 'Offset for pagination',
        example: 0,
        default: 0,
        minimum: 0,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], SearchCngStationsDto.prototype, "offset", void 0);
class StartCngTripDto {
    id;
    latitude;
    longitude;
}
exports.StartCngTripDto = StartCngTripDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'CNG station ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], StartCngTripDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'User latitude for distance calculation',
        example: 6.5244,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsLatitude)(),
    __metadata("design:type", Number)
], StartCngTripDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'User longitude for distance calculation',
        example: 3.3792,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsLongitude)(),
    __metadata("design:type", Number)
], StartCngTripDto.prototype, "longitude", void 0);
class EndCngTripDto {
    id;
}
exports.EndCngTripDto = EndCngTripDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User CNG station record ID (from user_cng_stations table)',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], EndCngTripDto.prototype, "id", void 0);
class CancelCngTripDto {
    id;
}
exports.CancelCngTripDto = CancelCngTripDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User CNG station record ID (from user_cng_stations table)',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CancelCngTripDto.prototype, "id", void 0);
class FindCngStationsQueryDto {
    page;
    limit;
    country;
    state;
    isActive;
}
exports.FindCngStationsQueryDto = FindCngStationsQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        name: 'page',
        description: 'Page number for pagination',
        example: 1,
        default: 1,
        minimum: 1,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], FindCngStationsQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        name: 'limit',
        description: 'Limit number of results per page',
        example: 10,
        default: 10,
        minimum: 1,
        maximum: 100,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], FindCngStationsQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Country name to filter by',
        example: 'Nigeria',
        type: String,
        maxLength: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], FindCngStationsQueryDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'State name to filter by',
        example: 'Lagos',
        type: String,
        maxLength: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], FindCngStationsQueryDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by active status',
        type: Boolean,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], FindCngStationsQueryDto.prototype, "isActive", void 0);
//# sourceMappingURL=cng-station.dto.js.map