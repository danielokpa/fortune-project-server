import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from 'sequelize-typescript';
import { CngStation } from './cng-station.entity';
import { User } from '../../users/entities/user.entity';

@Table({
  tableName: 'cng_station_ratings',
  timestamps: true,
})
export class CngStationRating extends Model<CngStationRating> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public declare id: string;

  @AllowNull(false)
  @ForeignKey(() => CngStation)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  public stationId: string;

  @BelongsTo(() => CngStation)
  public cngStation: CngStation;

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
  @Column({
    type: DataType.DECIMAL(3, 2),
    allowNull: false,
  })
  public rating: number;

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
}

