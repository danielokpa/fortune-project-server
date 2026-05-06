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

@Table({
  tableName: 'cng_station_favorites',
  timestamps: true,
})
export class CngStationFavorite extends Model<CngStationFavorite> {
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
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  public userId: string;

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

