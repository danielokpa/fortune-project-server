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
exports.StateRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const db_error_handler_util_1 = require("../../../utils/db-error-handler.util");
let StateRepository = class StateRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        try {
            const state = await this.prisma.state.findUnique({
                where: { id },
            });
            return state;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async findByCountryId(countryId) {
        try {
            const states = await this.prisma.state.findMany({
                where: { countryId },
                orderBy: {
                    name: 'asc',
                }
            });
            return states;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async findAll(options) {
        try {
            const states = await this.prisma.state.findMany(options);
            return states;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async create(stateData) {
        try {
            const state = await this.prisma.state.create({
                data: stateData,
            });
            return state;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async update(id, stateData) {
        try {
            const existingState = await this.prisma.state.findUnique({
                where: { id },
            });
            if (!existingState) {
                throw new common_1.NotFoundException('State not found');
            }
            const updatedState = await this.prisma.state.update({
                where: { id },
                data: stateData,
            });
            return updatedState;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async delete(id) {
        try {
            const existingState = await this.prisma.state.findUnique({
                where: { id },
            });
            if (!existingState) {
                throw new common_1.NotFoundException('State not found');
            }
            await this.prisma.state.delete({
                where: { id },
            });
            return true;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
};
exports.StateRepository = StateRepository;
exports.StateRepository = StateRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StateRepository);
//# sourceMappingURL=state.repository.js.map