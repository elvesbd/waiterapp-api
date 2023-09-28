import { Injectable } from '@nestjs/common';
import { ProductRepository } from '@core/domain/repositories';
import { ProductOutput } from '@core/usecases/types/product';

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
