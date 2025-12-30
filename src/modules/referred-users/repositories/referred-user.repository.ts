import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ReferredUser } from '../entities/referred-user.entity';

@Injectable()
export class ReferredUserRepository {
  constructor(
    @InjectModel(ReferredUser)
    private readonly referredUserModel: typeof ReferredUser,
  ) {}

  async create(data: Partial<ReferredUser>): Promise<ReferredUser> {
    return await this.referredUserModel.create(data as any);
  }

  async findById(id: string): Promise<ReferredUser | null> {
    return await this.referredUserModel.findByPk(id);
  }

  async findByUserId(userId: string): Promise<ReferredUser[]> {
    return await this.referredUserModel.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });
  }

  async findByReferredUserId(referredUserId: string): Promise<ReferredUser | null> {
    return await this.referredUserModel.findOne({
      where: { referredUserId },
    });
  }

  async findByReferalCode(referalCode: string): Promise<ReferredUser[]> {
    return await this.referredUserModel.findAll({
      where: { referalCode },
      order: [['createdAt', 'DESC']],
    });
  }

  async findAll(options?: {
    limit?: number;
    offset?: number;
    userId?: string;
    referredUserId?: string;
    hasRewarded?: boolean;
  }): Promise<ReferredUser[]> {
    const where: any = {};
    if (options?.userId) where.userId = options.userId;
    if (options?.referredUserId) where.referredUserId = options.referredUserId;
    if (options?.hasRewarded !== undefined) where.hasRewarded = options.hasRewarded;

    return await this.referredUserModel.findAll({
      where,
      limit: options?.limit,
      offset: options?.offset,
      order: [['createdAt', 'DESC']],
    });
  }

  async update(id: string, data: Partial<ReferredUser>): Promise<[number, ReferredUser[]]> {
    return await this.referredUserModel.update(data, {
      where: { id },
      returning: true,
    });
  }

  async incrementCompletedRides(id: string, increment: number = 1): Promise<[number, ReferredUser[]]> {
    const record = await this.findById(id);
    if (!record) {
      throw new Error(`ReferredUser with id ${id} not found`);
    }
    return await this.update(id, {
      completedRides: record.completedRides + increment,
    });
  }

  async markAsRewarded(id: string): Promise<[number, ReferredUser[]]> {
    return await this.update(id, { hasRewarded: true });
  }

  async delete(id: string): Promise<number> {
    return await this.referredUserModel.destroy({
      where: { id },
    });
  }
}

