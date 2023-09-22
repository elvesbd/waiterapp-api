import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from '@application/domain/entities';
import { ProductRepository } from '@application/domain/repositories';
import { TypeORMProductEntity, dataSource } from '@infra/database/typeorm';
import { Input } from '@application/usecases/types/product';

@Injectable()
export class TypeORMProductRepository implements ProductRepository {
  private repository: Repository<TypeORMProductEntity>;

  constructor() {
    this.repository = dataSource.getRepository(TypeORMProductEntity);
  }

  async save(category: Product): Promise<void> {
    await this.repository.save(category);
  }

  async getOne(id: string, clientId: string): Promise<Product> {
    return await this.repository.findOne({
      where: {
        id,
        clientId,
      },
    });
  }

  async getAll(clientId: string): Promise<Product[] | []> {
    return await this.repository.find({
      where: {
        clientId,
      },
    });
  }

  public async update(id: string, input: Input): Promise<void> {
    await this.repository.update(id, input);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ id });
  }
}
