import { CategoryRepository } from '@application/domain/repositories';
import { FileStorageService } from '@application/domain/storage';
import { CategoryNotFoundException } from '@application/exceptions/category';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly fileStorageService: FileStorageService,
  ) {}

  async execute(id: string, clientId: string): Promise<void> {
    const category = await this.categoryRepository.getOne(id, clientId);
    if (!category) throw new CategoryNotFoundException();

    await this.fileStorageService.remove(category.imageUrl);
    await this.categoryRepository.delete(category.id);
  }
}
