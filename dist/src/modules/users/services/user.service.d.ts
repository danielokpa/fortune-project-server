import { ConfigService } from '@nestjs/config';
import { Prisma, User } from '@prisma/client';
import { UserRepository } from '../repositories/user.repository';
import { ClientDeviceService } from "../../client-devices/services/client-device.service";
import { UpdateUserDto } from '../dto/user.dto';
export declare class UserService {
    private readonly userRepository;
    private readonly clientDeviceService;
    private readonly configService;
    constructor(userRepository: UserRepository, clientDeviceService: ClientDeviceService, configService: ConfigService);
    fetchUser(id: string): Promise<Partial<User>>;
    findByIdentity(identity: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    findAll(params?: Prisma.UserFindManyArgs): Promise<User[]>;
    updateImageUrl(userId: string, imageUrl: string): Promise<User>;
    update(id: string, userData: Prisma.UserUncheckedUpdateInput): Promise<User>;
    updateUser(userId: string, userData: UpdateUserDto): Promise<User>;
    deleteUser(userId: string): Promise<boolean>;
}
