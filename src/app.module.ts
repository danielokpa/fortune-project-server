import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import appConfig from './config/app.config';

// import { AuthModule } from './modules/auth/auth.module';
// import { UsersModule } from './modules/users/users.module';
// import { CountriesModule } from './modules/countries/countries.module';
// import { ClientDevicesModule } from './modules/client-devices/client-devices.module';
// import { CategoryModule } from './modules/categories/category.module';
import { AssessmentModule } from './modules/assessment/assessment.module';
import { ApplicationModule } from './modules/application/application.module';
import { JobModule } from './modules/jobs/job.module';
import { CandidateModule } from './modules/candidates/candidate.module';
// import { TokenModule } from './services/token/token.module';
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

    // AuthModule,
    // UsersModule,
    // CountriesModule,
    // ClientDevicesModule,
    // CategoryModule,
    JobModule,
    AssessmentModule,
    ApplicationModule,
    CandidateModule,
    // TokenModule,
    MailModule,
    SmsModule,
    AxiosModule,
  ],

  controllers: [AppController],

  providers: [AppService, ApiKeyInterceptor],
})
export class AppModule {}
