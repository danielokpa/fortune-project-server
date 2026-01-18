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
  tableName: 'cng_station_reviews',
  timestamps: true,
})
export class CngStationReview extends Model<CngStationReview> {
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

  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  public message: string;

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

