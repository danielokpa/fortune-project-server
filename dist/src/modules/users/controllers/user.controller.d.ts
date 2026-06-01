import type { Request as ExpressRequest } from 'express';
import { UserService } from '../services/user.service';
import { JwtAuthPayload } from '../../auth/auth.interface';
import { UpdateImageUrlDto, UpdateUserDto } from '../dto/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    fetchuser(req: ExpressRequest & {
        user: JwtAuthPayload;
    }): Promise<import("src/utils/response.utils").ApiResponse<Partial<{
        id: string;
        email: string;
        phoneNo: string | null;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        username: string;
        password: string;
        loginType: import("@prisma/client").$Enums.LoginType;
        userType: import("@prisma/client").$Enums.Role;
        isEmailVerified: boolean;
        isActive: boolean;
        imageUrl: string | null;
        countryId: string | null;
    }>>>;
    updateImageUrl(req: ExpressRequest & {
        user: JwtAuthPayload;
    }, updateImageUrlDto: UpdateImageUrlDto): Promise<import("src/utils/response.utils").ApiResponse<{
        id: string;
        email: string;
        phoneNo: string | null;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        username: string;
        password: string;
        loginType: import("@prisma/client").$Enums.LoginType;
        userType: import("@prisma/client").$Enums.Role;
        isEmailVerified: boolean;
        isActive: boolean;
        imageUrl: string | null;
        countryId: string | null;
    }>>;
    updateUser(req: ExpressRequest & {
        user: JwtAuthPayload;
    }, updateUserDto: UpdateUserDto): Promise<import("src/utils/response.utils").ApiResponse<{
        id: string;
        email: string;
        phoneNo: string | null;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        username: string;
        password: string;
        loginType: import("@prisma/client").$Enums.LoginType;
        userType: import("@prisma/client").$Enums.Role;
        isEmailVerified: boolean;
        isActive: boolean;
        imageUrl: string | null;
        countryId: string | null;
    }>>;
}
