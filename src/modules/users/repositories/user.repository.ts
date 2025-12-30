import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Length, Model } from 'sequelize-typescript';
import { User } from '../entities/user.entity';
import { UserType } from '../../../enums/user-type.enum';
import { Op } from 'sequelize';
import { Country } from 'src/modules/countries/entities';
import type { GenerateReferalCodeEvent } from '../events/user.events';
import { UserEventListener } from '../listeners/user.listener';
import * as randomstring from 'randomstring';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findByIdentity(identity: string): Promise<User | null> {
    return await this.userModel.findOne({
      where: {
        [Op.or]: [
          { email: identity },
          { phoneNo: identity },
        ],
      },
      raw: true
    });
  }

  async findById(id: string): Promise<User | null> {
    return await this.userModel.findByPk(id, {raw: true});
  }

  async fetchUser(id: string): Promise<User | null> {
    let user = await this.userModel.findByPk(id, {
      attributes: {
        exclude: ['password', 'deletedAt', 'isDisabled'],
      },
      include: [
        {
          model: Country
        },
      ],
    });

    user = user ? (user.toJSON() as User) : null;

    if (user) {
      if (user.referalCode == null) {
        const event: GenerateReferalCodeEvent = {
          userId: user.id,
        };
        const referalCode = await this.processGenerateReferalCode(event);
        if (referalCode) {
          user.referalCode = referalCode;
        }
      }
    }
    return user ;
  }

  async processGenerateReferalCode(event: GenerateReferalCodeEvent) {
    try {
      let referalCode: string | undefined;

      referalCode = randomstring.generate({
        length: 10,
        charset: 'alphanumeric',
      });
      await this.update(event.userId, { referalCode });
      return referalCode;
    } catch (error) {
    }
  }

  async fetchAndUpdateUser(id: string, data: Partial<User>): Promise<User | null> {
    const user = await this.userModel.update(data, {
      where: { id },
      returning: true,
    });

    const updatedUser = await this.userModel.findByPk(id, {raw: true});
    return updatedUser ? (updatedUser.toJSON() as User) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({
      where: { email },
    });
    return user ? (user.toJSON() as User) : null;
  }

  async findByPhone(phoneNo: string): Promise<User | null> {
    const user = await this.userModel.findOne({
      where: { phoneNo }
    });
    return user ? (user.toJSON() as User) : null;
  }

  async findByReferalCode(referalCode: string, excludeUserId?: string): Promise<User | null> {
    const where: any = { referalCode };
    
    if (excludeUserId) {
      where.id = { [Op.ne]: excludeUserId };
    }
    
    const user = await this.userModel.findOne({
      where
    });
    return user ? (user.toJSON() as User) : null;
  }

  async findByEmailAndRole(email: string, userType: UserType): Promise<User | null> {
    return await this.userModel.findOne({
      where: { email, userType },
      raw: true
    });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user =  await this.userModel.create(userData as any, {raw: true, returning: true});
    return user.toJSON() as User
  }

  async update(id: string, userData: Partial<User>): Promise<[number, User[]]> {
    return await this.userModel.update(userData, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: string): Promise<number> {
    return await this.userModel.destroy({
      where: { id },
    });
  }

  async restore(id: string): Promise<void> {
    await this.userModel.restore({
      where: { id },
    });
  }

  async findWithCountry(email: string, userType: UserType): Promise<User | null> {
    return await this.userModel.findOne({
      where: { email, userType },
      include: ['country'],
    });
  }

  async findAll(options?: any): Promise<User[]> {
    return await this.userModel.findAll(options);
  }
}
