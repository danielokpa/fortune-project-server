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
exports.CountryService = void 0;
const common_1 = require("@nestjs/common");
const country_repository_1 = require("../repositories/country.repository");
let CountryService = class CountryService {
    countryRepository;
    constructor(countryRepository) {
        this.countryRepository = countryRepository;
    }
    async findById(id) {
        const country = await this.countryRepository.findById(id);
        if (!country) {
            throw new common_1.NotFoundException('Country not found');
        }
        return country;
    }
    async findByName(name) {
        const country = await this.countryRepository.findByName(name);
        if (!country) {
            throw new common_1.NotFoundException('Country not found');
        }
        return country;
    }
    async findAll(params) {
        return this.countryRepository.findAll(params);
    }
    async create(countryData) {
        const country = await this.countryRepository.create(countryData);
        if (!country) {
            throw new common_1.BadRequestException('Failed to create country');
        }
        return country;
    }
    async update(id, countryData) {
        const updatedCountry = await this.countryRepository.update(id, countryData);
        if (!updatedCountry) {
            throw new common_1.NotFoundException('Country not found for update');
        }
        return updatedCountry;
    }
    async delete(id) {
        const deleted = await this.countryRepository.delete(id);
        if (!deleted) {
            throw new common_1.BadRequestException('Failed to delete country');
        }
        return deleted;
    }
};
exports.CountryService = CountryService;
exports.CountryService = CountryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [country_repository_1.CountryRepository])
], CountryService);
//# sourceMappingURL=country.service.js.map