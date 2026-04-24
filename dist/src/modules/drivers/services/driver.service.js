"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DriverService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const driver_repository_1 = require("../repositories/driver.repository");
const client_device_service_1 = require("../../client-devices/services/client-device.service");
const trip_repository_1 = require("../../trips/repositories/trip.repository");
const auth_driver_service_1 = require("./auth.driver.service");
let DriverService = DriverService_1 = class DriverService {
    driverRepository;
    clientDeviceService;
    tripRepository;
    eventEmitter;
    authDriverService;
    constructor(driverRepository, clientDeviceService, tripRepository, eventEmitter, authDriverService) {
        this.driverRepository = driverRepository;
        this.clientDeviceService = clientDeviceService;
        this.tripRepository = tripRepository;
        this.eventEmitter = eventEmitter;
        this.authDriverService = authDriverService;
    }
    logger = new common_1.Logger(DriverService_1.name);
    async addDriverLicense(userId, reqBody) {
        try {
            const driver = await this.driverRepository.update(userId, {
                licenseImageUrl: reqBody.licenseImageUrl,
            });
            if (!driver) {
                throw new common_1.NotFoundException('Driver not found!');
            }
            return reqBody;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async updateBankAccount(userId, reqBody, userToken) {
        try {
            const driver = await this.driverRepository.findById(userId);
            if (!driver) {
                throw new common_1.NotFoundException('Driver not found!');
            }
            if (reqBody.bvn) {
                const virtualAccount = await this.authDriverService.fetchOrCreateVirtualAccount({
                    token: userToken,
                    driverId: userId,
                    bvn: reqBody.bvn
                });
                if (virtualAccount) {
                    const updatedDriver = await this.driverRepository.update(userId, {
                        accountName: reqBody.accountName,
                        accountNo: reqBody.accountNo,
                        bankName: reqBody.bankName,
                        bankCode: reqBody.bankCode,
                        bvn: reqBody.bvn
                    });
                    return reqBody;
                }
                else {
                    throw new common_1.BadRequestException('Driver account already provided');
                }
            }
            else {
                const updatedDriver = await this.driverRepository.update(userId, {
                    accountName: reqBody.accountName,
                    accountNo: reqBody.accountNo,
                    bankName: reqBody.bankName,
                    bankCode: reqBody.bankCode,
                    bvn: reqBody.bvn
                });
                return reqBody;
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async setDriverType(userId, isPeppcruiseDriver) {
        const driver = await this.driverRepository.update(userId, { isPeppcruiseDriver });
        if (!driver) {
            throw new common_1.NotFoundException('Driver not found!');
        }
        return driver;
    }
    async dashboard(data, userId, userToken) {
        try {
            const { deviceFCMToken, ipAddress, name } = data;
            const user = await this.driverRepository.fetchDriver(userId);
            if (!user) {
                throw new common_1.NotFoundException('User not found!');
            }
            const clientDevice = await this.clientDeviceService.findByDriverIdAndDeviceToken(userId, deviceFCMToken);
            if (clientDevice == null) {
                await this.clientDeviceService.registerDevice({
                    driverId: userId,
                    deviceFCMToken: deviceFCMToken,
                    ipAddress: ipAddress,
                    name: name,
                    userType: user.userType
                });
            }
            else {
                await this.clientDeviceService.updateDeviceToken(clientDevice.id, deviceFCMToken);
            }
            const dashboardRes = {
                fullName: user.fullName,
                email: user.email,
                phoneNo: user.phoneNo,
                userId: user.id,
                activeTrip: await this.tripRepository.findDriverActiveTrip(userId)
            };
            return dashboardRes;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async fetchDriver(id) {
        const driver = await this.driverRepository.fetchDriver(id);
        if (!driver) {
            throw new common_1.NotFoundException('Driver not found!');
        }
        return driver;
    }
    async findById(id) {
        return await this.driverRepository.findById(id);
    }
    async findByIdentity(identity) {
        return await this.driverRepository.findByIdentity(identity);
    }
    async findByEmail(email) {
        return await this.driverRepository.findByEmail(email);
    }
    async findAll(options) {
        return await this.driverRepository.findAll(options);
    }
    async update(id, driverData) {
        return await this.driverRepository.update(id, driverData);
    }
    async delete(id) {
        return await this.driverRepository.delete(id);
    }
    async restore(id) {
        return await this.driverRepository.restore(id);
    }
};
exports.DriverService = DriverService;
exports.DriverService = DriverService = DriverService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [driver_repository_1.DriverRepository,
        client_device_service_1.ClientDeviceService,
        trip_repository_1.TripRepository,
        event_emitter_1.EventEmitter2,
        auth_driver_service_1.AuthDriverService])
], DriverService);
//# sourceMappingURL=driver.service.js.map