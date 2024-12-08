import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { PaginateQueryDto } from '../shared/paginate-query.dto';
import { getPaginateParams } from '../shared/get-paginate-params';
import { ILike } from 'typeorm';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockupProductRepository = {
    save: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockupProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product when provided data is valid', async () => {
      const createProductDto: CreateProductDto = {
        sku: 'TEST-001',
        translations: [
          {
            name: 'Test Product',
            description: 'This is a test product',
            language: 'en',
          },
        ],
      };

      const product = {
        id: 1,
        sku: 'TEST-001',
        translations: [
          {
            id: 1,
            name: 'Test Product',
            description: 'This is a test product',
            language: 'en',
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      jest.spyOn(mockupProductRepository, 'save').mockReturnValue(product);

      const result = await service.create(createProductDto);

      expect(mockupProductRepository.save).toHaveBeenCalledWith(
        createProductDto,
      );
      expect(result).toEqual(product);
    });

    it('should throw an error when repository.save fails', async () => {
      const createProductDto: CreateProductDto = {
        sku: 'TEST-002',
        translations: [
          {
            name: 'Another Product',
            description: 'Another description',
            language: 'en',
          },
        ],
      };

      jest
        .spyOn(mockupProductRepository, 'save')
        .mockRejectedValue(new Error('Database error'));

      await expect(service.create(createProductDto)).rejects.toThrow(
        'Database error',
      );
    });
  });

  describe('search', () => {
    it('should search products when provided query is valid', async () => {
      const query: PaginateQueryDto = {
        q: 'test',
        page: 1,
        limit: 10,
      };
      const paginateParams = getPaginateParams(query);
      const products = [
        {
          id: 1,
          sku: 'TEST-001',
          translations: [
            {
              id: 1,
              name: 'Test Product',
              description: 'This is a test product',
              language: 'en',
            },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      jest.spyOn(mockupProductRepository, 'find').mockReturnValue(products);

      const result = await service.search(paginateParams);

      expect(mockupProductRepository.find).toHaveBeenCalledWith({
        where: {
          translations: {
            name: ILike(`%${paginateParams.q}%`),
          },
        },
        relations: {
          translations: true,
        },
        skip: paginateParams.skip,
        take: paginateParams.take,
      });
      expect(result).toEqual(products);
    });

    it('should return an empty array if no products match the query', async () => {
      const query: PaginateQueryDto = {
        q: 'no results',
        page: 1,
        limit: 10,
      };
      const paginateParams = getPaginateParams(query);

      jest.spyOn(mockupProductRepository, 'find').mockReturnValue([]);

      const result = await service.search(paginateParams);

      expect(result).toEqual([]);
    });

    it('should handle empty query gracefully', async () => {
      const query: PaginateQueryDto = {
        q: '',
        page: 1,
        limit: 10,
      };
      const paginateParams = getPaginateParams(query);
      const products = [
        {
          id: 1,
          sku: 'TEST-001',
          translations: [
            {
              id: 1,
              name: 'Default Product',
              description: 'Default description',
              language: 'en',
            },
          ],
        },
      ];

      jest.spyOn(mockupProductRepository, 'find').mockReturnValue(products);

      const result = await service.search(paginateParams);

      expect(mockupProductRepository.find).toHaveBeenCalledWith({
        where: {
          translations: {
            name: ILike(`%${paginateParams.q}%`),
          },
        },
        relations: {
          translations: true,
        },
        skip: paginateParams.skip,
        take: paginateParams.take,
      });
      expect(result).toEqual(products);
    });

    it('should throw an error when repository.find fails', async () => {
      const query: PaginateQueryDto = {
        q: 'failed',
        page: 1,
        limit: 10,
      };
      const paginateParams = getPaginateParams(query);
      jest
        .spyOn(mockupProductRepository, 'find')
        .mockRejectedValue(new Error('Database error'));

      await expect(service.search(paginateParams)).rejects.toThrow(
        'Database error',
      );
    });
  });
});
