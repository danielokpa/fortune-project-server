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
exports.ClientDeviceService = void 0;
const common_1 = require("@nestjs/common");
const client_device_repository_1 = require("../repositories/client-device.repository");
let ClientDeviceService = class ClientDeviceService {
    clientDeviceRepository;
    constructor(clientDeviceRepository) {
        this.clientDeviceRepository = clientDeviceRepository;
    }
    async findById(id) {
        const data = await this.clientDeviceRepository.findById(id);
        if (!data)
            throw new common_1.NotFoundException('Device token not found');
        return data;
    }
    async findByUserId(userId) {
        const devices = await this.clientDeviceRepository.findByUserId(userId);
        return devices;
    }
    async getFcmTokensForUserId(userId) {
        const rows = await this.clientDeviceRepository.findWithFcmByUserId(userId);
        return [
            ...new Set(rows
                .map((d) => d.deviceFCMToken)
                .filter((t) => Boolean(t))),
        ];
    }
    async findByIpAddress(ipAddress) {
        const devices = await this.clientDeviceRepository.findByIpAddress(ipAddress);
        return devices;
    }
    async findByUserIdAndDeviceToken(userId, deviceFCMToken) {
        return await this.clientDeviceRepository.findByUserIdAndDeviceToken(userId, deviceFCMToken);
    }
    async findAll(options) {
        const devices = await this.clientDeviceRepository.findAll(options);
        return devices;
    }
    async create(clientDeviceData) {
        const data = await this.clientDeviceRepository.create(clientDeviceData);
        if (!data)
            throw new common_1.BadRequestException('Failed to create device token');
        return data;
    }
    async delete(id) {
        return await this.clientDeviceRepository.delete(id);
    }
    async registerDevice(deviceData) {
        const device = await this.clientDeviceRepository.updateOrCreateDevice(deviceData);
        return device;
    }
    async updateDeviceToken(clientDeviceId, deviceFCMToken) {
        const updatedDevice = await this.clientDeviceRepository.update(clientDeviceId, {
            deviceFCMToken,
        });
        if (!updatedDevice) {
            throw new common_1.NotFoundException('Device not found!');
        }
        return updatedDevice;
    }
};
exports.ClientDeviceService = ClientDeviceService;
exports.ClientDeviceService = ClientDeviceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_device_repository_1.ClientDeviceRepository])
], ClientDeviceService);
//# sourceMappingURL=client-device.service.js.map