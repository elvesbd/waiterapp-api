import { Injectable } from '@nestjs/common';
import { Category } from '@category/domain/entity/category';
import { CategoryRepository } from '@category/infra';

@Injectable()
export class TypeORMCategoryRepository implements CategoryRepository {
  async getAll(): Promise<Category[] | []> {
    throw new Error('Method not implemented.');
  }

  async save(category: Category): Promise<void> {
    await console.log(category);
  }
}
