import { Injectable } from '@nestjs/common';
import { CapitalizeNameService } from '@infra/utils';
import { OutputDto } from '@api/DTOs/category';
import { FileDto } from '@api/DTOs/shared';
import { Category } from '@application/domain/entities';
import { CategoryRepository } from '@application/domain/repositories';
import { FileStorageService } from '@application/domain/storage';
import { CategoryAlreadyExistsException } from '@application/exceptions/category';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly fileStorageService: FileStorageService,
  ) {}

  async execute(name: string, file: FileDto): Promise<OutputDto> {
    const formattedName = CapitalizeNameService.handler(name);

    const existingCategory =
      await this.categoryRepository.getByName(formattedName);
    if (existingCategory)
      throw new CategoryAlreadyExistsException(existingCategory.name);

    const { originalname, buffer } = file;
    const path = await this.fileStorageService.upload({
      originalname,
      buffer,
      width: 20,
      height: 20,
    });
    const imageUrl = await this.fileStorageService.getUrl(path);

    const category = new Category(formattedName, imageUrl);
    await this.categoryRepository.save(category);
    return category;
  }
}
