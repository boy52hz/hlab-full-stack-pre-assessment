import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductTranslation } from './entities/product-translation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductTranslation])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
