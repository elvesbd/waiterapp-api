import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '@application/domain/repositories';
import { GetAllProductsByCategoryResponseDto } from '@api/DTOs/category';

@Injectable()
export class GetAllProductsByCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(
    clientId: string,
    id: string,
  ): Promise<GetAllProductsByCategoryResponseDto[] | []> {
    const products = await this.categoryRepository.getByCategory(clientId, id);
    console.log(products);
    if (!products.length) return [];
    return products;
  }
}
