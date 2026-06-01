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
exports.CountryRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const db_error_handler_util_1 = require("../../../utils/db-error-handler.util");
let CountryRepository = class CountryRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        try {
            const country = await this.prisma.country.findUnique({
                where: { id },
            });
            return country;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async findByName(name) {
        try {
            const country = await this.prisma.country.findFirst({
                where: { name },
            });
            return country;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async findAll(options) {
        try {
            const countries = await this.prisma.country.findMany(options);
            return countries;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async create(countryData) {
        try {
            const country = await this.prisma.country.create({
                data: countryData,
            });
            return country;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async update(id, countryData) {
        try {
            const existingCountry = await this.prisma.country.findUnique({
                where: { id },
            });
            if (!existingCountry) {
                throw new common_1.NotFoundException('Country not found');
            }
            const updatedCountry = await this.prisma.country.update({
                where: { id },
                data: countryData,
            });
            return updatedCountry;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async delete(id) {
        try {
            const existingCountry = await this.prisma.country.findUnique({
                where: { id },
            });
            if (!existingCountry) {
                throw new common_1.NotFoundException('Country not found');
            }
            await this.prisma.country.delete({
                where: { id },
            });
            return true;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
};
exports.CountryRepository = CountryRepository;
exports.CountryRepository = CountryRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CountryRepository);
//# sourceMappingURL=country.repository.js.map