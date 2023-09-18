import { Inject, Injectable } from '@nestjs/common';
import { CategoryOutputDto } from '@category/dto';
import { CategoryRepository } from '@category/infra';

@Injectable()
export class GetAllCategoriesUseCase {
  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(): Promise<CategoryOutputDto[] | []> {
    const categories = await this.categoryRepository.getAll();
    if (!categories.length) return [];
    return categories;
  }
}
