import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CngConversionStation } from '../entities/cng-conversion.stations.entity';
import { Op, QueryTypes, Sequelize, Transaction } from 'sequelize';

/** Plain row shape (matches raw SQL / JSON), not a Sequelize Model instance */
export type CngConversionCenterRow = Pick<
  CngConversionStation,
  | 'id'
  | 'name'
  | 'state'
  | 'country'
  | 'address'
  | 'contactPhone'
  | 'openingTime'
  | 'closingTime'
  | 'amountPerUnit'
  | 'currency'
  | 'amountPerUnitType'
  | 'contactEmail'
  | 'isActive'
  | 'longitude'
  | 'latitude'
  | 'stationImage'
  | 'createdAt'
  | 'updatedAt'
>;

export type CngConversionCenterWithVirtualAccount = CngConversionCenterRow & {
  virtualAccount: {
    accountName: string;
    bankName: string;
    accountNumber: string;
  } | null;
};

@Injectable()
export class CngConversionCenterRepository {
  constructor(
    @InjectModel(CngConversionStation)
    private readonly centerModel: typeof CngConversionStation,
  ) {}

  getSequelize(): Sequelize | undefined {
    return this.centerModel.sequelize;
  }

  async create(
    payload: Partial<CngConversionStation>,
    options?: { transaction?: Transaction },
  ): Promise<CngConversionStation> {
    const created = await this.centerModel.create(payload as any, {
      transaction: options?.transaction,
    });
    return created.toJSON() as CngConversionStation;
  }

  async update(
    id: string,
    payload: Partial<CngConversionStation>,
  ): Promise<[number, CngConversionStation[]]> {
    return this.centerModel.update(payload, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: string): Promise<number> {
    return this.centerModel.destroy({
      where: { id },
    });
  }

  async findById(
    id: string,
    options?: { transaction?: Transaction },
  ): Promise<CngConversionStation | null> {
    return this.centerModel.findByPk(id, {
      transaction: options?.transaction,
      raw: true,
    });
  }

  /**
   * Raw SQL: center row + optional virtual_accounts (join on virtual_accounts.userId = center.id).
   * Does not use a Sequelize VirtualAccount model.
   */
  async findByIdWithVirtualAccountRaw(
    id: string,
  ): Promise<CngConversionCenterWithVirtualAccount | null> {
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
      type: QueryTypes.SELECT,
    });

    const row = rows[0] as Record<string, unknown> | undefined;
    if (!row) {
      return null;
    }

    const vaAccountNumber = row.va_accountNumber;
    const virtualAccount =
      vaAccountNumber != null && String(vaAccountNumber).length > 0
        ? {
            accountName: String(row.va_accountName ?? ''),
            bankName: String(row.va_bankName ?? ''),
            accountNumber: String(vaAccountNumber),
          }
        : null;

    const {
      va_accountName: _a,
      va_bankName: _b,
      va_accountNumber: _c,
      ...centerFields
    } = row;

    return {
      ...(centerFields as CngConversionCenterRow),
      virtualAccount,
    };
  }

  async findAll(options?: {
    page?: number;
    limit?: number;
    search?: string;
    isActive?: boolean;
  }): Promise<{ rows: CngConversionStation[]; count: number }> {
    const page = options?.page ?? 1;
    const limit = options?.limit ?? 10;
    const offset = (page - 1) * limit;
    const where: any = {};

    if (typeof options?.isActive === 'boolean') {
      where.isActive = options.isActive;
    }

    if (options?.search?.trim()) {
      const pattern = `%${options.search.trim()}%`;
      where[Op.or] = [
        { name: { [Op.like]: pattern } },
        { address: { [Op.like]: pattern } },
        { state: { [Op.like]: pattern } },
        { country: { [Op.like]: pattern } },
      ];
    }

    return this.centerModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });
  }
}
