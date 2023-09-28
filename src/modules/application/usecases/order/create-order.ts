import { Order } from '@application/domain/entities';
import { OrderRepository } from '@application/domain/repositories';
import { Injectable } from '@nestjs/common';
import { OrderInput } from '@application/usecases/types/order';

@Injectable()
export class CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(clientId: string, body: OrderInput): Promise<Order> {
    const order = Order.create({ clientId, ...body });
    await this.orderRepository.save(order);
    return order;
  }
}
