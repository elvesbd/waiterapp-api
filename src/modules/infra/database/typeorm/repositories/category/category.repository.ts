import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from '@application/domain/entities';
import { CategoryRepository } from '@application/domain/repositories';
import { TypeORMCategoryEntity, dataSource } from '@infra/database/typeorm';
import { GetAllProductsByCategoryResponseDto } from '@api/DTOs/category';

@Injectable()
export class TypeORMCategoryRepository implements CategoryRepository {
  constructor() {
    this.repository = dataSource.getRepository(TypeORMCategoryEntity);
  }
  private repository: Repository<TypeORMCategoryEntity>;
  private logger = new Logger(TypeORMCategoryRepository.name);

  async save(category: Category): Promise<void> {
    await this.repository.save(category);
  }

  async getOne(clientId: string, id: string): Promise<Category> {
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

  async getAll(clientId: string): Promise<Category[] | []> {
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

  async getByCategory(
    clientId: string,
    id: string,
  ): Promise<GetAllProductsByCategoryResponseDto[] | []> {
    try {
      console.log('id', id);
      console.log('id', clientId);
      return await this.repository.find({
        where: {
          id,
          clientId,
        },
        relations: {
          products: true,
        },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  public async update(category: Category): Promise<Category> {
    try {
      return await this.repository.save({
        id: category.id,
        ...category,
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
