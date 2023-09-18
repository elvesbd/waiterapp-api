import { Injectable } from '@nestjs/common';
import { Category } from '@category/domain/entity/category';
import { CategoryRepository } from '@category/infra';
import { CategoryInputDto } from '@category/dto';

@Injectable()
export class TypeORMCategoryRepository implements CategoryRepository {
  async getAll(): Promise<Category[] | []> {
    throw new Error('Method not implemented.');
  }

  async create(input: CategoryInputDto): Promise<void> {
    await console.log(input);
  }
}
