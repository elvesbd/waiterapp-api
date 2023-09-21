import { Injectable } from '@nestjs/common';
import { ProductRepository } from '@application/domain/repositories';

@Injectable()
export class GetAllProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<any[] | []> {
    const products = await this.productRepository.getAll();
    if (!products.length) return [];
    return products;
  }
}
