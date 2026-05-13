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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const user_repository_1 = require("../repositories/user.repository");
const client_device_service_1 = require("../../client-devices/services/client-device.service");
const payment_enums_1 = require("../../../enums/payment.enums");
const trip_repository_1 = require("../../trips/repositories/trip.repository");
let UserService = class UserService {
    userRepository;
    clientDeviceService;
    configService;
    tripRepository;
    constructor(userRepository, clientDeviceService, configService, tripRepository) {
        this.userRepository = userRepository;
        this.clientDeviceService = clientDeviceService;
        this.configService = configService;
        this.tripRepository = tripRepository;
    }
    async fetchUser(id) {
        try {
            const user = await this.userRepository.fetchUser(id);
            if (!user) {
                throw new common_1.NotFoundException('User not found!');
            }
            return user;
        }
        catch (error) {
            throw new common_1.NotFoundException('User not found!');
        }
    }
    async findByIdentity(identity) {
        try {
            const user = await this.userRepository.findByIdentity(identity);
            if (!user) {
                throw new common_1.NotFoundException('User not found!');
            }
            return user;
        }
        catch (error) {
            throw new common_1.NotFoundException('User not found!');
        }
    }
    async findByEmail(email) {
        return await this.userRepository.findByEmail(email);
    }
    async findAll(options) {
        return await this.userRepository.findAll(options);
    }
    async update(id, userData) {
        return await this.userRepository.update(id, userData);
    }
    async delete(id) {
        return await this.userRepository.delete(id);
    }
    async restore(id) {
        await this.userRepository.restore(id);
    }
    async dashboard(data, userId) {
        try {
            const { deviceFCMToken, ipAddress, name } = data;
            const user = await this.userRepository.fetchUser(userId);
            if (!user) {
                throw new common_1.NotFoundException('User not found!');
            }
            const clientDevice = await this.clientDeviceService.findByUserIdAndDeviceToken(userId, deviceFCMToken);
            if (clientDevice == null) {
                await this.clientDeviceService.registerDevice({
                    userId: userId,
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
                rating: 0,
                paymentTypes: [
                    {
                        type: payment_enums_1.PAYMENT_TYPE.CASH,
                        label: 'Cash',
                        amount: 0
                    },
                    {
                        type: payment_enums_1.PAYMENT_TYPE.PEPP_COIN,
                        label: 'PEPP Coins',
                        amount: 0
                    },
                    {
                        type: payment_enums_1.PAYMENT_TYPE.PI_COIN,
                        label: 'Pi',
                        amount: 0
                    },
                    {
                        type: payment_enums_1.PAYMENT_TYPE.BANK_TRANSFER,
                        label: 'Bank Transfer',
                        amount: 0
                    }
                ],
                activeTrip: await this.tripRepository.findUserActiveTrip(userId),
                piWalletAddress: "9384JENSHJ4847898477494847G4"
            };
            return dashboardRes;
        }
        catch (error) {
            console.log(error);
            throw new common_1.NotFoundException(error);
        }
    }
    async updateImageUrl(userId, imageUrl) {
        try {
            const user = await this.userRepository.fetchUser(userId);
            if (!user) {
                throw new common_1.NotFoundException('User not found!');
            }
            const [affectedCount, updatedUsers] = await this.userRepository.update(userId, { imageUrl });
            if (affectedCount === 0) {
                throw new common_1.NotFoundException('User not found!');
            }
            const updatedUser = await this.userRepository.fetchUser(userId);
            if (!updatedUser) {
                throw new common_1.NotFoundException('User not found!');
            }
            return updatedUser;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.NotFoundException('Failed to update image URL');
        }
    }
    async updateUser(userId, userData) {
        try {
            const updateUser = await this.userRepository.update(userId, userData);
            if (updateUser[0] === 0) {
                throw new common_1.NotFoundException('User not found!');
            }
            return updateUser[1][0];
        }
        catch (error) {
            throw new common_1.NotFoundException('Failed to update user');
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        client_device_service_1.ClientDeviceService,
        config_1.ConfigService,
        trip_repository_1.TripRepository])
], UserService);
//# sourceMappingURL=user.service.js.map