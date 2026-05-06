import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { CivilServantInstallmentVerificationStatus } from 'src/enums/civil-servant-installment-verification-status.enum';

@Table({
  tableName: 'civil_servant_installment_payment_proofs',
  timestamps: true,
  paranoid: true,
  defaultScope: {
    attributes: {
      exclude: ['deletedAt'],
    },
  },
})
export class CivilServantInstallmentPaymentProof extends Model<CivilServantInstallmentPaymentProof> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public declare id: string;

  @AllowNull(false)
  @Column(DataType.STRING(200))
  public fullName: string;

  /** URL or storage key for ID card document */
  @AllowNull(false)
  @Column(DataType.STRING(1024))
  public idCard: string;

  /** URL or storage key for pay slip document */
  @AllowNull(false)
  @Column(DataType.STRING(1024))
  public paySlip: string;

  @AllowNull(false)
  @Column(DataType.DECIMAL(14, 2))
  public salary: number;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  public userId: string;

  @BelongsTo(() => User)
  public user?: User;

  @AllowNull(false)
  @Default(CivilServantInstallmentVerificationStatus.PENDING)
  @Column(
    DataType.ENUM(
      CivilServantInstallmentVerificationStatus.PENDING,
      CivilServantInstallmentVerificationStatus.VERIFIED,
      CivilServantInstallmentVerificationStatus.UNVERIFIED,
    ),
  )
  public status: CivilServantInstallmentVerificationStatus;

  @CreatedAt
  @Column({ type: DataType.DATE, allowNull: false })
  public declare createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, allowNull: false })
  public declare updatedAt: Date;

  @DeletedAt
  @Column({ type: DataType.DATE, allowNull: true })
  public declare deletedAt: Date | null;
}
