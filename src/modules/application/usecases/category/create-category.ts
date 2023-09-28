import { Injectable } from '@nestjs/common';
import { FileDto } from '@api/DTOs/shared';
import { Category } from '@application/domain/entities';
import { CategoryRepository } from '@application/domain/repositories';
import { FileStorageService } from '@application/domain/storage';

const CATEGORIES_IMAGE_FOLDER = 'categories';

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
  ): Promise<Category> {
    const imageUrl = await this.uploadProductImage(clientId, file);
    const category = Category.create({ name, imageUrl, clientId });
    await this.categoryRepository.save(category);
    return category;
  }

  private async uploadProductImage(
    clientId: string,
    file: FileDto,
  ): Promise<string> {
    const { originalname, buffer } = file;
    const path = await this.fileStorageService.upload({
      clientId,
      originalname,
      imageFolder: CATEGORIES_IMAGE_FOLDER,
      buffer,
      width: 20,
      height: 20,
    });
    return await this.fileStorageService.getUrl(path);
  }
}
