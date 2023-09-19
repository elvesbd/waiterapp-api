import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository, FileStorageService } from '@category/infra';
import { Category } from '@category/domain/entity/category';
import { InputDto, ResponseDto } from '@category/dto';
import { CreateCategoryException } from '@category/exceptions';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository,
    @Inject('FileStorageService')
    private readonly fileStorageService: FileStorageService,
  ) {}

  async execute({ name, file }: InputDto): Promise<ResponseDto> {
    try {
      const path = await this.fileStorageService.upload(file);
      const imageUrl = await this.fileStorageService.getUrl(path);
      const category = new Category({ name, imageUrl });
      await this.categoryRepository.save(category);
      return category;
    } catch (error) {
      throw new CreateCategoryException(name);
    }
  }
}
