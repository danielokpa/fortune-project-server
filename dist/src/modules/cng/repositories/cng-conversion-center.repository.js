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
exports.CngConversionCenterRepository = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const cng_conversion_stations_entity_1 = require("../entities/cng-conversion.stations.entity");
const sequelize_2 = require("sequelize");
let CngConversionCenterRepository = class CngConversionCenterRepository {
    centerModel;
    constructor(centerModel) {
        this.centerModel = centerModel;
    }
    getSequelize() {
        return this.centerModel.sequelize;
    }
    async create(payload, options) {
        const created = await this.centerModel.create(payload, {
            transaction: options?.transaction,
        });
        return created.toJSON();
    }
    async update(id, payload) {
        return this.centerModel.update(payload, {
            where: { id },
            returning: true,
        });
    }
    async delete(id) {
        return this.centerModel.destroy({
            where: { id },
        });
    }
    async findById(id, options) {
        return this.centerModel.findByPk(id, {
            transaction: options?.transaction,
            raw: true,
        });
    }
    async findByIdWithVirtualAccountRaw(id) {
        const sequelize = this.centerModel.sequelize;
        if (!sequelize) {
            throw new Error('Sequelize instance not available');
        }
        const sql = `
      SELECT
        cs.\`id\`,
        cs.\`name\`,
        cs.\`state\`,
        cs.\`country\`,
        cs.\`address\`,
        cs.\`contactPhone\`,
        cs.\`openingTime\`,
        cs.\`closingTime\`,
        cs.\`amountPerUnit\`,
        cs.\`currency\`,
        cs.\`amountPerUnitType\`,
        cs.\`contactEmail\`,
        cs.\`isActive\`,
        cs.\`longitude\`,
        cs.\`latitude\`,
        cs.\`stationImage\`,
        cs.\`createdAt\`,
        cs.\`updatedAt\`,
        va.\`accountName\` AS va_accountName,
        va.\`bankName\` AS va_bankName,
        va.\`accountNumber\` AS va_accountNumber
      FROM \`cng_conversion_stations\` AS cs
      LEFT JOIN \`virtual_accounts\` AS va ON va.\`userId\` = cs.\`id\`
      WHERE cs.\`id\` = :id AND cs.\`deletedAt\` IS NULL
      LIMIT 1
    `;
        const rows = await sequelize.query(sql, {
            replacements: { id },
            type: sequelize_2.QueryTypes.SELECT,
        });
        const row = rows[0];
        if (!row) {
            return null;
        }
        const vaAccountNumber = row.va_accountNumber;
        const virtualAccount = vaAccountNumber != null && String(vaAccountNumber).length > 0
            ? {
                accountName: String(row.va_accountName ?? ''),
                bankName: String(row.va_bankName ?? ''),
                accountNumber: String(vaAccountNumber),
            }
            : null;
        const { va_accountName: _a, va_bankName: _b, va_accountNumber: _c, ...centerFields } = row;
        return {
            ...centerFields,
            virtualAccount,
        };
    }
    async findAll(options) {
        const page = options?.page ?? 1;
        const limit = options?.limit ?? 10;
        const offset = (page - 1) * limit;
        const where = {};
        if (typeof options?.isActive === 'boolean') {
            where.isActive = options.isActive;
        }
        if (options?.search?.trim()) {
            const pattern = `%${options.search.trim()}%`;
            where[sequelize_2.Op.or] = [
                { name: { [sequelize_2.Op.like]: pattern } },
                { address: { [sequelize_2.Op.like]: pattern } },
                { state: { [sequelize_2.Op.like]: pattern } },
                { country: { [sequelize_2.Op.like]: pattern } },
            ];
        }
        return this.centerModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });
    }
};
exports.CngConversionCenterRepository = CngConversionCenterRepository;
exports.CngConversionCenterRepository = CngConversionCenterRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(cng_conversion_stations_entity_1.CngConversionStation)),
    __metadata("design:paramtypes", [Object])
], CngConversionCenterRepository);
//# sourceMappingURL=cng-conversion-center.repository.js.map