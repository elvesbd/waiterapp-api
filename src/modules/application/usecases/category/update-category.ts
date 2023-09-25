import { Injectable } from '@nestjs/common';
import {
  CategoryInput,
  CategoryOutput,
} from '@application/usecases/types/category';
import { CategoryRepository } from '@application/domain/repositories';
import { CategoryNotFoundException } from '@application/exceptions/category';
import { FileStorageService } from '@application/domain/storage';
import { CapitalizeNameService } from '@infra/utils';
import { FileDto } from '@api/DTOs/shared';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly fileStorageService: FileStorageService,
  ) {}

  async execute(
    clientId: string,
    input: CategoryInput,
    file: FileDto,
  ): Promise<CategoryOutput> {
    const { id, name } = input;
    const category = await this.categoryRepository.getOne(clientId, id);
    if (!category) throw new CategoryNotFoundException();

    if (!file) {
      const updatedCategory = {
        ...category,
        ...input,
        name: CapitalizeNameService.handler(name),
      };
      await this.categoryRepository.update(updatedCategory);
      return;
    }

    const path = await this.fileStorageService.upload({
      clientId,
      originalname: name,
      buffer: file.buffer,
      width: 20,
      height: 20,
    });
    const imageUrl = await this.fileStorageService.getUrl(path);

    const updatedCategory = {
      ...category,
      ...input,
      name: CapitalizeNameService.handler(name),
      imageUrl,
    };

    return await this.categoryRepository.update(updatedCategory);
  }
}
