import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { ProductRepository } from './repositories/product.repository';
import { InventoryListener } from './listeners/product.listener';

@Module({
  imports: [],

  controllers: [ProductController],

  providers: [ProductService, ProductRepository, InventoryListener],

  exports: [ProductService, ProductRepository],
})
export class ProductModule {}
