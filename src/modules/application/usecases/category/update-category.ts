import { Injectable } from '@nestjs/common';
import { Input } from '@application/usecases/types/category';
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

  async execute(id: string, input: Input, file: FileDto): Promise<void> {
    const { clientId, name } = input;
    const category = await this.categoryRepository.getOne(id, clientId);
    if (!category) throw new CategoryNotFoundException();

    if (!file) {
      const updatedCategory = {
        ...category,
        ...input,
        name: CapitalizeNameService.handler(input.name),
      };
      await this.categoryRepository.update(id, updatedCategory);
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
      name: CapitalizeNameService.handler(input.name),
      imageUrl,
    };

    return await this.categoryRepository.update(id, updatedCategory);
  }
}
