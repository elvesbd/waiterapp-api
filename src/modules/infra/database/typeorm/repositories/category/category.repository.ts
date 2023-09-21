import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from '@application/domain/entities';
import { CategoryRepository } from '@application/domain/repositories';
import { TypeORMCategoryEntity, dataSource } from '@infra/database/typeorm';

@Injectable()
export class TypeORMCategoryRepository implements CategoryRepository {
  private repository: Repository<TypeORMCategoryEntity>;

  constructor() {
    this.repository = dataSource.getRepository(TypeORMCategoryEntity);
  }
  async getByName(name: string): Promise<Category> {
    return await this.repository.findOne({
      where: {
        name,
      },
    });
  }

  async getAll(): Promise<Category[] | []> {
    return await this.repository.find();
  }

  async save(category: Category): Promise<void> {
    await this.repository.save(category);
  }
}
