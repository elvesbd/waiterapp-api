import { Module } from '@nestjs/common';
import {
  CreateCategoryController,
  GetAllCategoriesController,
} from '@category/controllers';
import {
  CreateCategoryUseCase,
  GetAllCategoriesUseCase,
} from '@category/use-cases';

const categoryControllers = [
  CreateCategoryController,
  GetAllCategoriesController,
];
const categoryProviders = [CreateCategoryUseCase, GetAllCategoriesUseCase];

@Module({
  imports: [],
  controllers: [...categoryControllers],
  providers: [...categoryProviders],
})
export class CategoryModule {}
