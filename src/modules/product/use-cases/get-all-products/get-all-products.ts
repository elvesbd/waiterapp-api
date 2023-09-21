import { Injectable } from '@nestjs/common';
import { OutputDto } from '@product/dto';
import { ProductRepository } from '@product/infra/repository';

@Injectable()
export class GetAllProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<OutputDto[] | []> {
    const products = await this.productRepository.getAll();
    if (!products.length) return [];
    return products;
  }
}
