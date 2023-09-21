import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from '@category/infra/repository';
import { Category } from '@category/domain/entity/category';
import { FileDto, OutputDto } from '@category/dto';
import { CategoryAlreadyExistsException } from '@category/exceptions';
import { CapitalizeNameService } from '@shared/utils';
import { CategoryFileStorageService } from '@category/infra/storage';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository,
    private readonly categoryFileStorageService: CategoryFileStorageService,
  ) {}

  async execute(name: string, file: FileDto): Promise<OutputDto> {
    const formattedName = CapitalizeNameService.handler(name);

    const existingCategory =
      await this.categoryRepository.getByName(formattedName);
    if (existingCategory)
      throw new CategoryAlreadyExistsException(existingCategory.name);

    const { originalname, buffer } = file;
    const path = await this.categoryFileStorageService.upload({
      originalname,
      buffer,
      width: 20,
      height: 20,
    });
    const imageUrl = await this.categoryFileStorageService.getUrl(path);

    const category = new Category(formattedName, imageUrl);
    await this.categoryRepository.save(category);
    return category;
  }
}
