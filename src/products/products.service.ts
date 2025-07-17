import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationService } from 'src/common/pagination/pagination.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private paginationService: PaginationService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      return { data: product };
    } catch (e: any) {
      return { error: e };
    }
  }

  async getProducts(page: number, limit: number) {
    const products = await this.productRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
    const total = await this.productRepository.count();
    const meta = this.paginationService.getPaginationMeta(page, limit, total);
    return { data: products, meta };
  }

  async getProductById(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });
    return { data: product };
  }
}
