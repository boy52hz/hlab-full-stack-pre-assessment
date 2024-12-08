import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ILike, Repository } from 'typeorm';
import { PaginateParams } from 'src/shared/get-paginate-params';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productRepository.save(createProductDto);
  }

  search({ q, skip, take }: PaginateParams) {
    return this.productRepository.find({
      where: {
        translations: {
          name: ILike(`%${q}%`),
        },
      },
      relations: {
        translations: true,
      },
      take,
      skip,
    });
  }
}
