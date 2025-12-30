import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ReferredUserRepository } from '../repositories/referred-user.repository';
import { ReferredUser } from '../entities/referred-user.entity';

@Injectable()
export class ReferredUserService {
  private readonly logger = new Logger(ReferredUserService.name);

  constructor(private readonly referredUserRepository: ReferredUserRepository) {}

  async create(data: Partial<ReferredUser>): Promise<ReferredUser> {
    this.logger.log('Creating new referred user record');
    return await this.referredUserRepository.create(data);
  }

  async findById(id: string): Promise<ReferredUser> {
    const record = await this.referredUserRepository.findById(id);
    if (!record) {
      throw new NotFoundException(`ReferredUser with ID ${id} not found`);
    }
    return record;
  }

  async findByUserId(userId: string): Promise<ReferredUser[]> {
    return await this.referredUserRepository.findByUserId(userId);
  }

  async findByReferredUserId(referredUserId: string): Promise<ReferredUser | null> {
    return await this.referredUserRepository.findByReferredUserId(referredUserId);
  }

  async findByReferalCode(referalCode: string): Promise<ReferredUser[]> {
    return await this.referredUserRepository.findByReferalCode(referalCode);
  }

  async findAll(options?: {
    limit?: number;
    offset?: number;
    userId?: string;
    referredUserId?: string;
    hasRewarded?: boolean;
  }): Promise<ReferredUser[]> {
    return await this.referredUserRepository.findAll(options);
  }

  async incrementCompletedRides(id: string, increment: number = 1): Promise<ReferredUser> {
    const [affectedCount] = await this.referredUserRepository.incrementCompletedRides(id, increment);
    if (affectedCount === 0) {
      throw new NotFoundException(`ReferredUser with ID ${id} not found`);
    }
    return await this.findById(id);
  }

  async markAsRewarded(id: string): Promise<ReferredUser> {
    const [affectedCount] = await this.referredUserRepository.markAsRewarded(id);
    if (affectedCount === 0) {
      throw new NotFoundException(`ReferredUser with ID ${id} not found`);
    }
    return await this.findById(id);
  }

  async update(id: string, data: Partial<ReferredUser>): Promise<ReferredUser> {
    const [affectedCount] = await this.referredUserRepository.update(id, data);
    if (affectedCount === 0) {
      throw new NotFoundException(`ReferredUser with ID ${id} not found`);
    }
    return await this.findById(id);
  }

  async delete(id: string): Promise<void> {
    const deletedCount = await this.referredUserRepository.delete(id);
    if (deletedCount === 0) {
      throw new NotFoundException(`ReferredUser with ID ${id} not found`);
    }
  }
}

