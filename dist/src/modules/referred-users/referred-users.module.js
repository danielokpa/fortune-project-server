"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferredUsersModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const referred_user_entity_1 = require("./entities/referred-user.entity");
const referred_user_repository_1 = require("./repositories/referred-user.repository");
const referred_user_service_1 = require("./services/referred-user.service");
let ReferredUsersModule = class ReferredUsersModule {
};
exports.ReferredUsersModule = ReferredUsersModule;
exports.ReferredUsersModule = ReferredUsersModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([referred_user_entity_1.ReferredUser])],
        providers: [referred_user_repository_1.ReferredUserRepository, referred_user_service_1.ReferredUserService],
        exports: [sequelize_1.SequelizeModule, referred_user_repository_1.ReferredUserRepository, referred_user_service_1.ReferredUserService],
    })
], ReferredUsersModule);
//# sourceMappingURL=referred-users.module.js.map