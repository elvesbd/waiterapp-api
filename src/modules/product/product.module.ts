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
  imports: [],
  controllers: [...productControllers],
  providers: [...productProviders],
})
export class ProductModule {}
