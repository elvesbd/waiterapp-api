import { Injectable } from '@nestjs/common';
import { FileDto } from '@api/DTOs/shared';
import { Category } from '@application/domain/entities';
import { CategoryRepository } from '@application/domain/repositories';
import { FileStorageService } from '@application/domain/storage';
import { CategoryOutput } from '@application/usecases/types/category';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly fileStorageService: FileStorageService,
  ) {}

  async execute(
    clientId: string,
    name: string,
    file: FileDto,
  ): Promise<CategoryOutput> {
    const { originalname, buffer } = file;
    const path = await this.fileStorageService.upload({
      clientId,
      originalname,
      buffer,
      width: 20,
      height: 20,
    });
    const imageUrl = await this.fileStorageService.getUrl(path);

    const category = new Category(name, imageUrl, clientId);
    await this.categoryRepository.save(category);
    return category;
  }
}
