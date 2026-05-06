import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { CivilServantInstallmentPaymentProof } from '../entities/civil-servant-installment-verification.entity';
import { CivilServantInstallmentVerificationStatus } from 'src/enums/civil-servant-installment-verification-status.enum';

@Injectable()
export class CivilServantInstallmentVerificationRepository {
  constructor(
    @InjectModel(CivilServantInstallmentPaymentProof)
    private readonly model: typeof CivilServantInstallmentPaymentProof,
  ) {}

  async create(
    payload: Partial<CivilServantInstallmentPaymentProof>,
    options?: { transaction?: Transaction },
  ): Promise<CivilServantInstallmentPaymentProof> {
    const row = await this.model.create(payload as any, {
      transaction: options?.transaction,
    });
    return row.toJSON() as CivilServantInstallmentPaymentProof;
  }

  async findByUserId(
    userId: string,
  ): Promise<CivilServantInstallmentPaymentProof | null> {
    return this.model.findOne({
      where: { userId },
      raw: true,
    });
  }

  async findById(
    id: string,
  ): Promise<CivilServantInstallmentPaymentProof | null> {
    return this.model.findByPk(id, { raw: true });
  }

  async updateByUserId(
    userId: string,
    payload: Partial<CivilServantInstallmentPaymentProof>,
    options?: { transaction?: Transaction },
  ): Promise<[number]> {
    return this.model.update(payload, {
      where: { userId },
      transaction: options?.transaction,
    });
  }

  async updateById(
    id: string,
    payload: Partial<CivilServantInstallmentPaymentProof>,
    options?: { transaction?: Transaction },
  ): Promise<[number]> {
    return this.model.update(payload, {
      where: { id },
      transaction: options?.transaction,
    });
  }

  async findAllPaginated(options: {
    page?: number;
    limit?: number;
    status?: CivilServantInstallmentVerificationStatus;
  }): Promise<{ rows: CivilServantInstallmentPaymentProof[]; count: number }> {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const offset = (page - 1) * limit;
    const where: Record<string, unknown> = {};
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

  async deleteByUserId(
    userId: string,
    options?: { transaction?: Transaction },
  ): Promise<number> {
    return this.model.destroy({
      where: { userId },
      transaction: options?.transaction,
    });
  }

  async deleteById(
    id: string,
    options?: { transaction?: Transaction },
  ): Promise<number> {
    return this.model.destroy({
      where: { id },
      transaction: options?.transaction,
    });
  }
}
