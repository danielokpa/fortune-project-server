import { Module } from '@nestjs/common';
import { ProductModule } from '../products/product.module';
import { CartController } from './controllers/cart.controller';

import { CartService } from './services/cart.service';

import { CartRepository } from './repositories/cart.repository';

@Module({
  imports: [ProductModule],
  controllers: [CartController],

  providers: [CartService, CartRepository],

  exports: [CartService],
})
export class CartModule {}
