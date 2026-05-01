import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Driver } from '../entities/driver.entity';
import { DriverRepository } from '../repositories/driver.repository';
import { IDashboard, IDashboardInput } from 'src/shared/interfaces/dashbaord.interface';
import { ClientDeviceService } from 'src/modules/client-devices/services/client-device.service';
import { AddDriverLicenseDto, UpdateBankAccountDto, ValidateBankAccountDto } from '../dto/kyc.dto';
import { TripRepository } from 'src/modules/trips/repositories/trip.repository';
import { AuthDriverService } from './auth.driver.service';

@Injectable()
export class DriverService {

  constructor(
    private readonly driverRepository: DriverRepository,
    private readonly clientDeviceService: ClientDeviceService,
    private readonly tripRepository: TripRepository,
    private readonly eventEmitter: EventEmitter2,
    private authDriverService: AuthDriverService,
  ) { }

  private readonly logger = new Logger(DriverService.name);

  async addDriverLicense(userId: string, reqBody: AddDriverLicenseDto) {
    try {
      const driver = await this.driverRepository.update(userId, {
        licenseImageUrl: reqBody.licenseImageUrl,
      });
      if (!driver) {
        throw new NotFoundException('Driver not found!')
      }
      return reqBody;
    } catch (error: unknown) {
      throw new BadRequestException(error)
    }
  }

  async updateBankAccount(userId: string, reqBody: UpdateBankAccountDto, userToken) {
    try {
      const driver = await this.driverRepository.findById(userId);

      if (!driver) {
        throw new NotFoundException('Driver not found!');
      }

      if (reqBody.bvn) {
        const virtualAccount = await this.authDriverService.fetchOrCreateVirtualAccount(
          {
            token: userToken,
            driverId: userId,
            bvn: reqBody.bvn
          }
        );

        if (virtualAccount) {
          const updatedDriver = await this.driverRepository.update(userId, {
            accountName: reqBody.accountName,
            accountNo: reqBody.accountNo,
            bankName: reqBody.bankName,
            bankCode: reqBody.bankCode,
            bvn: reqBody.bvn
          });

          return reqBody;

        } else {

          throw new BadRequestException('Driver account already provided')

        }
      } else {

        const updatedDriver = await this.driverRepository.update(userId, {
          accountName: reqBody.accountName,
          accountNo: reqBody.accountNo,
          bankName: reqBody.bankName,
          bankCode: reqBody.bankCode,
          bvn: reqBody.bvn
        });

        return reqBody;
      }

    } catch (error: unknown) {
      throw new BadRequestException(error)
    }
  }

  async setDriverType(userId: string, isPeppcruiseDriver: boolean) {
    const driver = await this.driverRepository.update(userId, { isPeppcruiseDriver });
    if (!driver) {
      throw new NotFoundException('Driver not found!')
    }
    return driver;
  }

  async dashboard(data: IDashboardInput, userId: string, userToken?: string) {
    try {
      const { deviceFCMToken, ipAddress, name } = data;

      const user = await this.driverRepository.fetchDriver(userId);
      if (!user) {
        throw new NotFoundException('User not found!')
      }

      const clientDevice = await this.clientDeviceService.findByDriverIdAndDeviceToken(userId, deviceFCMToken);

      // // Emit event for virtual account check
      // this.eventEmitter.emit('driver.dashboard.accessed', { user, userToken });

      if (clientDevice == null) {
        await this.clientDeviceService.registerDevice({
          driverId: userId,
          deviceFCMToken: deviceFCMToken,
          ipAddress: ipAddress,
          name: name,
          userType: user.userType
        });
      } else {
        await this.clientDeviceService.updateDeviceToken(clientDevice.id, deviceFCMToken);
      }

      const dashboardRes: Partial<IDashboard> = {
        fullName: user.fullName,
        email: user.email,
        phoneNo: user.phoneNo,
        userId: user.id,
        activeTrip: await this.tripRepository.findDriverActiveTrip(userId),
        piWalletAddress: "9384JENSHJ4847898477494847G4"
      }
      return dashboardRes;
    } catch (error: unknown) {
      throw new BadRequestException(error)
    }
  }

  async fetchDriver(id: string): Promise<Driver | null> {
    const driver = await this.driverRepository.fetchDriver(id);
    if (!driver) {
      throw new NotFoundException('Driver not found!')
    }
    return driver;
  }

  async findById(id: string): Promise<Driver | null> {
    return await this.driverRepository.findById(id);
  }

  async findByIdentity(identity: string): Promise<Driver | null> {
    return await this.driverRepository.findByIdentity(identity);
  }

  async findByEmail(email: string): Promise<Driver | null> {
    return await this.driverRepository.findByEmail(email);
  }

  async findAll(options?: any): Promise<Driver[]> {
    return await this.driverRepository.findAll(options);
  }

  async update(id: string, driverData: Partial<Driver>): Promise<[number, Driver[]]> {
    return await this.driverRepository.update(id, driverData);
  }

  async delete(id: string): Promise<number> {
    return await this.driverRepository.delete(id);
  }

  async restore(id: string): Promise<void> {
    return await this.driverRepository.restore(id);
  }
}

