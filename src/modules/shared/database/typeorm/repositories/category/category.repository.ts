import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CategoryRepository } from '@category/infra';
import { Category } from '@category/domain/entity/category';
import { TypeORMCategoryEntity, dataSource } from '@shared/database/typeorm';

@Injectable()
export class TypeORMCategoryRepository implements CategoryRepository {
  private repository: Repository<TypeORMCategoryEntity>;

  constructor() {
    this.repository = dataSource.getRepository(TypeORMCategoryEntity);
  }

  async getAll(): Promise<Category[] | []> {
    throw new Error('Method not implemented.');
  }

  async save(category: Category): Promise<Category> {
    return await this.repository.save(category);
  }
}
