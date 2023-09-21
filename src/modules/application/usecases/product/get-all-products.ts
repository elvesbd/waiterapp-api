import { Injectable } from '@nestjs/common';
import { ProductRepository } from '@application/domain/repositories';
import { OutputDto } from '@api/DTOs/product';

@Injectable()
export class GetAllProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(clientId: string): Promise<OutputDto[] | []> {
    const products = await this.productRepository.getAll(clientId);
    if (!products.length) return [];
    return products;
  }
}
