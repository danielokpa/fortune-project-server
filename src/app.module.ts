import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import appConfig from './config/app.config';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PatientsModule } from './modules/patients/patient.module';
import { DevicesModule } from './modules/devices/device.module';
import { HealthReadingsModule } from './modules/healthReadings/health-reading.module';
// import { CountriesModule } from './modules/countries/countries.module';
// import { ClientDevicesModule } from './modules/client-devices/client-devices.module';
// import { CategoryModule } from './modules/categories/category.module';
import { ApplicationModule } from './modules/application/application.module';
import { CandidateModule } from './modules/candidates/candidate.module';
import { UploadModule } from './modules/uploads/upload.module';
import { CloudflareModule } from './services/cloudflare/cloudflare.module';
import { TokenModule } from './services/token/token.module';
import { MailModule } from './services/mail/mail.module';
import { SmsModule } from './services/sms/sms.module';
import { AxiosModule } from './services/axios/axios.module';

import { ApiKeyInterceptor } from './interceptors/api-key.interceptors';

import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),

    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),

    PrismaModule,

    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get<number>('app.rateLimitTtl') || 60000,
          limit: config.get<number>('app.rateLimitLimit') || 10,
        },
      ],
    }),

    AuthModule,
    UsersModule,
    PatientsModule,
    DevicesModule,
    HealthReadingsModule,
    // CountriesModule,
    // ClientDevicesModule,
    // CategoryModule,
    ApplicationModule,
    CandidateModule,
    UploadModule,
    CloudflareModule,
    TokenModule,
    MailModule,
    SmsModule,
    AxiosModule,
  ],

  controllers: [AppController],

  providers: [AppService, ApiKeyInterceptor],
})
export class AppModule {}
