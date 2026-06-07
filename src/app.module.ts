import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import appConfig from './config/app.config';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CountriesModule } from './modules/countries/countries.module';
import { ClientDevicesModule } from './modules/client-devices/client-devices.module';
import { ProductModule } from './modules/products/product.module';
import { CategoryModule } from './modules/categories/category.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/orders/order.module';
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
    CountriesModule,
    ClientDevicesModule,
    CategoryModule,
    ProductModule,
    CartModule,
    OrderModule,
    TokenModule,
    MailModule,
    SmsModule,
    AxiosModule,
  ],

  controllers: [AppController],

  providers: [AppService, ApiKeyInterceptor],
})
export class AppModule {}
