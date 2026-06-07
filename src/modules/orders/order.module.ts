import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { OrderRepository } from './repositories/order.repository';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [
    CartModule,
    EventEmitterModule
  ],

  controllers: [
    OrderController,
  ],

  providers: [
    OrderService,
    OrderRepository,
  ],

  exports: [
    OrderService,
    OrderRepository,
  ],
})
export class OrderModule {}