import { Injectable } from '@nestjs/common';
import { ProductRepository } from '@application/domain/repositories';
import { ProductOutput } from '@application/usecases/types/product';

@Injectable()
export class GetAllProductsByCategoryUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(
    clientId: string,
    categoryId: string,
  ): Promise<ProductOutput[]> {
    const products = await this.productRepository.getAllByCategory(
      clientId,
      categoryId,
    );
    if (!products.length) return [];
    return products;
  }
}
