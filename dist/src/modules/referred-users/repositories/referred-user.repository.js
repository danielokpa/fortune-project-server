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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferredUserRepository = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const referred_user_entity_1 = require("../entities/referred-user.entity");
let ReferredUserRepository = class ReferredUserRepository {
    referredUserModel;
    constructor(referredUserModel) {
        this.referredUserModel = referredUserModel;
    }
    async create(data) {
        return await this.referredUserModel.create(data);
    }
    async findById(id) {
        return await this.referredUserModel.findByPk(id);
    }
    async findByUserId(userId) {
        return await this.referredUserModel.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']],
        });
    }
    async findByReferredUserId(referredUserId) {
        return await this.referredUserModel.findOne({
            where: { referredUserId },
        });
    }
    async findByReferalCode(referalCode) {
        return await this.referredUserModel.findAll({
            where: { referalCode },
            order: [['createdAt', 'DESC']],
        });
    }
    async findAll(options) {
        const where = {};
        if (options?.userId)
            where.userId = options.userId;
        if (options?.referredUserId)
            where.referredUserId = options.referredUserId;
        if (options?.hasRewarded !== undefined)
            where.hasRewarded = options.hasRewarded;
        return await this.referredUserModel.findAll({
            where,
            limit: options?.limit,
            offset: options?.offset,
            order: [['createdAt', 'DESC']],
        });
    }
    async update(id, data) {
        return await this.referredUserModel.update(data, {
            where: { id },
            returning: true,
        });
    }
    async incrementCompletedRides(id, increment = 1) {
        const record = await this.findById(id);
        if (!record) {
            throw new Error(`ReferredUser with id ${id} not found`);
        }
        return await this.update(id, {
            completedRides: record.completedRides + increment,
        });
    }
    async markAsRewarded(id) {
        return await this.update(id, { hasRewarded: true });
    }
    async delete(id) {
        return await this.referredUserModel.destroy({
            where: { id },
        });
    }
};
exports.ReferredUserRepository = ReferredUserRepository;
exports.ReferredUserRepository = ReferredUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(referred_user_entity_1.ReferredUser)),
    __metadata("design:paramtypes", [Object])
], ReferredUserRepository);
//# sourceMappingURL=referred-user.repository.js.map