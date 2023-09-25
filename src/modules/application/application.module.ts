import { Module } from '@nestjs/common';
import { InfraModule } from '@infra/infra.module';
import { SupaBaseFileStorageService } from '@infra/services/storage';
import {
  CreateCategoryUseCase,
  GetAllCategoriesUseCase,
  GetAllProductsByCategoryUseCase,
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
  UpdateProductUseCase,
  DeleteProductUseCase,
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

const categoryProviders = [
  CreateCategoryUseCase,
  GetAllCategoriesUseCase,
  GetAllProductsByCategoryUseCase,
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
  UpdateProductUseCase,
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
