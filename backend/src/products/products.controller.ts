import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { ProductDto } from './dto/product.dto';
import { Product } from './entity/product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly categoryService: CategoryService
    ) {}

    @Get()
    async find(): Promise<Product[]> {
        return await this.productsService.findAll();
    }

    @Get(':id') 
    async findOne(@Param('id') id: number): Promise<Product> {
        return await this.productsService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() newProduct: ProductDto): Promise<Product> {
        const product = new Product();
        product.name = newProduct.name;
        product.price = newProduct.price;
        product.category = await this.categoryService.findOne(newProduct.category)
        return await this.productsService.createOrUpdate(product);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() ProductDto: ProductDto,
    ): Promise<Product> {
        const product = await this.productsService.findOne(id);
        product.name = ProductDto.name;
        product.price = ProductDto.price;
        product.category = await this.categoryService.findOne(ProductDto.category)
        return await this.productsService.createOrUpdate(product);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        await this.productsService.delete(id);
        return { success: true };
    }

}
