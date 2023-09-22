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

  async save(category: Category): Promise<void> {
    await this.repository.save(category);
  }

  public async update(input: Category): Promise<void> {
    await this.repository.save(input);
  }

  async getOne(id: string, clientId: string): Promise<Category> {
    return await this.repository.findOne({
      where: {
        id,
        clientId,
      },
    });
  }

  async getAll(clientId: string): Promise<Category[] | []> {
    return await this.repository.find({
      where: {
        clientId,
      },
    });
  }

  async getByCategory(clientId: string, id: string): Promise<Category[] | []> {
    return await this.repository.find({
      where: {
        id,
        clientId,
      },
      relations: {
        products: true,
      },
    });
  }

  async delete(id: string, clientId: string): Promise<void> {
    await this.repository.delete({ id, clientId });
  }
}
