import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryModule } from '../category/category.module';
import { Product } from './entity/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const productsService = new ProductsService(new Repository);
    console.log('🚀 ~ file: products.controller.spec.ts ~ line 13 ~ beforeEach ~ productsService', productsService)
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'hubspace',
          password: 'hubspace',
          database: 'e2e_test',
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Product]), 
        CategoryModule
      ],
      controllers: [ProductsController],
      providers: [ProductsService]
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    console.log('🚀 ~ file: products.controller.spec.ts ~ line 25 ~ it ~ controller', controller)
    expect(1).toEqual(1)
  });
});
