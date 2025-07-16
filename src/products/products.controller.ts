import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  getProducts(@Query('page') page: string, @Query('limit') limit: string) {
    return this.productsService.getProducts(
      parseInt(page) || 1,
      parseInt(limit) || 10,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }
}
