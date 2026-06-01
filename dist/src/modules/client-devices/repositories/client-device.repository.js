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
exports.ClientDeviceRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const db_error_handler_util_1 = require("../../../utils/db-error-handler.util");
let ClientDeviceRepository = class ClientDeviceRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        try {
            const device = await this.prisma.clientDevice.findUnique({
                where: { id },
            });
            return device;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async findByUserId(userId) {
        try {
            const devices = await this.prisma.clientDevice.findMany({
                where: { userId },
            });
            return devices;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async findWithFcmByUserId(userId) {
        try {
            const devices = await this.prisma.clientDevice.findMany({
                where: {
                    userId,
                    NOT: {
                        deviceFCMToken: null,
                    },
                },
            });
            return devices;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async findByIpAddress(ipAddress) {
        try {
            const devices = await this.prisma.clientDevice.findMany({
                where: { ipAddress },
            });
            return devices;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async findByDeviceToken(deviceFCMToken) {
        try {
            const device = await this.prisma.clientDevice.findFirst({
                where: { deviceFCMToken },
            });
            return device;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async findAll(params) {
        try {
            const devices = await this.prisma.clientDevice.findMany(params);
            return devices;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async findByUserIdAndDeviceToken(userId, deviceFCMToken) {
        try {
            const device = await this.prisma.clientDevice.findFirst({
                where: {
                    userId,
                    deviceFCMToken,
                },
            });
            return device;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async create(deviceData) {
        try {
            const device = await this.prisma.clientDevice.create({
                data: deviceData,
            });
            if (!device) {
                throw new common_1.BadRequestException('Failed to create device');
            }
            return device;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async update(id, deviceData) {
        try {
            const existingDevice = await this.prisma.clientDevice.findUnique({
                where: { id },
            });
            if (!existingDevice) {
                throw new common_1.NotFoundException('Device not found');
            }
            const updatedDevice = await this.prisma.clientDevice.update({
                where: { id },
                data: deviceData,
            });
            return updatedDevice;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async delete(id) {
        try {
            const existingDevice = await this.prisma.clientDevice.findUnique({
                where: { id },
            });
            if (!existingDevice) {
                throw new common_1.NotFoundException('Device not found');
            }
            await this.prisma.clientDevice.delete({
                where: { id },
            });
            return true;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async deleteAllByUserId(userId) {
        try {
            const result = await this.prisma.clientDevice.deleteMany({
                where: { userId },
            });
            return result.count;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async findByUserAndDevice(userId, deviceFCMToken) {
        try {
            const device = await this.prisma.clientDevice.findFirst({
                where: {
                    userId,
                    deviceFCMToken,
                },
            });
            return device;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async updateOrCreateDevice(deviceData) {
        try {
            const { userId, deviceToken, ipAddress } = deviceData;
            if (!deviceToken || !ipAddress) {
                throw new common_1.BadRequestException('deviceToken and ipAddress are required');
            }
            if (!userId) {
                throw new common_1.BadRequestException('userId is required');
            }
            const existingDevice = await this.findByUserAndDevice(userId, deviceToken);
            if (existingDevice) {
                return await this.prisma.clientDevice.update({
                    where: {
                        id: existingDevice.id,
                    },
                    data: {
                        ...deviceData,
                    },
                });
            }
            return await this.prisma.clientDevice.create({
                data: deviceData,
            });
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
};
exports.ClientDeviceRepository = ClientDeviceRepository;
exports.ClientDeviceRepository = ClientDeviceRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClientDeviceRepository);
//# sourceMappingURL=client-device.repository.js.map