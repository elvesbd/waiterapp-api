import { CategoryRepository } from '@application/domain/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAllProductsByCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(clientId: string, id: string): Promise<any> {
    return await this.categoryRepository.getByCategory(clientId, id);
  }
}
