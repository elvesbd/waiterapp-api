import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TypeORMProductEntity, dataSource } from '@shared/database/typeorm';
import { ProductRepository } from '@product/infra/repository';
import { Product } from '@product/domain';

@Injectable()
export class TypeORMProductRepository implements ProductRepository {
  private repository: Repository<TypeORMProductEntity>;

  constructor() {
    this.repository = dataSource.getRepository(TypeORMProductEntity);
  }

  async getAll(): Promise<Product[] | []> {
    return await this.repository.find();
  }

  async save(category: Product): Promise<void> {
    await this.repository.save(category);
  }
}
