import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { Category } from './entity/category.entity';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) {}

    @Get()
    async find(): Promise<Category[]> {
        return await this.categoryService.findAll();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() newProduct: CategoryDto): Promise<Category> {
        const category = new Category();
        category.name = newProduct.name;
        return await this.categoryService.createOrUpdate(category);
    }

    
}
