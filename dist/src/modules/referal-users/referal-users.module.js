"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferalUsersModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const referal_user_entity_1 = require("./entities/referal-user.entity");
const referal_user_repository_1 = require("./repositories/referal-user.repository");
const referal_user_service_1 = require("./services/referal-user.service");
let ReferalUsersModule = class ReferalUsersModule {
};
exports.ReferalUsersModule = ReferalUsersModule;
exports.ReferalUsersModule = ReferalUsersModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([referal_user_entity_1.ReferalUser])],
        providers: [referal_user_repository_1.ReferalUserRepository, referal_user_service_1.ReferalUserService],
        exports: [sequelize_1.SequelizeModule, referal_user_repository_1.ReferalUserRepository, referal_user_service_1.ReferalUserService],
    })
], ReferalUsersModule);
//# sourceMappingURL=referal-users.module.js.map