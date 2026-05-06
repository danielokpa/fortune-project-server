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
exports.UpdateCivilServantInstallmentStatusDto = exports.UpdateCivilServantInstallmentUserInfoDto = exports.CreateCivilServantInstallmentUserInfoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const civil_servant_installment_verification_status_enum_1 = require("../../../enums/civil-servant-installment-verification-status.enum");
class CreateCivilServantInstallmentUserInfoDto {
    fullName;
    idCard;
    paySlip;
    salary;
}
exports.CreateCivilServantInstallmentUserInfoDto = CreateCivilServantInstallmentUserInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Jane Doe' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateCivilServantInstallmentUserInfoDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID card document URL or storage key',
        example: 'https://cdn.example.com/docs/id-card.pdf',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(1024),
    __metadata("design:type", String)
], CreateCivilServantInstallmentUserInfoDto.prototype, "idCard", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Pay slip document URL or storage key',
        example: 'https://cdn.example.com/docs/payslip.pdf',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(1024),
    __metadata("design:type", String)
], CreateCivilServantInstallmentUserInfoDto.prototype, "paySlip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 450000.5 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateCivilServantInstallmentUserInfoDto.prototype, "salary", void 0);
class UpdateCivilServantInstallmentUserInfoDto extends (0, swagger_1.PartialType)(CreateCivilServantInstallmentUserInfoDto) {
}
exports.UpdateCivilServantInstallmentUserInfoDto = UpdateCivilServantInstallmentUserInfoDto;
class UpdateCivilServantInstallmentStatusDto {
    status;
}
exports.UpdateCivilServantInstallmentStatusDto = UpdateCivilServantInstallmentStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: civil_servant_installment_verification_status_enum_1.CivilServantInstallmentVerificationStatus,
        example: civil_servant_installment_verification_status_enum_1.CivilServantInstallmentVerificationStatus.VERIFIED,
    }),
    (0, class_validator_1.IsEnum)(civil_servant_installment_verification_status_enum_1.CivilServantInstallmentVerificationStatus),
    __metadata("design:type", String)
], UpdateCivilServantInstallmentStatusDto.prototype, "status", void 0);
//# sourceMappingURL=civil-servant-installment-verification.dto.js.map