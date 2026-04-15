import { Driver } from '../entities/driver.entity';
import { DriverRepository } from '../repositories/driver.repository';
import { IDashboard, IDashboardInput } from 'src/shared/interfaces/dashbaord.interface';
import { ClientDeviceService } from 'src/modules/client-devices/services/client-device.service';
import { AddDriverLicenseDto, UpdateBankAccountDto } from '../dto/kyc.dto';
import { TripRepository } from 'src/modules/trips/repositories/trip.repository';
export declare class DriverService {
    private readonly driverRepository;
    private readonly clientDeviceService;
    private readonly tripRepository;
    constructor(driverRepository: DriverRepository, clientDeviceService: ClientDeviceService, tripRepository: TripRepository);
    addDriverLicense(userId: string, reqBody: AddDriverLicenseDto): Promise<AddDriverLicenseDto>;
    updateBankAccount(userId: string, reqBody: UpdateBankAccountDto): Promise<UpdateBankAccountDto>;
    setDriverType(userId: string, isPeppcruiseDriver: boolean): Promise<[number, Driver[]]>;
    dashboard(data: IDashboardInput, userId: string): Promise<Partial<IDashboard>>;
    fetchDriver(id: string): Promise<Driver | null>;
    findById(id: string): Promise<Driver | null>;
    findByIdentity(identity: string): Promise<Driver | null>;
    findByEmail(email: string): Promise<Driver | null>;
    findAll(options?: any): Promise<Driver[]>;
    update(id: string, driverData: Partial<Driver>): Promise<[number, Driver[]]>;
    delete(id: string): Promise<number>;
    restore(id: string): Promise<void>;
}
