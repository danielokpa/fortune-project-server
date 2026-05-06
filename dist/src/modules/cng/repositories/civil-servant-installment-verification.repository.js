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
exports.CivilServantInstallmentVerificationRepository = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const civil_servant_installment_verification_entity_1 = require("../entities/civil-servant-installment-verification.entity");
let CivilServantInstallmentVerificationRepository = class CivilServantInstallmentVerificationRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(payload, options) {
        const row = await this.model.create(payload, {
            transaction: options?.transaction,
        });
        return row.toJSON();
    }
    async findByUserId(userId) {
        return this.model.findOne({
            where: { userId },
            raw: true,
        });
    }
    async findById(id) {
        return this.model.findByPk(id, { raw: true });
    }
    async updateByUserId(userId, payload, options) {
        return this.model.update(payload, {
            where: { userId },
            transaction: options?.transaction,
        });
    }
    async updateById(id, payload, options) {
        return this.model.update(payload, {
            where: { id },
            transaction: options?.transaction,
        });
    }
    async findAllPaginated(options) {
        const page = options.page ?? 1;
        const limit = options.limit ?? 10;
        const offset = (page - 1) * limit;
        const where = {};
        if (options.status) {
            where.status = options.status;
        }
        return this.model.findAndCountAll({
            where,
            limit,
            offset,
            order: [['updatedAt', 'DESC']],
            raw: true,
        });
    }
    async deleteByUserId(userId, options) {
        return this.model.destroy({
            where: { userId },
            transaction: options?.transaction,
        });
    }
    async deleteById(id, options) {
        return this.model.destroy({
            where: { id },
            transaction: options?.transaction,
        });
    }
};
exports.CivilServantInstallmentVerificationRepository = CivilServantInstallmentVerificationRepository;
exports.CivilServantInstallmentVerificationRepository = CivilServantInstallmentVerificationRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(civil_servant_installment_verification_entity_1.CivilServantInstallmentPaymentProof)),
    __metadata("design:paramtypes", [Object])
], CivilServantInstallmentVerificationRepository);
//# sourceMappingURL=civil-servant-installment-verification.repository.js.map