import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const product = await this.productRepository.findOne({
        where: { id: createOrderDto.productId },
      });
      if (!product) return 'Product not found!';
      const order = this.orderRepository.create({ ...createOrderDto, product });
      await this.orderRepository.save(order);
      return order;
    } catch (e: any) {
      return e.message ?? 'An error occurred!';
    }
  }

  async getOrders(page: number, limit: number) {
    const orders = await this.orderRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['product'],
      select: { product: { name: true, price: true, image: true } },
    });
    return orders;
  }

  async getOrderById(id: string) {
    const order = this.orderRepository.findOne({
      where: { id },
      relations: ['product'],
      select: { product: { name: true, price: true, image: true } },
    });
    return order;
  }
}
