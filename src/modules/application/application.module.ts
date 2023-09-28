import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InfraModule } from '@infra/infra.module';
import { FileStorageService } from '@application/domain/storage';
import { SupaBaseFileStorageService } from '@infra/services/storage';
import {
  CreateCategoryUseCase,
  GetAllCategoriesUseCase,
  DeleteCategoryUseCase,
} from '@application/usecases/category';
import {
  CreateOrderUseCase,
  GetAllOrdersUseCase,
  ChangeOrderStatusUseCase,
} from '@application/usecases/order';
import {
  CreateProductUseCase,
  GetAllProductsUseCase,
  DeleteProductUseCase,
  GetAllProductsByCategoryUseCase,
} from '@application/usecases/product';
import {
  CategoryRepository,
  OrderRepository,
  ProductRepository,
} from '@application/domain/repositories';
import {
  MongoDBCategoryRepository,
  MongoDBOrderRepository,
  MongoDBProductRepository,
} from 'modules/infra/database/mongo/repositories';
import {
  CategoryModel,
  CategorySchema,
  OrderModel,
  OrderSchema,
  ProductModel,
  ProductSchema,
} from 'modules/infra/database/mongo/models';

const categoryProviders = [
  CreateCategoryUseCase,
  GetAllCategoriesUseCase,
  DeleteCategoryUseCase,
];
const orderProviders = [
  CreateOrderUseCase,
  GetAllOrdersUseCase,
  ChangeOrderStatusUseCase,
];
const productProviders = [
  CreateProductUseCase,
  GetAllProductsUseCase,
  DeleteProductUseCase,
  GetAllProductsByCategoryUseCase,
];

@Module({
  imports: [
    InfraModule,
    MongooseModule.forFeature([
      { name: CategoryModel.name, schema: CategorySchema },
      { name: OrderModel.name, schema: OrderSchema },
      { name: ProductModel.name, schema: ProductSchema },
    ]),
  ],
  providers: [
    ...categoryProviders,
    ...orderProviders,
    ...productProviders,
    {
      provide: CategoryRepository,
      useClass: MongoDBCategoryRepository,
    },
    {
      provide: OrderRepository,
      useClass: MongoDBOrderRepository,
    },
    {
      provide: ProductRepository,
      useClass: MongoDBProductRepository,
    },
    {
      provide: FileStorageService,
      useClass: SupaBaseFileStorageService,
    },
  ],
  exports: [...categoryProviders, ...orderProviders, ...productProviders],
})
export class ApplicationModule {}
