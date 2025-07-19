import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth/auth.module';
import { PaginationService } from 'src/common/pagination/pagination.service';
import { Order } from './entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Product, User]),
    JwtModule.register({}),
    CommonModule,
    AuthModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, PaginationService],
})
export class OrdersModule {}
