"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const app_config_1 = __importDefault(require("./config/app.config"));
const assessment_module_1 = require("./modules/assessment/assessment.module");
const job_module_1 = require("./modules/jobs/job.module");
const mail_module_1 = require("./services/mail/mail.module");
const sms_module_1 = require("./services/sms/sms.module");
const axios_module_1 = require("./services/axios/axios.module");
const api_key_interceptors_1 = require("./interceptors/api-key.interceptors");
const prisma_module_1 = require("./prisma/prisma.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            event_emitter_1.EventEmitterModule.forRoot(),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [app_config_1.default],
            }),
            prisma_module_1.PrismaModule,
            throttler_1.ThrottlerModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => [
                    {
                        ttl: config.get('app.rateLimitTtl') || 60000,
                        limit: config.get('app.rateLimitLimit') || 10,
                    },
                ],
            }),
            job_module_1.JobModule,
            assessment_module_1.AssessmentModule,
            mail_module_1.MailModule,
            sms_module_1.SmsModule,
            axios_module_1.AxiosModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, api_key_interceptors_1.ApiKeyInterceptor],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map