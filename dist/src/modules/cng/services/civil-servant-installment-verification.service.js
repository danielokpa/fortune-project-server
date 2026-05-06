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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CivilServantInstallmentVerificationService = void 0;
const common_1 = require("@nestjs/common");
const civil_servant_installment_verification_repository_1 = require("../repositories/civil-servant-installment-verification.repository");
const civil_servant_installment_verification_status_enum_1 = require("../../../enums/civil-servant-installment-verification-status.enum");
let CivilServantInstallmentVerificationService = class CivilServantInstallmentVerificationService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(userId, dto) {
        const existing = await this.repository.findByUserId(userId);
        if (existing) {
            throw new common_1.ConflictException('Civil servant installment verification already exists for this user');
        }
        const data = await this.repository.create({
            userId,
            fullName: dto.fullName,
            idCard: dto.idCard,
            paySlip: dto.paySlip,
            salary: dto.salary,
            status: civil_servant_installment_verification_status_enum_1.CivilServantInstallmentVerificationStatus.PENDING,
        });
        return data;
    }
    async fetchUser(userId) {
        return this.repository.findByUserId(userId);
    }
    async updateStatusById(id, dto) {
        const row = await this.repository.findById(id);
        if (!row) {
            throw new common_1.NotFoundException(`Civil servant installment verification ${id} not found`);
        }
        await this.repository.updateById(id, { status: dto.status });
        const updated = await this.repository.findById(id);
        if (!updated) {
            throw new common_1.NotFoundException('Civil servant installment verification not found after status update');
        }
        return updated;
    }
    async findAllForAdmin(options) {
        return this.repository.findAllPaginated(options);
    }
    async deleteUser(userId) {
        const row = await this.repository.findByUserId(userId);
        if (!row) {
            throw new common_1.NotFoundException('Civil servant installment verification not found');
        }
        if (row.status !== civil_servant_installment_verification_status_enum_1.CivilServantInstallmentVerificationStatus.PENDING) {
            throw new common_1.BadRequestException('Only PENDING submissions can be deleted');
        }
        const removed = await this.repository.deleteByUserId(userId);
        if (removed === 0) {
            throw new common_1.NotFoundException('Civil servant installment verification not found');
        }
    }
    async deleteByIdForAdmin(id) {
        const row = await this.repository.findById(id);
        if (!row) {
            throw new common_1.NotFoundException(`Civil servant installment verification ${id} not found`);
        }
        if (row.status !== civil_servant_installment_verification_status_enum_1.CivilServantInstallmentVerificationStatus.PENDING) {
            throw new common_1.BadRequestException('Only submissions in PENDING status can be deleted');
        }
        const removed = await this.repository.deleteById(id);
        if (removed === 0) {
            throw new common_1.NotFoundException(`Civil servant installment verification ${id} not found`);
        }
    }
};
exports.CivilServantInstallmentVerificationService = CivilServantInstallmentVerificationService;
exports.CivilServantInstallmentVerificationService = CivilServantInstallmentVerificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [civil_servant_installment_verification_repository_1.CivilServantInstallmentVerificationRepository])
], CivilServantInstallmentVerificationService);
//# sourceMappingURL=civil-servant-installment-verification.service.js.map