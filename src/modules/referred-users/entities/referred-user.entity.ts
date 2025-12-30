import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  Default,
  AllowNull,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';

@Table({
  tableName: 'referred_users',
  timestamps: true,
  defaultScope: {
    attributes: {
      exclude: [],
    },
  },
})
export class ReferredUser extends Model<ReferredUser> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(10),
  })
  declare referalCode: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  declare userId: string;

  @BelongsTo(() => User, 'userId')
  declare user: User;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  declare referredUserId: string;

  @BelongsTo(() => User, 'referredUserId')
  declare referredUser: User;

  @Default(0)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare completedRides: number;

  @Default(false)
  @AllowNull(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare hasRewarded: boolean;

  @CreatedAt
  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
  declare createdAt: Date;

  @UpdatedAt
  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
  declare updatedAt: Date;
}

