import { Injectable } from '@nestjs/common';
import { Order } from '@core/domain/entities';
import { OrderInput } from '@core/usecases/types/order';
import { OrderRepository } from '@core/domain/repositories';

@Injectable()
export class CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(clientId: string, body: OrderInput): Promise<Order> {
    const order = Order.create({ clientId, ...body });
    await this.orderRepository.save(order);
    return order;
  }
}
