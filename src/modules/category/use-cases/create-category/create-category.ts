import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository, FileStorageService } from '@category/infra';
import { Category } from '@category/domain/entity/category';
import { FileDto, OutputDto } from '@category/dto';
import { CreateCategoryException } from '@category/exceptions';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository,
    @Inject('FileStorageService')
    private readonly fileStorageService: FileStorageService,
  ) {}

  async execute(name: string, file: FileDto): Promise<OutputDto> {
    try {
      const { originalname, buffer } = file;
      const path = await this.fileStorageService.upload(originalname, buffer);
      const imageUrl = await this.fileStorageService.getUrl(path);
      const category = new Category(name, imageUrl);
      await this.categoryRepository.save(category);
      return category;
    } catch (error) {
      throw new CreateCategoryException(name);
    }
  }
}
