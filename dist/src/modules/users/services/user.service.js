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
let UserService = class UserService {
    userRepository;
    clientDeviceService;
    configService;
    constructor(userRepository, clientDeviceService, configService) {
        this.userRepository = userRepository;
        this.clientDeviceService = clientDeviceService;
        this.configService = configService;
    }
    async fetchUser(id) {
        const user = await this.userRepository.fetchUser(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async findByIdentity(identity) {
        const user = await this.userRepository.findByIdentity(identity);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async findByEmail(email) {
        return this.userRepository.findByEmail(email);
    }
    async findByUsername(username) {
        return this.userRepository.findByUsername(username);
    }
    async findAll(params) {
        return this.userRepository.findAll(params);
    }
    async updateImageUrl(userId, imageUrl) {
        const updatedUser = await this.userRepository.update(userId, {
            imageUrl,
        });
        if (!updatedUser) {
            throw new common_1.NotFoundException('Failed to update image URL');
        }
        return updatedUser;
    }
    async update(id, userData) {
        const data = await this.userRepository.update(id, userData);
        if (!data)
            throw new common_1.NotFoundException('Failed to update user');
        return data;
    }
    async updateUser(userId, userData) {
        const updatedUser = await this.userRepository.update(userId, userData);
        if (!updatedUser) {
            throw new common_1.NotFoundException('Failed to update user');
        }
        return updatedUser;
    }
    async deleteUser(userId) {
        return this.userRepository.delete(userId);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        client_device_service_1.ClientDeviceService,
        config_1.ConfigService])
], UserService);
//# sourceMappingURL=user.service.js.map