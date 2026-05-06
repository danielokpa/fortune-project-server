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
import { CngStation } from './cng-station.entity';
import { SelfTripStatus } from '../../../enums/self-trip-status.enum';
import { UserType } from '../../../enums/user-type.enum';

/**
 * Matches `040-create-user-cng-stations.js` → table `user_cng_stations`.
 * Note: migration does not declare a FK from `userId` to `users`; only `cngStationId` references `cng_stations`.
 */
@Table({
  tableName: 'user_cng_stations',
  timestamps: true,
  paranoid: true,
  defaultScope: {
    attributes: {
      exclude: ['deletedAt'],
    },
  },
})
export class UserCngStation extends Model<UserCngStation> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public declare id: string;

  @AllowNull(false)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  public userId: string;

  @AllowNull(false)
  @ForeignKey(() => CngStation)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  public cngStationId: string;

  @BelongsTo(() => CngStation)
  public cngStation: CngStation;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  public isFavorite: boolean;

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
    type: DataType.ENUM(
      'START_TRIP',
      'ONGOING_TRIP',
      'CANCEL',
      'END_TRIP',
    ),
    allowNull: true,
  })
  public selfTripStatus: SelfTripStatus;

  @AllowNull(true)
  @Column({
    type: DataType.ENUM(
      'SUPER_ADMIN',
      'PEPP_ADMIN',
      'PEPP_MANAGER',
      'USER',
      'DRIVER',
    ),
    allowNull: true,
  })
  public userType: UserType;

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
