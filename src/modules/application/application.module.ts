import { Module } from '@nestjs/common';
import { InfraModule } from '@infra/infra.module';
import { SupaBaseFileStorageService } from '@infra/services/storage';
import {
  CreateCategoryUseCase,
  GetAllCategoriesUseCase,
} from '@application/usecases/category';
import {
  ChangeOrderStatusUseCase,
  CreateOrderUseCase,
  GetAllOrdersUseCase,
} from '@application/usecases/order';
import {
  CreateProductUseCase,
  DeleteProductUseCase,
  GetAllProductsByCategoryUseCase,
  GetAllProductsUseCase,
} from '@application/usecases/product';
import {
  CategoryRepository,
  ProductRepository,
} from '@application/domain/repositories';
import {
  TypeORMCategoryRepository,
  TypeORMProductRepository,
} from 'modules/infra/database/typeorm';
import { FileStorageService } from '@application/domain/storage';
import { DeleteCategoryUseCase } from './usecases/category/delete-category';

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
  GetAllProductsByCategoryUseCase,
  DeleteProductUseCase,
];

@Module({
  imports: [InfraModule],
  providers: [
    ...categoryProviders,
    ...orderProviders,
    ...productProviders,
    {
      provide: CategoryRepository,
      useClass: TypeORMCategoryRepository,
    },
    {
      provide: ProductRepository,
      useClass: TypeORMProductRepository,
    },
    {
      provide: FileStorageService,
      useClass: SupaBaseFileStorageService,
    },
  ],
  exports: [...categoryProviders, ...orderProviders, ...productProviders],
})
export class ApplicationModule {}
