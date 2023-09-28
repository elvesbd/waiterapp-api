import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '@application/domain/entities';
import { ProductRepository } from '@application/domain/repositories';
import { ProductModel } from '@infra/database/mongo/models';
import { ProductMapper } from '@infra/database/mongo/mappers/product';

@Injectable()
export class MongoDBProductRepository implements ProductRepository {
  constructor(
    @InjectModel(ProductModel.name)
    private readonly productModel: Model<ProductModel>,
  ) {}
  private logger = new Logger(MongoDBProductRepository.name);

  async getOne(id: string, clientId: string): Promise<Product> {
    try {
      const category = await this.productModel
        .findOne({ _id: id, clientId: clientId })
        .exec();
      return ProductMapper.toDomain(category);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  async getAll(clientId: string): Promise<Product[]> {
    try {
      const products = await this.productModel
        .find({ clientId: clientId })
        .exec();
      return ProductMapper.toDomainArray(products);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  async getAllByCategory(
    clientId: string,
    categoryId: string,
  ): Promise<any[] | []> {
    try {
      const products = await this.productModel
        .find({ clientId, categoryId })
        .exec();
      return ProductMapper.toDomainArray(products);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  async save(product: Product): Promise<void> {
    try {
      await this.productModel.create(product);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.productModel.findByIdAndDelete(id).exec();
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }
}
