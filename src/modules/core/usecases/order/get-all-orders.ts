import { Injectable } from '@nestjs/common';
import { OrderRepository } from '@core/domain/repositories';

@Injectable()
export class GetAllOrdersUseCase {
  constructor(private readonly ordersRepository: OrderRepository) {}

  async execute(clientId: string): Promise<any> {
    const orders = await this.ordersRepository.getAll(clientId);
    if (!orders.length) return [];
    return orders;
  }
}
