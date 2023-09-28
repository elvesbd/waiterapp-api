import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
//import { databaseProviders } from '@infra/database/mongo/config';
import {
  MongoDBCategoryRepository,
  MongoDBOrderRepository,
  MongoDBProductRepository,
} from '@infra/database/mongo/repositories';
import {
  SupaBaseFileStorageService,
  SupaBaseClientService,
} from '@infra/services/storage';
import {
  CategoryModel,
  CategorySchema,
  OrderModel,
  OrderSchema,
  ProductModel,
  ProductSchema,
} from './database/mongo/models/';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        config: ConfigService,
      ): Promise<MongooseModuleFactoryOptions> => ({
        uri: config.get<string>('MONGO_URI'),
        dbName: config.get<string>('MONGO_DB_NAME'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: CategoryModel.name, schema: CategorySchema },
      { name: OrderModel.name, schema: OrderSchema },
      { name: ProductModel.name, schema: ProductSchema },
    ]),
  ],
  providers: [
    MongoDBCategoryRepository,
    MongoDBOrderRepository,
    MongoDBProductRepository,
    SupaBaseFileStorageService,
    SupaBaseClientService,
    //...databaseProviders,
  ],
  exports: [
    MongoDBCategoryRepository,
    MongoDBOrderRepository,
    MongoDBProductRepository,
    SupaBaseFileStorageService,
    SupaBaseClientService,
    //...databaseProviders,
  ],
})
export class InfraModule {}
