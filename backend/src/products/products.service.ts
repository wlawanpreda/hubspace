import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductsService {
    options: { 
      relations: [string];
      order: any
    };

    constructor(
      @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    ) {
      this.options = { relations: ['category'], order: { id: -1 } }
    }
  
    async createOrUpdate(product: Product): Promise<Product> {
      return await this.productRepository.save(product);
    }
  
    async findOne(id: number): Promise<Product> {
      return await this.productRepository.findOne({ id }, this.options);
    }
  
    async findAll(): Promise<Product[]> {
      return await this.productRepository.find(this.options);
    }
  
    async delete(id: number): Promise<DeleteResult> {
      return await this.productRepository.delete({ id });
    }

}
