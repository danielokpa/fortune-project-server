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
exports.CivilServantInstallmentPaymentProof = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_entity_1 = require("../../users/entities/user.entity");
const civil_servant_installment_verification_status_enum_1 = require("../../../enums/civil-servant-installment-verification-status.enum");
let CivilServantInstallmentPaymentProof = class CivilServantInstallmentPaymentProof extends sequelize_typescript_1.Model {
    fullName;
    idCard;
    paySlip;
    salary;
    userId;
    user;
    status;
};
exports.CivilServantInstallmentPaymentProof = CivilServantInstallmentPaymentProof;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Default)(sequelize_typescript_1.DataType.UUIDV4),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], CivilServantInstallmentPaymentProof.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(200)),
    __metadata("design:type", String)
], CivilServantInstallmentPaymentProof.prototype, "fullName", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(1024)),
    __metadata("design:type", String)
], CivilServantInstallmentPaymentProof.prototype, "idCard", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(1024)),
    __metadata("design:type", String)
], CivilServantInstallmentPaymentProof.prototype, "paySlip", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DECIMAL(14, 2)),
    __metadata("design:type", Number)
], CivilServantInstallmentPaymentProof.prototype, "salary", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.ForeignKey)(() => user_entity_1.User),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], CivilServantInstallmentPaymentProof.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], CivilServantInstallmentPaymentProof.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Default)(civil_servant_installment_verification_status_enum_1.CivilServantInstallmentVerificationStatus.PENDING),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM(civil_servant_installment_verification_status_enum_1.CivilServantInstallmentVerificationStatus.PENDING, civil_servant_installment_verification_status_enum_1.CivilServantInstallmentVerificationStatus.VERIFIED, civil_servant_installment_verification_status_enum_1.CivilServantInstallmentVerificationStatus.UNVERIFIED)),
    __metadata("design:type", String)
], CivilServantInstallmentPaymentProof.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: false }),
    __metadata("design:type", Date)
], CivilServantInstallmentPaymentProof.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: false }),
    __metadata("design:type", Date)
], CivilServantInstallmentPaymentProof.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: true }),
    __metadata("design:type", Object)
], CivilServantInstallmentPaymentProof.prototype, "deletedAt", void 0);
exports.CivilServantInstallmentPaymentProof = CivilServantInstallmentPaymentProof = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'civil_servant_installment_payment_proofs',
        timestamps: true,
        paranoid: true,
        defaultScope: {
            attributes: {
                exclude: ['deletedAt'],
            },
        },
    })
], CivilServantInstallmentPaymentProof);
//# sourceMappingURL=civil-servant-installment-verification.entity.js.map