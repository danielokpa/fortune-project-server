import { Model } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
export declare class ReferredUser extends Model<ReferredUser> {
    id: string;
    referalCode: string;
    userId: string;
    user: User;
    referredUserId: string;
    referredUser: User;
    completedRides: number;
    hasRewarded: boolean;
    createdAt: Date;
    updatedAt: Date;
}
