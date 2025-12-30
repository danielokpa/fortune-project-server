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
var ReferredUserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferredUserService = void 0;
const common_1 = require("@nestjs/common");
const referred_user_repository_1 = require("../repositories/referred-user.repository");
let ReferredUserService = ReferredUserService_1 = class ReferredUserService {
    referredUserRepository;
    logger = new common_1.Logger(ReferredUserService_1.name);
    constructor(referredUserRepository) {
        this.referredUserRepository = referredUserRepository;
    }
    async create(data) {
        this.logger.log('Creating new referred user record');
        return await this.referredUserRepository.create(data);
    }
    async findById(id) {
        const record = await this.referredUserRepository.findById(id);
        if (!record) {
            throw new common_1.NotFoundException(`ReferredUser with ID ${id} not found`);
        }
        return record;
    }
    async findByUserId(userId) {
        return await this.referredUserRepository.findByUserId(userId);
    }
    async findByReferredUserId(referredUserId) {
        return await this.referredUserRepository.findByReferredUserId(referredUserId);
    }
    async findByReferalCode(referalCode) {
        return await this.referredUserRepository.findByReferalCode(referalCode);
    }
    async findAll(options) {
        return await this.referredUserRepository.findAll(options);
    }
    async incrementCompletedRides(id, increment = 1) {
        const [affectedCount] = await this.referredUserRepository.incrementCompletedRides(id, increment);
        if (affectedCount === 0) {
            throw new common_1.NotFoundException(`ReferredUser with ID ${id} not found`);
        }
        return await this.findById(id);
    }
    async markAsRewarded(id) {
        const [affectedCount] = await this.referredUserRepository.markAsRewarded(id);
        if (affectedCount === 0) {
            throw new common_1.NotFoundException(`ReferredUser with ID ${id} not found`);
        }
        return await this.findById(id);
    }
    async update(id, data) {
        const [affectedCount] = await this.referredUserRepository.update(id, data);
        if (affectedCount === 0) {
            throw new common_1.NotFoundException(`ReferredUser with ID ${id} not found`);
        }
        return await this.findById(id);
    }
    async delete(id) {
        const deletedCount = await this.referredUserRepository.delete(id);
        if (deletedCount === 0) {
            throw new common_1.NotFoundException(`ReferredUser with ID ${id} not found`);
        }
    }
};
exports.ReferredUserService = ReferredUserService;
exports.ReferredUserService = ReferredUserService = ReferredUserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [referred_user_repository_1.ReferredUserRepository])
], ReferredUserService);
//# sourceMappingURL=referred-user.service.js.map