import { OrderRepository } from '@application/domain/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAllOrdersUseCase {
  constructor(private readonly ordersRepository: OrderRepository) {}

  async execute(clientId: string): Promise<any> {
    const orders = await this.ordersRepository.getAll(clientId);
    if (!orders.length) return [];
    return orders;
  }
}
