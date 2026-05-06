import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CivilServantInstallmentVerificationRepository } from '../repositories/civil-servant-installment-verification.repository';
import { CivilServantInstallmentPaymentProof } from '../entities/civil-servant-installment-verification.entity';
import { CivilServantInstallmentVerificationStatus } from 'src/enums/civil-servant-installment-verification-status.enum';
import {
  CreateCivilServantInstallmentUserInfoDto,
  UpdateCivilServantInstallmentUserInfoDto,
  UpdateCivilServantInstallmentStatusDto,
} from '../dto/civil-servant-installment-verification.dto';

@Injectable()
export class CivilServantInstallmentVerificationService {
  constructor(
    private readonly repository: CivilServantInstallmentVerificationRepository,
  ) {}

  async create(
    userId: string,
    dto: CreateCivilServantInstallmentUserInfoDto,
  ): Promise<CivilServantInstallmentPaymentProof> {
    const existing = await this.repository.findByUserId(userId);
    if (existing) {
      throw new ConflictException(
        'Civil servant installment verification already exists for this user',
      );
    }
    const data = await this.repository.create({
      userId,
      fullName: dto.fullName,
      idCard: dto.idCard,
      paySlip: dto.paySlip,
      salary: dto.salary,
      status: CivilServantInstallmentVerificationStatus.PENDING,
    });

    return data;
  }

  async fetchUser(
    userId: string,
  ): Promise<CivilServantInstallmentPaymentProof | null> {
    return this.repository.findByUserId(userId);
  }

  // async updateUser(
  //   userId: string,
  //   dto: UpdateCivilServantInstallmentUserInfoDto,
  // ): Promise<CivilServantInstallmentPaymentProof> {
  //   const row = await this.repository.findByUserId(userId);
  //   if (!row) {
  //     throw new NotFoundException(
  //       'Civil servant installment verification not found',
  //     );
  //   }
  //   if (row.status !== CivilServantInstallmentVerificationStatus.PENDING) {
  //     throw new BadRequestException(
  //       'Only submissions in PENDING status can be edited',
  //     );
  //   }
  //   const payload: Partial<CivilServantInstallmentPaymentProof> = {};
  //   if (dto.fullName !== undefined) payload.fullName = dto.fullName;
  //   if (dto.idCard !== undefined) payload.idCard = dto.idCard;
  //   if (dto.paySlip !== undefined) payload.paySlip = dto.paySlip;
  //   if (dto.salary !== undefined) payload.salary = dto.salary;

  //   await this.repository.updateByUserId(userId, payload);
  //   const updated = await this.repository.findByUserId(userId);
  //   if (!updated) {
  //     throw new NotFoundException(
  //       'Civil servant installment verification not found after update',
  //     );
  //   }
  //   return updated;
  // }

  async updateStatusById(
    id: string,
    dto: UpdateCivilServantInstallmentStatusDto,
  ): Promise<CivilServantInstallmentPaymentProof> {
    const row = await this.repository.findById(id);
    if (!row) {
      throw new NotFoundException(
        `Civil servant installment verification ${id} not found`,
      );
    }
    await this.repository.updateById(id, { status: dto.status });
    const updated = await this.repository.findById(id);
    if (!updated) {
      throw new NotFoundException(
        'Civil servant installment verification not found after status update',
      );
    }
    return updated;
  }

  async findAllForAdmin(options: {
    page?: number;
    limit?: number;
    status?: CivilServantInstallmentVerificationStatus;
  }) {
    return this.repository.findAllPaginated(options);
  }

  async deleteUser(userId: string): Promise<void> {
    const row = await this.repository.findByUserId(userId);
    if (!row) {
      throw new NotFoundException(
        'Civil servant installment verification not found',
      );
    }
    if (row.status !== CivilServantInstallmentVerificationStatus.PENDING) {
      throw new BadRequestException(
        'Only PENDING submissions can be deleted',
      );
    }
    const removed = await this.repository.deleteByUserId(userId);
    if (removed === 0) {
      throw new NotFoundException(
        'Civil servant installment verification not found',
      );
    }
  }

  async deleteByIdForAdmin(id: string): Promise<void> {
    const row = await this.repository.findById(id);
    if (!row) {
      throw new NotFoundException(
        `Civil servant installment verification ${id} not found`,
      );
    }
    if (row.status !== CivilServantInstallmentVerificationStatus.PENDING) {
      throw new BadRequestException(
        'Only submissions in PENDING status can be deleted',
      );
    }
    const removed = await this.repository.deleteById(id);
    if (removed === 0) {
      throw new NotFoundException(
        `Civil servant installment verification ${id} not found`,
      );
    }
  }
}
