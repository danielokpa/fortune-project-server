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
import { ChargingStation } from './charging-station.entity';
import { User } from '../../users/entities/user.entity';
import { SelfTripStatus } from '../../../enums/self-trip-status.enum';

@Table({
  tableName: 'user_charging_stations',
  timestamps: true,
  paranoid: true,
  defaultScope: {
    attributes: {
      exclude: ['deletedAt'],
    },
  },
})
export class UserChargingStation extends Model<UserChargingStation> {
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

  @AllowNull(false)
  @ForeignKey(() => ChargingStation)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  public chargingStationId: string;

  @BelongsTo(() => ChargingStation)
  public chargingStation: ChargingStation;

  // @Default(false)
  // @Column({
  //   type: DataType.BOOLEAN,
  //   allowNull: false,
  //   defaultValue: false,
  // })
  // public isFavorite: boolean;

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

  @AllowNull(true)
  @Column({
    type: DataType.DECIMAL(10, 8),
    allowNull: true,
  })
  public distance: number;

  @AllowNull(true)
  @Column({
    type: DataType.ENUM(...Object.values(SelfTripStatus)),
    allowNull: true,
  })
  public selfTripStatus: SelfTripStatus;

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

