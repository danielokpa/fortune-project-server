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
import { ChargingStation } from './charging-station.entity';

@Table({
  tableName: 'charging_station_ratings',
  timestamps: true,
})
export class ChargingStationRating extends Model<ChargingStationRating> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public declare id: string;

  @AllowNull(false)
  @ForeignKey(() => ChargingStation)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  public stationId: string;

  @BelongsTo(() => ChargingStation)
  public chargingStation: ChargingStation;

  @AllowNull(false)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  public userId: string;

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

