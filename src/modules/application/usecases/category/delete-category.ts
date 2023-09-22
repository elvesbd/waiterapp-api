import { CategoryRepository } from '@application/domain/repositories';
import { CategoryNotFoundException } from '@application/exceptions/category';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: string, clientId: string): Promise<void> {
    const category = await this.categoryRepository.getOne(id, clientId);
    if (!category) throw new CategoryNotFoundException();
    return await this.categoryRepository.delete(category.id);
  }
}
