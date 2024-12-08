import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { PaginateQueryDto } from '../shared/paginate-query.dto';
import { PaginateResponseDto } from 'src/shared/paginate-response.dto';
import { Product } from './entities/product.entity';
import { PaginateMetaDto } from '../shared/paginate-meta.dto';
import { getPaginateParams } from '../shared/get-paginate-params';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async search(
    @Query() query?: PaginateQueryDto,
  ): Promise<PaginateResponseDto<Product>> {
    const paginateParams = getPaginateParams(query);
    const products = await this.productsService.search(paginateParams);
    const meta = new PaginateMetaDto(paginateParams, products.length);
    return {
      data: products,
      meta,
    };
  }
}
