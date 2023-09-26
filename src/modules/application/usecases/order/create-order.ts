import { OrderRepository } from '@application/domain/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(clientId: string, body: any): Promise<any> {
    return await this.orderRepository.create(clientId, body);
  }
}
