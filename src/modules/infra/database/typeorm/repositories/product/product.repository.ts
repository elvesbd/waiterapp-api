import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from '@application/domain/entities';
import { ProductRepository } from '@application/domain/repositories';
import { TypeORMProductEntity, dataSource } from '@infra/database/typeorm';

@Injectable()
export class TypeORMProductRepository implements ProductRepository {
  constructor() {
    this.repository = dataSource.getRepository(TypeORMProductEntity);
  }
  private repository: Repository<TypeORMProductEntity>;
  private logger = new Logger(TypeORMProductRepository.name);

  async save(category: Product): Promise<void> {
    try {
      await this.repository.save(category);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  async getOne(id: string, clientId: string): Promise<Product> {
    try {
      return await this.repository.findOne({
        where: {
          id,
          clientId,
        },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  async getAll(clientId: string): Promise<Product[] | []> {
    try {
      return await this.repository.find({
        where: {
          clientId,
        },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete({ id });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }
}
