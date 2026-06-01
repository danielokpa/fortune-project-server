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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const db_error_handler_util_1 = require("../../../utils/db-error-handler.util");
let UserRepository = class UserRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByIdentity(identity) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    OR: [
                        { email: identity },
                        { username: identity },
                        { phoneNo: identity },
                    ],
                },
            });
            return user;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async findById(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id },
            });
            return user;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async fetchUser(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id },
                include: {
                    country: true,
                },
                omit: {
                    password: true,
                },
            });
            return user;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async fetchAndUpdateUser(id, data) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: { id },
            });
            if (!existingUser) {
                throw new common_1.NotFoundException('User not found');
            }
            const updatedUser = await this.prisma.user.update({
                where: { id },
                data,
            });
            return updatedUser;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async findByEmail(email) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { email },
            });
            return user;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async findByUsername(username) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { username },
            });
            return user;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async findByPhone(phoneNo) {
        try {
            const user = await this.prisma.user.findFirst({
                where: { phoneNo },
            });
            return user;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async findByEmailAndRole(email, userType) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    email,
                    userType,
                },
            });
            return user;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async create(userData) {
        try {
            const user = await this.prisma.user.create({
                data: userData,
            });
            if (!user) {
                throw new common_1.InternalServerErrorException('Failed to create user');
            }
            return user;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async update(id, userData) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: { id },
            });
            if (!existingUser) {
                throw new common_1.NotFoundException('User not found');
            }
            const updatedUser = await this.prisma.user.update({
                where: { id },
                data: userData,
            });
            return updatedUser;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async delete(id) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: { id },
            });
            if (!existingUser) {
                throw new common_1.NotFoundException('User not found');
            }
            await this.prisma.user.delete({
                where: { id },
            });
            return true;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async findWithCountry(email, userType) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    email,
                    userType,
                },
                include: {
                    country: true,
                },
            });
            return user;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
    async findAll(params) {
        try {
            const users = await this.prisma.user.findMany(params);
            if (!users) {
                throw new common_1.NotFoundException('Users not found');
            }
            return users;
        }
        catch (error) {
            (0, db_error_handler_util_1.handleDatabaseError)(error);
        }
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserRepository);
//# sourceMappingURL=user.repository.js.map