import { Injectable } from '@nestjs/common';
import { Input } from '@application/usecases/types/category';
import { CategoryRepository } from '@application/domain/repositories';
import { CategoryNotFoundException } from '@application/exceptions/category';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(input: Input): Promise<void> {
    const category = await this.categoryRepository.getOne(
      input.id,
      input.clientId,
    );
    if (!category) throw new CategoryNotFoundException(input.name);

    const updatedCategory = {
      ...category,
      ...input,
    };

    return await this.categoryRepository.update(updatedCategory);
  }
}
