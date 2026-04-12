"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_entity_1 = require("../entities/user.entity");
const sequelize_2 = require("sequelize");
const entities_1 = require("../../countries/entities");
const randomstring = __importStar(require("randomstring"));
let UserRepository = class UserRepository {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findByIdentity(identity) {
        return await this.userModel.findOne({
            where: {
                [sequelize_2.Op.or]: [
                    { email: identity },
                    { phoneNo: identity },
                ],
            },
            raw: true
        });
    }
    async findById(id) {
        return await this.userModel.findByPk(id, { raw: true });
    }
    async fetchUser(id) {
        let user = await this.userModel.findByPk(id, {
            attributes: {
                exclude: ['password', 'deletedAt', 'isDisabled'],
            },
            include: [
                {
                    model: entities_1.Country
                },
            ],
        });
        user = user ? user.toJSON() : null;
        if (user) {
            if (user.referalCode == null) {
                const event = {
                    userId: user.id,
                };
                const referalCode = await this.processGenerateReferalCode(event);
                if (referalCode) {
                    user.referalCode = referalCode;
                }
            }
        }
        return user;
    }
    async processGenerateReferalCode(event) {
        try {
            let referalCode;
            referalCode = randomstring.generate({
                length: 10,
                charset: 'alphanumeric',
            });
            await this.update(event.userId, { referalCode });
            return referalCode;
        }
        catch (error) {
        }
    }
    async fetchAndUpdateUser(id, data) {
        const user = await this.userModel.update(data, {
            where: { id },
            returning: true,
        });
        const updatedUser = await this.userModel.findByPk(id, { raw: true });
        return updatedUser ? updatedUser.toJSON() : null;
    }
    async findByEmail(email) {
        const user = await this.userModel.findOne({
            where: { email },
        });
        return user ? user.toJSON() : null;
    }
    async findByPhone(phoneNo) {
        const user = await this.userModel.findOne({
            where: { phoneNo }
        });
        return user ? user.toJSON() : null;
    }
    async findByReferalCode(referalCode, excludeUserId) {
        const where = { referalCode };
        if (excludeUserId) {
            where.id = { [sequelize_2.Op.ne]: excludeUserId };
        }
        const user = await this.userModel.findOne({
            where
        });
        return user ? user.toJSON() : null;
    }
    async findByEmailAndRole(email, userType) {
        return await this.userModel.findOne({
            where: { email, userType },
            raw: true
        });
    }
    async create(userData) {
        const user = await this.userModel.create(userData, { raw: true, returning: true });
        return user.toJSON();
    }
    async update(id, userData) {
        return await this.userModel.update(userData, {
            where: { id },
            returning: true,
        });
    }
    async delete(id) {
        return await this.userModel.destroy({
            where: { id },
        });
    }
    async restore(id) {
        await this.userModel.restore({
            where: { id },
        });
    }
    async findWithCountry(email, userType) {
        return await this.userModel.findOne({
            where: { email, userType },
            include: ['country'],
        });
    }
    async findAll(options) {
        return await this.userModel.findAll(options);
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __metadata("design:paramtypes", [Object])
], UserRepository);
//# sourceMappingURL=user.repository.js.map