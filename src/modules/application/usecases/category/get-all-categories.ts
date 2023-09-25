import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '@application/domain/repositories';
import { CategoryOutput } from '@application/usecases/types/category';

@Injectable()
export class GetAllCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(clientId: string): Promise<CategoryOutput[] | []> {
    const categories = await this.categoryRepository.getAll(clientId);
    if (!categories.length) return [];
    return categories;
  }
}
