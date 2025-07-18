import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationService } from 'src/common/pagination/pagination.service';
import { Order } from './entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(User) private customerRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private paginationService: PaginationService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const customer = await this.customerRepository.findOne({
        where: { id: createOrderDto.customerId },
      });
      if (!customer) throw new Error('Customer not found!');
      const product = await this.productRepository.findOne({
        where: { id: createOrderDto.productId },
      });
      if (!product) throw new Error('Product not found!');
      const order = this.orderRepository.create({
        ...createOrderDto,
        customer,
        product,
      });
      await this.orderRepository.save(order);
      return { data: order };
    } catch (e: any) {
      return { error: e };
    }
  }

  async getOrders(page: number, limit: number) {
    const orders = await this.orderRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['customer', 'product'],
      select: {
        customer: { email: true, username: true },
        product: { name: true, price: true, image: true },
      },
    });
    const total = await this.orderRepository.count();
    const meta = this.paginationService.getPaginationMeta(page, limit, total);
    return { data: orders, meta };
  }

  async getOrderById(id: string) {
    const order = this.orderRepository.findOne({
      where: { id },
      relations: ['customer', 'product'],
      select: {
        customer: { email: true, username: true },
        product: { name: true, price: true, image: true },
      },
    });
    return { data: order };
  }
}
