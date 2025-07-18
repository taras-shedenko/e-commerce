import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

export enum OrderStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
  CANCELLED = 'CANCELLED',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column({ default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  totalSum: number;

  @ManyToOne(() => User, (user) => user.orders)
  customer: User;

  @ManyToOne(() => Product, (product) => product.orders)
  product: Product;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
