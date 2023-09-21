import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from '@application/domain/entities';
import { ProductRepository } from '@application/domain/repositories';
import { TypeORMProductEntity, dataSource } from '@infra/database/typeorm';

@Injectable()
export class TypeORMProductRepository implements ProductRepository {
  private repository: Repository<TypeORMProductEntity>;

  constructor() {
    this.repository = dataSource.getRepository(TypeORMProductEntity);
  }

  async getAll(clientId: string): Promise<Product[] | []> {
    return await this.repository.find({
      where: {
        clientId,
      },
    });
  }

  async save(category: Product): Promise<void> {
    await this.repository.save(category);
  }
}
