import { IsString, IsUUID, IsDecimal, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @IsString({ message: 'customerId must be a string' })
  @IsUUID('all', { message: 'customerId must be a valid UUID' })
  customerId: string;

  @IsString({ message: 'productId must be a string' })
  @IsUUID('all', { message: 'productId must be a valid UUID' })
  productId: string;

  @IsPositive({ message: 'quantity must be a positive number' })
  quantity: number;

  @IsDecimal(
    { decimal_digits: '2' },
    { message: 'totalSum must be a decimal number' },
  )
  totalSum: number;
}
