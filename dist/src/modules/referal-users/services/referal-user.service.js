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
var ReferalUserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferalUserService = void 0;
const common_1 = require("@nestjs/common");
const referal_user_repository_1 = require("../repositories/referal-user.repository");
let ReferalUserService = ReferalUserService_1 = class ReferalUserService {
    referalUserRepository;
    logger = new common_1.Logger(ReferalUserService_1.name);
    constructor(referalUserRepository) {
        this.referalUserRepository = referalUserRepository;
    }
    async create(data) {
        this.logger.log('Creating referal user record');
        return await this.referalUserRepository.create(data);
    }
    async findById(id) {
        const record = await this.referalUserRepository.findById(id);
        if (!record) {
            throw new common_1.NotFoundException(`ReferalUser with ID ${id} not found`);
        }
        return record;
    }
    async findByUserId(userId) {
        return await this.referalUserRepository.findByUserId(userId);
    }
    async findByReferredUserId(referredUserId) {
        return await this.referalUserRepository.findByReferredUserId(referredUserId);
    }
    async findByReferalCode(referalCode) {
        return await this.referalUserRepository.findByReferalCode(referalCode);
    }
    async markFirstTripCompleted(id) {
        const [affectedCount] = await this.referalUserRepository.markFirstTripCompleted(id);
        if (affectedCount === 0) {
            throw new common_1.NotFoundException(`ReferalUser with ID ${id} not found`);
        }
        return await this.findById(id);
    }
    async update(id, data) {
        const [affectedCount] = await this.referalUserRepository.update(id, data);
        if (affectedCount === 0) {
            throw new common_1.NotFoundException(`ReferalUser with ID ${id} not found`);
        }
        return await this.findById(id);
    }
    async delete(id) {
        const deletedCount = await this.referalUserRepository.delete(id);
        if (deletedCount === 0) {
            throw new common_1.NotFoundException(`ReferalUser with ID ${id} not found`);
        }
    }
};
exports.ReferalUserService = ReferalUserService;
exports.ReferalUserService = ReferalUserService = ReferalUserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [referal_user_repository_1.ReferalUserRepository])
], ReferalUserService);
//# sourceMappingURL=referal-user.service.js.map