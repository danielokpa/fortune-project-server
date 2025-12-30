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
  AllowNull,
} from 'sequelize-typescript';

@Table({
  tableName: 'cng_stations',
  timestamps: true,
  paranoid: true,
  defaultScope: {
    attributes: {
      exclude: ['deletedAt'],
    },
  },
})
export class CngStation extends Model<CngStation> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public declare id: string;

  @Column(DataType.STRING(100))
  public name: string;

  @Column(DataType.STRING(100))
  public state: string;

  @Column(DataType.STRING(100))
  public country: string;

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
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  public rating: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  public reviews: number;

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

  @Column({
    type: DataType.DECIMAL(11, 8),
    allowNull: true,
  })
  public latitude: number;

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


