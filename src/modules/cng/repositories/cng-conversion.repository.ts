import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QueryTypes } from 'sequelize';
import { UserCngConversionStatus } from 'src/enums/user-cng-conversion-status.enum';
import { CngConversionStation } from '../entities/cng-conversion.stations.entity';
import { UserCngConversion } from '../entities/user.cng-conversion.entity';

export type CivilServantProofSummary = {
  id: string;
  fullName: string;
  idCard: string;
  paySlip: string;
  salary: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserCngConversionDashboardStats = {
  pendingConversions: number;
  completedConversions: number;
  myDrafts: number;
  totalConversions: number;
  /** Present when the user has a non-deleted civil servant installment proof row */
  civilServantProof: CivilServantProofSummary | null;
};

@Injectable()
export class UserCngConversionRepository {
  
  constructor(
    @InjectModel(UserCngConversion)
    private cngConversionModel: typeof UserCngConversion,
  ) {}

  async count(options?: any): Promise<number> {
    const count = await this.cngConversionModel.count(options);
    return typeof count === 'number' ? count : (count as any).length || 0;
  }

  /**
   * Raw SQL: conversion aggregates for the user (subquery) plus optional civil servant
   * proof row via LEFT JOIN on `userId` (non-deleted proof rows only).
   */
  async aggregateUserDashboardStats(
    userId: string,
  ): Promise<UserCngConversionDashboardStats> {
    const sequelize = this.cngConversionModel.sequelize;
    if (!sequelize) {
      throw new Error('Sequelize instance not available on UserCngConversion model');
    }

    const draft = UserCngConversionStatus.IN_DRAFT;
    const approved = UserCngConversionStatus.APPROVED;
    const paymentCompleted = UserCngConversionStatus.PAYMENT_COMPLETED;
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

    type AggRow = {
      myDrafts: string | number | null;
      completedConversions: string | number | null;
      pendingConversions: string | number | null;
      totalConversions: string | number | null;
      proofId: string | null;
      proofFullName: string | null;
      proofIdCard: string | null;
      proofPaySlip: string | null;
      proofSalary: string | number | null;
      proofStatus: string | null;
      proofCreatedAt: Date | null;
      proofUpdatedAt: Date | null;
    };

    const rows = await sequelize.query<AggRow>(sql, {
      replacements: {
        userId,
        draft,
        approved,
        paymentCompleted,
      },
      type: QueryTypes.SELECT,
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

    const num = (v: string | number | null | undefined) => Number(v ?? 0) || 0;

    const civilServantProof =
      row.proofId != null && String(row.proofId).length > 0
        ? {
            id: String(row.proofId),
            fullName: String(row.proofFullName ?? ''),
            idCard: String(row.proofIdCard ?? ''),
            paySlip: String(row.proofPaySlip ?? ''),
            salary: num(row.proofSalary),
            status: String(row.proofStatus ?? ''),
            createdAt: row.proofCreatedAt as Date,
            updatedAt: row.proofUpdatedAt as Date,
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

  async findById(id: string): Promise<UserCngConversion | null> {
    return await this.cngConversionModel.findByPk(id, {raw: true});
  }

  async findByIdForUser(
    id: string,
    userId: string,
  ): Promise<UserCngConversion | null> {
    const row = await this.cngConversionModel.findOne({
      where: { id: id, userId: userId },
      raw: true,
    });
    return row as UserCngConversion | null;
  }

  async findByIdAndUserId(
    id: string,
    userId: string,
  ): Promise<(UserCngConversion & { conversionStation?: CngConversionStation | null }) | null> {
    const row = await this.cngConversionModel.findOne({
      where: { id, userId },
      include: [
        {
          model: CngConversionStation,
          required: false,
        },
      ],
    });
    if (!row) {
      return null;
    }
    return row.get({ plain: true }) as UserCngConversion & {
      conversionStation?: CngConversionStation | null;
    };
  }

  async findAll(options?: any): Promise<UserCngConversion[]> {
    return await this.cngConversionModel.findAll(options);
  }

  async create(cngConversionData: Partial<UserCngConversion>): Promise<UserCngConversion> {
    const cngConversion = await this.cngConversionModel.create(cngConversionData as any, {raw: true, returning: true});
    return cngConversion.toJSON() as UserCngConversion;
  }

  async update(id: string, cngConversionData: Partial<UserCngConversion>): Promise<[number, UserCngConversion[]]> {
    return await this.cngConversionModel.update(cngConversionData, {
      where: { id },
      returning: true,
    });
  }

  async updateForUser(
    id: string,
    userId: string,
    cngConversionData: Partial<UserCngConversion>,
  ): Promise<[number, UserCngConversion[]]> {
    const data = await this.cngConversionModel.update(cngConversionData, {
      where: { id: id, userId: userId },
      returning: true,
    });
    return data;
  }

  async delete(id: string): Promise<number> {
    return await this.cngConversionModel.destroy({
      where: { id },
    });
  }
}

