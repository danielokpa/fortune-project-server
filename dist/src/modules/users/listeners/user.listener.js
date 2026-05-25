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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UserEventListener_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEventListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const user_repository_1 = require("../repositories/user.repository");
const referal_user_service_1 = require("../../referal-users/services/referal-user.service");
const randomstring = __importStar(require("randomstring"));
let UserEventListener = UserEventListener_1 = class UserEventListener {
    userRepository;
    referalUserService;
    logger = new common_1.Logger(UserEventListener_1.name);
    constructor(userRepository, referalUserService) {
        this.userRepository = userRepository;
        this.referalUserService = referalUserService;
    }
    async handleGenerateReferalCode(event) {
        try {
            this.logger.log(`Processing referral code for user ${event.userId}`);
            const user = await this.userRepository.findById(event.userId);
            if (!user) {
                this.logger.error(`User ${event.userId} not found`);
                return;
            }
            if (event.usedReferalCode) {
                await this.handleReferralTracking(event.userId, event.usedReferalCode);
            }
            if (user.referalCode) {
                this.logger.log(`User ${event.userId} already has referral code: ${user.referalCode}`);
                return;
            }
            let referalCode;
            let isUnique = false;
            let attempts = 0;
            const maxAttempts = 10;
            while (!isUnique && attempts < maxAttempts) {
                referalCode = randomstring.generate({
                    length: 10,
                    charset: 'alphanumeric',
                });
                const existingUser = await this.userRepository.findByReferalCode(referalCode);
                if (!existingUser) {
                    isUnique = true;
                }
                else {
                    attempts++;
                    this.logger.warn(`Referral code ${referalCode} already exists, generating new one...`);
                }
            }
            if (!isUnique || !referalCode) {
                this.logger.error(`Failed to generate unique referral code after ${maxAttempts} attempts`);
                return;
            }
            await this.userRepository.update(event.userId, { referalCode });
            this.logger.log(`Successfully generated referral code ${referalCode} for user ${event.userId}`);
            return;
        }
        catch (error) {
            this.logger.error(`Failed to process referral code for user ${event.userId}:`, error);
        }
    }
    async handleReferralTracking(referredUserId, usedReferalCode) {
        try {
            this.logger.log(`Processing referral tracking for user ${referredUserId} with code ${usedReferalCode}`);
            const currentUser = await this.userRepository.findById(referredUserId);
            if (currentUser?.referalCode === usedReferalCode) {
                this.logger.warn(`User ${referredUserId} attempted to use their own referral code. Skipping.`);
                return;
            }
            const referrerUser = await this.userRepository.findByReferalCode(usedReferalCode, referredUserId);
            if (!referrerUser) {
                this.logger.warn(`Referral code ${usedReferalCode} not found or belongs to the same user. Skipping referral tracking.`);
                return;
            }
            if (referrerUser.referalCode !== usedReferalCode) {
                this.logger.error(`Referral code mismatch: User ${referrerUser.id} has referral code ${referrerUser.referalCode}, but ${usedReferalCode} was used. Skipping.`);
                return;
            }
            if (!referrerUser.id) {
                this.logger.error(`Referrer user ${referrerUser.id} has invalid ID. Skipping referral tracking.`);
                return;
            }
            const existingReferral = await this.referalUserService.findByReferredUserId(referredUserId);
            if (existingReferral) {
                this.logger.log(`User ${referredUserId} was already referred. Skipping duplicate record.`);
                return;
            }
            await this.referalUserService.create({
                referalCode: usedReferalCode,
                userId: referrerUser.id,
                referredUserId,
                hasCompletedFirstTrip: false,
            });
            this.logger.log(`Successfully created referral record: Referrer user ${referrerUser.id} (code: ${referrerUser.referalCode}) referred user ${referredUserId} with code ${usedReferalCode}`);
        }
        catch (error) {
            this.logger.error(`Failed to handle referral tracking:`, error);
        }
    }
};
exports.UserEventListener = UserEventListener;
__decorate([
    (0, event_emitter_1.OnEvent)('user.generate-referal-code'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserEventListener.prototype, "handleGenerateReferalCode", null);
exports.UserEventListener = UserEventListener = UserEventListener_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        referal_user_service_1.ReferalUserService])
], UserEventListener);
//# sourceMappingURL=user.listener.js.map