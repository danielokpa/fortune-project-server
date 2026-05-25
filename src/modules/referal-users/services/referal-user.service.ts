import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ReferalUserRepository } from '../repositories/referal-user.repository';
import { ReferalUser } from '../entities/referal-user.entity';

@Injectable()
export class ReferalUserService {
  private readonly logger = new Logger(ReferalUserService.name);

  constructor(private readonly referalUserRepository: ReferalUserRepository) {}

  async create(data: Partial<ReferalUser>): Promise<ReferalUser> {
    this.logger.log('Creating referal user record');
    return await this.referalUserRepository.create(data);
  }

  async findById(id: string): Promise<ReferalUser> {
    const record = await this.referalUserRepository.findById(id);
    if (!record) {
      throw new NotFoundException(`ReferalUser with ID ${id} not found`);
    }
    return record;
  }

  async findByUserId(userId: string): Promise<ReferalUser[]> {
    return await this.referalUserRepository.findByUserId(userId);
  }

  async findByReferredUserId(referredUserId: string): Promise<ReferalUser | null> {
    return await this.referalUserRepository.findByReferredUserId(referredUserId);
  }

  async findByReferalCode(referalCode: string): Promise<ReferalUser[]> {
    return await this.referalUserRepository.findByReferalCode(referalCode);
  }

  async markFirstTripCompleted(id: string): Promise<ReferalUser> {
    const [affectedCount] = await this.referalUserRepository.markFirstTripCompleted(id);
    if (affectedCount === 0) {
      throw new NotFoundException(`ReferalUser with ID ${id} not found`);
    }
    return await this.findById(id);
  }

  async update(id: string, data: Partial<ReferalUser>): Promise<ReferalUser> {
    const [affectedCount] = await this.referalUserRepository.update(id, data);
    if (affectedCount === 0) {
      throw new NotFoundException(`ReferalUser with ID ${id} not found`);
    }
    return await this.findById(id);
  }

  async delete(id: string): Promise<void> {
    const deletedCount = await this.referalUserRepository.delete(id);
    if (deletedCount === 0) {
      throw new NotFoundException(`ReferalUser with ID ${id} not found`);
    }
  }
}
