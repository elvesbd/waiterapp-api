import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '@core/domain/entities';
import { CategoryRepository } from '@core/domain/repositories';
import { CategoryModel } from '@infra/database/mongo/models';
import { CategoryMapper } from '@infra/database/mongo/mappers/category';

@Injectable()
export class MongoDBCategoryRepository implements CategoryRepository {
  constructor(
    @InjectModel(CategoryModel.name)
    private readonly categoryModel: Model<CategoryModel>,
  ) {}

  private logger = new Logger(MongoDBCategoryRepository.name);

  async getOne(clientId: string, id: string): Promise<Category> {
    try {
      const category = await this.categoryModel
        .findOne({ _id: id, clientId: clientId })
        .exec();
      return CategoryMapper.toDomain(category);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  async getAll(clientId: string): Promise<Category[]> {
    try {
      const categories = await this.categoryModel
        .find({ clientId: clientId })
        .exec();
      return CategoryMapper.toDomainArray(categories);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  async save(category: Category): Promise<void> {
    try {
      await this.categoryModel.create(category);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.categoryModel.findByIdAndDelete(id).exec();
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }
}
