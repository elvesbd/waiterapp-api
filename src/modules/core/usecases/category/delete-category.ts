import { Injectable } from '@nestjs/common';
import { FileStorageService } from '@core/domain/storage';
import { CategoryRepository } from '@core/domain/repositories';
import { CategoryNotFoundException } from '@core/exceptions/category';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly fileStorageService: FileStorageService,
  ) {}

  async execute(clientId: string, id: string): Promise<void> {
    const category = await this.categoryRepository.getOne(clientId, id);
    if (!category) throw new CategoryNotFoundException();

    await this.fileStorageService.remove(category.imageUrl);
    await this.categoryRepository.delete(category.id);
  }
}
