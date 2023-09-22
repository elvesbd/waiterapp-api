import { ProductRepository } from '@application/domain/repositories';
import { ProductNotFoundException } from '@application/exceptions/product';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string, clientId: string): Promise<void> {
    const product = await this.productRepository.getOne(id, clientId);
    if (!product) throw new ProductNotFoundException();
    await this.productRepository.delete(product.id);
  }
}
