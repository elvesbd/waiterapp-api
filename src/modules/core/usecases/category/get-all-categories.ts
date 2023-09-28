import { Injectable } from '@nestjs/common';
import { CategoryOutput } from '@core/usecases/types/category';
import { CategoryRepository } from '@core/domain/repositories';

@Injectable()
export class GetAllCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(clientId: string): Promise<CategoryOutput[]> {
    const categories = await this.categoryRepository.getAll(clientId);
    if (!categories.length) return [];
    return categories;
  }
}
