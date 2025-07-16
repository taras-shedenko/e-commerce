import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private producRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.producRepository.create(createProductDto);
    await this.producRepository.save(product);
    return { message: 'Product created successfully', product };
  }

  async getProducts(page: number, limit: number) {
    const products = await this.producRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
    return products;
  }

  async getProductById(id: string) {
    const product = await this.producRepository.findOne({ where: { id } });
    return product;
  }
}
