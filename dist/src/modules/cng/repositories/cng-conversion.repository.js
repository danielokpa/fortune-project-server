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
exports.UserCngConversionRepository = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
const user_cng_conversion_status_enum_1 = require("../../../enums/user-cng-conversion-status.enum");
const cng_conversion_stations_entity_1 = require("../entities/cng-conversion.stations.entity");
const user_cng_conversion_entity_1 = require("../entities/user.cng-conversion.entity");
let UserCngConversionRepository = class UserCngConversionRepository {
    cngConversionModel;
    constructor(cngConversionModel) {
        this.cngConversionModel = cngConversionModel;
    }
    async count(options) {
        const count = await this.cngConversionModel.count(options);
        return typeof count === 'number' ? count : count.length || 0;
    }
    async aggregateUserDashboardStats(userId) {
        const sequelize = this.cngConversionModel.sequelize;
        if (!sequelize) {
            throw new Error('Sequelize instance not available on UserCngConversion model');
        }
        const draft = user_cng_conversion_status_enum_1.UserCngConversionStatus.IN_DRAFT;
        const approved = user_cng_conversion_status_enum_1.UserCngConversionStatus.APPROVED;
        const paymentCompleted = user_cng_conversion_status_enum_1.UserCngConversionStatus.PAYMENT_COMPLETED;
        const ucTable = this.cngConversionModel.tableName;
        const sql = `
      SELECT
        agg.\`myDrafts\` AS myDrafts,
        agg.\`completedConversions\` AS completedConversions,
        agg.\`pendingConversions\` AS pendingConversions,
        agg.\`totalConversions\` AS totalConversions,
        proof.\`id\` AS proofId,
        proof.\`fullName\` AS proofFullName,
        proof.\`idCard\` AS proofIdCard,
        proof.\`paySlip\` AS proofPaySlip,
        proof.\`salary\` AS proofSalary,
        proof.\`status\` AS proofStatus,
        proof.\`createdAt\` AS proofCreatedAt,
        proof.\`updatedAt\` AS proofUpdatedAt
      FROM (
        SELECT
          SUM(\`status\` = :draft) AS myDrafts,
          SUM(\`status\` IN (:approved, :paymentCompleted)) AS completedConversions,
          SUM(\`status\` NOT IN (:draft, :approved, :paymentCompleted)) AS pendingConversions,
          COUNT(*) AS totalConversions
        FROM \`${ucTable}\`
        WHERE \`userId\` = :userId AND \`deletedAt\` IS NULL
      ) AS agg
      LEFT JOIN \`civil_servant_installment_payment_proofs\` AS proof
        ON proof.\`userId\` = :userId AND proof.\`deletedAt\` IS NULL
    `;
        const rows = await sequelize.query(sql, {
            replacements: {
                userId,
                draft,
                approved,
                paymentCompleted,
            },
            type: sequelize_2.QueryTypes.SELECT,
        });
        const row = rows[0];
        if (!row) {
            return {
                myDrafts: 0,
                completedConversions: 0,
                pendingConversions: 0,
                totalConversions: 0,
                civilServantProof: null,
            };
        }
        const num = (v) => Number(v ?? 0) || 0;
        const civilServantProof = row.proofId != null && String(row.proofId).length > 0
            ? {
                id: String(row.proofId),
                fullName: String(row.proofFullName ?? ''),
                idCard: String(row.proofIdCard ?? ''),
                paySlip: String(row.proofPaySlip ?? ''),
                salary: num(row.proofSalary),
                status: String(row.proofStatus ?? ''),
                createdAt: row.proofCreatedAt,
                updatedAt: row.proofUpdatedAt,
            }
            : null;
        return {
            myDrafts: num(row.myDrafts),
            completedConversions: num(row.completedConversions),
            pendingConversions: num(row.pendingConversions),
            totalConversions: num(row.totalConversions),
            civilServantProof,
        };
    }
    async findById(id) {
        return await this.cngConversionModel.findByPk(id, { raw: true });
    }
    async findByIdForUser(id, userId) {
        const row = await this.cngConversionModel.findOne({
            where: { id: id, userId: userId },
            raw: true,
        });
        return row;
    }
    async findByIdAndUserId(id, userId) {
        const row = await this.cngConversionModel.findOne({
            where: { id, userId },
            include: [
                {
                    model: cng_conversion_stations_entity_1.CngConversionStation,
                    required: false,
                },
            ],
        });
        if (!row) {
            return null;
        }
        return row.get({ plain: true });
    }
    async findAll(options) {
        return await this.cngConversionModel.findAll(options);
    }
    async create(cngConversionData) {
        const cngConversion = await this.cngConversionModel.create(cngConversionData, { raw: true, returning: true });
        return cngConversion.toJSON();
    }
    async update(id, cngConversionData) {
        return await this.cngConversionModel.update(cngConversionData, {
            where: { id },
            returning: true,
        });
    }
    async updateForUser(id, userId, cngConversionData) {
        const data = await this.cngConversionModel.update(cngConversionData, {
            where: { id: id, userId: userId },
            returning: true,
        });
        return data;
    }
    async delete(id) {
        return await this.cngConversionModel.destroy({
            where: { id },
        });
    }
};
exports.UserCngConversionRepository = UserCngConversionRepository;
exports.UserCngConversionRepository = UserCngConversionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_cng_conversion_entity_1.UserCngConversion)),
    __metadata("design:paramtypes", [Object])
], UserCngConversionRepository);
//# sourceMappingURL=cng-conversion.repository.js.map