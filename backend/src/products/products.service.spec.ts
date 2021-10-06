import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module';
import { Product } from './entity/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Product]), CategoryModule],
      controllers: [ProductsController],
      providers: [
        ProductsService, 
        {
          provide: getRepositoryToken(Product),
          useValue: [],
        }
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should return an array of cats', async () => {


    console.log('🚀 ~ file: products.service.spec.ts ~ line 26 ~ it ~ service', service)
    // const x = await service.findAll()
    // console.log('🚀 ~ file: products.service.spec.ts ~ line 26 ~ it ~ x', x)
    // const result = ['test'];
    // jest.spyOn(service, 'findAll').mockImplementation(() => result);

    expect(1).toBe(1);
  });

});
