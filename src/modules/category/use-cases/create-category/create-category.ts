import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from '@category/infra/repository';
import { Category } from '@category/domain/entity/category';
import { FileDto, OutputDto } from '@category/dto';
import { CategoryAlreadyExistsException } from '@category/exceptions';
import { FileStorageService } from '@category/infra/storage';
import { CapitalizeNameService } from '@shared/utils';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository,
    @Inject('FileStorageService')
    private readonly fileStorageService: FileStorageService,
  ) {}

  async execute(name: string, file: FileDto): Promise<OutputDto> {
    const formattedName = CapitalizeNameService.handler(name);

    const existingCategory =
      await this.categoryRepository.getByName(formattedName);
    if (existingCategory)
      throw new CategoryAlreadyExistsException(existingCategory.name);

    const { originalname, buffer } = file;
    const imageUrl = await this.uploadFile(originalname, buffer);

    const category = new Category(formattedName, imageUrl);
    await this.categoryRepository.save(category);
    return category;
  }

  private async uploadFile(
    originalname: string,
    buffer: Buffer,
  ): Promise<string> {
    const path = await this.fileStorageService.upload(originalname, buffer);
    const imageUrl = await this.fileStorageService.getUrl(path);
    return imageUrl;
  }
}
