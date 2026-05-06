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
import { ENGINE_CONDITION } from 'src/enums/engine-condition.enum';
import { FUEL_TYPE } from 'src/enums/fuel-type.enum';
import { UserCngConversionStatus } from 'src/enums/user-cng-conversion-status.enum';
import { User } from '../../users/entities/user.entity';
import { CngConversionStation } from './cng-conversion.stations.entity';

/** Matches `033-create-user-cng-conversions.js` → table `user_cng_conversions`. */

@Table({
  tableName: 'user_cng_conversions',
  timestamps: true,
  paranoid: true,
  defaultScope: {
    attributes: {
      exclude: ['deletedAt'],
    },
  },
})
export class UserCngConversion extends Model<UserCngConversion> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public declare id: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  public userId: string;

  @BelongsTo(() => User)
  public user: User;

  @AllowNull(true)
  @ForeignKey(() => CngConversionStation)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  public conversionCenter: string | null;

  @BelongsTo(() => CngConversionStation, {
    foreignKey: 'conversionCenter',
  })
  public conversionStation?: CngConversionStation;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  public fullName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  })
  public email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(15),
    allowNull: false,
  })
  public contactPhone: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(11),
    allowNull: false,
  })
  public nin: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  public vehicleRegisterationNo: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  public brandOfVehicle: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  public color: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  public makeOfVehicle: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(4),
    allowNull: false,
  })
  public yearOfManufacture: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  public vinNumber: string;

  @AllowNull(true)
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  public registerationExpiryDate: Date | null;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  public engineCapacity: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  public cylinder: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(
      'EXCELLENT',
      'GOOD',
      'FAIR',
      'POOR',
    ),
    allowNull: false,
  })
  public engineCondition: ENGINE_CONDITION;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(
      'PETROL',
      'DIESEL',
      'CNG',
      'HYBRID',
      'ELECTRIC',
    ),
    allowNull: false,
  })
  public fuelType: FUEL_TYPE;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM('MANUAL', 'AUTOMATIC'),
    allowNull: false,
  })
  public transmission: 'MANUAL' | 'AUTOMATIC';

  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  public mileage: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  public usualRoute: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(200),
    allowNull: true,
  })
  public operatingMotorPark: string | null;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  public residentialState: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  public lga: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(500),
    allowNull: false,
  })
  public address: string;

  @AllowNull(true)
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  public additionalNote: string | null;

  @Default(UserCngConversionStatus.IN_DRAFT)
  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(UserCngConversionStatus)),
    allowNull: false,
    defaultValue: UserCngConversionStatus.IN_DRAFT,
  })
  public status: UserCngConversionStatus;

  @Default(false)
  @AllowNull(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  public hasCompletedRegistration: boolean;

  @Default(false)
  @AllowNull(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  public hasCompletedOnlineInspection: boolean;

  @AllowNull(true)
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  public exteriorInspectionImages: string | null;

  @AllowNull(true)
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  public interiorInspectionImages: string | null;

  @AllowNull(true)
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  public engineImages: string | null;


  @AllowNull(true)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public installmentPayment: number;

  @AllowNull(true)
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  public keyAreasImages: string | null;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  public declare createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  public declare updatedAt: Date;

  @DeletedAt
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  public declare deletedAt: Date | null;
}
