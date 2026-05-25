import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ReferalUser } from '../entities/referal-user.entity';

@Injectable()
export class ReferalUserRepository {
  constructor(
    @InjectModel(ReferalUser)
    private readonly referalUserModel: typeof ReferalUser,
  ) {}

  async create(data: Partial<ReferalUser>): Promise<ReferalUser> {
    return await this.referalUserModel.create(data as ReferalUser);
  }

  async findById(id: string): Promise<ReferalUser | null> {
    return await this.referalUserModel.findByPk(id);
  }

  async findByUserId(userId: string): Promise<ReferalUser[]> {
    return await this.referalUserModel.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });
  }

  async findByReferredUserId(referredUserId: string): Promise<ReferalUser | null> {
    return await this.referalUserModel.findOne({
      where: { referredUserId },
    });
  }

  async findByReferalCode(referalCode: string): Promise<ReferalUser[]> {
    return await this.referalUserModel.findAll({
      where: { referalCode },
      order: [['createdAt', 'DESC']],
    });
  }

  async update(id: string, data: Partial<ReferalUser>): Promise<[number, ReferalUser[]]> {
    return await this.referalUserModel.update(data, {
      where: { id },
      returning: true,
    });
  }

  async markFirstTripCompleted(id: string): Promise<[number, ReferalUser[]]> {
    return await this.update(id, { hasCompletedFirstTrip: true });
  }

  async delete(id: string): Promise<number> {
    return await this.referalUserModel.destroy({
      where: { id },
    });
  }
}
