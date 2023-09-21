import { Module } from '@nestjs/common';
import {
  CreateProductUseCase,
  DeleteProductUseCase,
  GetAllProductsUseCase,
  GetAllProductsByCategoryUseCase,
} from '@product/use-cases';
import {
  CreateProductController,
  DeleteProductController,
  GetAllProductsController,
  GetAllProductsByCategoryController,
} from '@product/controllers';
import { ProductRepository } from '@product/infra/repository';
import { ProductFileStorageService } from '@product/infra/storage';
import { TypeORMProductRepository } from '@shared/database/typeorm';
import { SharedModule } from '@shared/shared.module';
import { SupaBaseFileStorageService } from '@shared/services/storage';

const productControllers = [
  CreateProductController,
  DeleteProductController,
  GetAllProductsController,
  GetAllProductsByCategoryController,
];
const productProviders = [
  CreateProductUseCase,
  DeleteProductUseCase,
  GetAllProductsUseCase,
  GetAllProductsByCategoryUseCase,
];

@Module({
  imports: [SharedModule],
  controllers: [...productControllers],
  providers: [
    ...productProviders,
    {
      provide: ProductRepository,
      useClass: TypeORMProductRepository,
    },
    {
      provide: ProductFileStorageService,
      useClass: SupaBaseFileStorageService,
    },
  ],
})
export class ProductModule {}
