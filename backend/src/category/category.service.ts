import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoryService {
    options: { relations: [string]; };

    constructor(
      @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    ) {}

    async createOrUpdate(category: Category): Promise<Category> {
      return await this.categoryRepository.save(category);
    }
  
    async findOne(id: number): Promise<Category> {
      return await this.categoryRepository.findOne({ id });
    }

    async findAll(): Promise<Category[]> {
      return await this.categoryRepository.find();
    }
}
