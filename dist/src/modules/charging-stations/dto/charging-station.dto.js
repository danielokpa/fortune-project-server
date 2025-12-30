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
exports.CancelTripDto = exports.EndTripDto = exports.StartTripDto = exports.SearchChargingStationsDto = exports.FindNearbyStationsDto = exports.FindChargingStationsDto = exports.UpdateUserChargingStationDto = exports.AddUserChargingStationDto = exports.UpdateChargingStationDto = exports.CreateChargingStationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateChargingStationDto {
    name;
    country;
    state;
    address;
    contactPhone;
    contactEmail;
    openingTime;
    closingTime;
    amountPerUnit;
    currency;
    amountPerUnitType;
    latitude;
    longitude;
    rating;
    reviews;
    isActive;
}
exports.CreateChargingStationDto = CreateChargingStationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the charging station',
        example: 'Tesla Supercharger - Lagos',
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateChargingStationDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Country name',
        example: 'Nigeria',
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateChargingStationDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'State name',
        example: 'Lagos',
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateChargingStationDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Full address of the charging station',
        example: '123 Victoria Island, Lagos',
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateChargingStationDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contact phone number',
        example: '+2348100000000',
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateChargingStationDto.prototype, "contactPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contact email address',
        example: 'contact@chargingstation.com',
        maxLength: 100,
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateChargingStationDto.prototype, "contactEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Opening time (HH:mm format)',
        example: '08:00',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateChargingStationDto.prototype, "openingTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Closing time (HH:mm format)',
        example: '22:00',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateChargingStationDto.prototype, "closingTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Amount per unit',
        example: 50.00,
        type: Number,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateChargingStationDto.prototype, "amountPerUnit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Currency code',
        example: 'NGN',
        default: 'NGN',
        maxLength: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateChargingStationDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Amount per unit type',
        example: 'kwh',
        default: 'kwh',
        maxLength: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateChargingStationDto.prototype, "amountPerUnitType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Latitude coordinate',
        example: 6.5244,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsLatitude)(),
    __metadata("design:type", Number)
], CreateChargingStationDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Longitude coordinate',
        example: 3.3792,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsLongitude)(),
    __metadata("design:type", Number)
], CreateChargingStationDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Initial rating (defaults to 0)',
        example: 0,
        minimum: 0,
        maximum: 5,
        default: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], CreateChargingStationDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Initial review count (defaults to 0)',
        example: 0,
        minimum: 0,
        default: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateChargingStationDto.prototype, "reviews", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether the station is active (defaults to true)',
        example: true,
        default: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateChargingStationDto.prototype, "isActive", void 0);
class UpdateChargingStationDto {
    name;
    country;
    state;
    address;
    contactPhone;
    contactEmail;
    openingTime;
    closingTime;
    amountPerUnit;
    currency;
    amountPerUnitType;
    latitude;
    longitude;
    rating;
    reviews;
    isActive;
}
exports.UpdateChargingStationDto = UpdateChargingStationDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Name of the charging station',
        example: 'Tesla Supercharger - Lagos Updated',
        maxLength: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateChargingStationDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Country name',
        example: 'Nigeria',
        maxLength: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateChargingStationDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'State name',
        example: 'Lagos',
        maxLength: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateChargingStationDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Full address of the charging station',
        example: '123 Victoria Island, Lagos',
        maxLength: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateChargingStationDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Contact phone number',
        example: '+2348100000000',
        maxLength: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateChargingStationDto.prototype, "contactPhone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Contact email address',
        example: 'contact@chargingstation.com',
        maxLength: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateChargingStationDto.prototype, "contactEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Opening time (HH:mm format)',
        example: '08:00',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateChargingStationDto.prototype, "openingTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Closing time (HH:mm format)',
        example: '22:00',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateChargingStationDto.prototype, "closingTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Amount per unit',
        example: 50.00,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateChargingStationDto.prototype, "amountPerUnit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Currency code',
        example: 'NGN',
        maxLength: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateChargingStationDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Amount per unit type',
        example: 'kwh',
        maxLength: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateChargingStationDto.prototype, "amountPerUnitType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Latitude coordinate',
        example: 6.5244,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsLatitude)(),
    __metadata("design:type", Number)
], UpdateChargingStationDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Longitude coordinate',
        example: 3.3792,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsLongitude)(),
    __metadata("design:type", Number)
], UpdateChargingStationDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Rating',
        example: 4,
        minimum: 0,
        maximum: 5,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], UpdateChargingStationDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Review count',
        example: 150,
        minimum: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateChargingStationDto.prototype, "reviews", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether the station is active',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateChargingStationDto.prototype, "isActive", void 0);
class AddUserChargingStationDto {
    chargingStationId;
    latitude;
    longitude;
    isFavorite;
}
exports.AddUserChargingStationDto = AddUserChargingStationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Charging station ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AddUserChargingStationDto.prototype, "chargingStationId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'User latitude for distance calculation',
        example: 6.5244,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsLatitude)(),
    __metadata("design:type", Number)
], AddUserChargingStationDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'User longitude for distance calculation',
        example: 3.3792,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsLongitude)(),
    __metadata("design:type", Number)
], AddUserChargingStationDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Mark as favorite',
        example: false,
        default: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AddUserChargingStationDto.prototype, "isFavorite", void 0);
class UpdateUserChargingStationDto {
    isFavorite;
    latitude;
    longitude;
}
exports.UpdateUserChargingStationDto = UpdateUserChargingStationDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Mark as favorite',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateUserChargingStationDto.prototype, "isFavorite", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'User latitude for distance calculation',
        example: 6.5244,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsLatitude)(),
    __metadata("design:type", Number)
], UpdateUserChargingStationDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'User longitude for distance calculation',
        example: 3.3792,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsLongitude)(),
    __metadata("design:type", Number)
], UpdateUserChargingStationDto.prototype, "longitude", void 0);
class FindChargingStationsDto {
    page;
    limit;
    country;
    state;
    isActive;
    latitude;
    longitude;
    radiusKm;
}
exports.FindChargingStationsDto = FindChargingStationsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        name: 'page',
        required: false,
        type: Number,
        example: 1,
        minimum: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], FindChargingStationsDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        name: 'limit',
        required: false,
        type: Number,
        example: 10,
        minimum: 1,
        maximum: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], FindChargingStationsDto.prototype, "limit", void 0);
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
], FindChargingStationsDto.prototype, "country", void 0);
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
], FindChargingStationsDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by active status',
        type: Boolean,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], FindChargingStationsDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'User\'s current latitude for nearby search',
        example: 6.5244,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsLatitude)(),
    __metadata("design:type", Number)
], FindChargingStationsDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'User\'s current longitude for nearby search',
        example: 3.3792,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsLongitude)(),
    __metadata("design:type", Number)
], FindChargingStationsDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Search radius in kilometers (used when latitude/longitude are provided)',
        example: 10,
        default: 10,
        minimum: 1,
        maximum: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], FindChargingStationsDto.prototype, "radiusKm", void 0);
class FindNearbyStationsDto {
    latitude;
    longitude;
    radiusKm;
    page;
    limit;
}
exports.FindNearbyStationsDto = FindNearbyStationsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Latitude coordinate',
        example: 6.5244,
        type: Number,
    }),
    (0, class_validator_1.IsLatitude)(),
    __metadata("design:type", Number)
], FindNearbyStationsDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Longitude coordinate',
        example: 3.3792,
        type: Number,
    }),
    (0, class_validator_1.IsLongitude)(),
    __metadata("design:type", Number)
], FindNearbyStationsDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Search radius in kilometers',
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
], FindNearbyStationsDto.prototype, "radiusKm", void 0);
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
], FindNearbyStationsDto.prototype, "page", void 0);
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
], FindNearbyStationsDto.prototype, "limit", void 0);
class SearchChargingStationsDto {
    query;
    latitude;
    longitude;
    radiusKm;
    limit;
    offset;
}
exports.SearchChargingStationsDto = SearchChargingStationsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Search query for name or address',
        example: 'Tesla Supercharger',
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], SearchChargingStationsDto.prototype, "query", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Latitude coordinate for nearest search',
        example: 6.5244,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsLatitude)(),
    __metadata("design:type", Number)
], SearchChargingStationsDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Longitude coordinate for nearest search',
        example: 3.3792,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsLongitude)(),
    __metadata("design:type", Number)
], SearchChargingStationsDto.prototype, "longitude", void 0);
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
], SearchChargingStationsDto.prototype, "radiusKm", void 0);
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
], SearchChargingStationsDto.prototype, "limit", void 0);
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
], SearchChargingStationsDto.prototype, "offset", void 0);
class StartTripDto {
    id;
    latitude;
    longitude;
}
exports.StartTripDto = StartTripDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Charging station ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], StartTripDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'User latitude for distance calculation',
        example: 6.5244,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsLatitude)(),
    __metadata("design:type", Number)
], StartTripDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'User longitude for distance calculation',
        example: 3.3792,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsLongitude)(),
    __metadata("design:type", Number)
], StartTripDto.prototype, "longitude", void 0);
class EndTripDto {
    id;
}
exports.EndTripDto = EndTripDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User charging station record ID (from user_charging_stations table)',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], EndTripDto.prototype, "id", void 0);
class CancelTripDto {
    id;
}
exports.CancelTripDto = CancelTripDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User charging station record ID (from user_charging_stations table)',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CancelTripDto.prototype, "id", void 0);
//# sourceMappingURL=charging-station.dto.js.map