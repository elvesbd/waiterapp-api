import { Injectable } from '@nestjs/common';
import { OutputDto } from '@api/DTOs/category';
import { CategoryRepository } from '@application/domain/repositories';

@Injectable()
export class GetAllCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(clientId: string): Promise<OutputDto[] | []> {
    const categories = await this.categoryRepository.getAll(clientId);
    if (!categories.length) return [];
    return categories;
  }
}
