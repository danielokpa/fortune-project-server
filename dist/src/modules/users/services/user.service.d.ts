import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { ClientDeviceService } from 'src/modules/client-devices/services/client-device.service';
import { IDashboard, IDashboardInput } from 'src/shared/interfaces/dashbaord.interface';
import { TripRepository } from 'src/modules/trips/repositories/trip.repository';
export declare class UserService {
    private readonly userRepository;
    private readonly clientDeviceService;
    private readonly configService;
    private readonly tripRepository;
    constructor(userRepository: UserRepository, clientDeviceService: ClientDeviceService, configService: ConfigService, tripRepository: TripRepository);
    fetchUser(id: string): Promise<User | null>;
    findByIdentity(identity: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(options?: any): Promise<User[]>;
    update(id: string, userData: Partial<User>): Promise<[number, User[]]>;
    delete(id: string): Promise<number>;
    restore(id: string): Promise<void>;
    dashboard(data: IDashboardInput, userId: string): Promise<IDashboard>;
    updateImageUrl(userId: string, imageUrl: string): Promise<User>;
}
