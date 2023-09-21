import { CategoryRepository } from '@application/domain/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: string, clientId: string): Promise<void> {
    return await this.categoryRepository.delete(id, clientId);
  }
}
