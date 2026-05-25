import { Model } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
export declare class ReferalUser extends Model<ReferalUser> {
    id: string;
    userId: string;
    user: User;
    referredUserId: string;
    referredUser: User;
    referalCode: string;
    hasCompletedFirstTrip: boolean;
    createdAt: Date;
    updatedAt: Date;
}
