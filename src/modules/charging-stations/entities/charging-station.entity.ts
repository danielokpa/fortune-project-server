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
  HasMany,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from 'sequelize-typescript';
import { UserChargingStation } from './user-charging-station.entity';
import { SelfTripStatus } from '../../../enums/self-trip-status.enum';
import { UserType } from '../../../enums/user-type.enum';

@Table({
  tableName: 'charging_stations',
  timestamps: true,
  paranoid: true,
  defaultScope: {
    attributes: {
      exclude: ['deletedAt'],
    },
  },
})
export class ChargingStation extends Model<ChargingStation> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public declare id: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  public name: string;

  /**
   * Unique OCPP WebSocket identifier (min 16 alphanumeric). Used in ws://host/ocpp/{stationSlug}
   */
  @Column({
    type: DataType.STRING(64),
    allowNull: false,
    unique: true,
  })
  public stationSlug: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  public country: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  public state: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  public address: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  public contactPhone: string;


  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  public openingTime: string;

  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  public closingTime: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  public amountPerUnit: number;

  @Default('NGN')
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    defaultValue: 'NGN',
  })
  public currency: string;

  @Default('kwh')
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    defaultValue: 'kwh',
  })
  public amountPerUnitType: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    validate: {
      isEmail: true,
    },
  })
  public contactEmail: string;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  public isActive: boolean;

  @AllowNull(true)
  @Column({
    type: DataType.DECIMAL(10, 8),
    allowNull: true,
  })
  public longitude: number;

  @AllowNull(true)
  @Column({
    type: DataType.DECIMAL(11, 8),
    allowNull: true,
  })
  public latitude: number;

  
  @Default('default.png')
  @AllowNull(true)
  @Column({
    type: DataType.STRING(500),
    allowNull: true,
    defaultValue: 'default.png',
  })
  public stationImage: string;

  @HasMany(() => UserChargingStation)
  public userChargingStations: UserChargingStation[];

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

