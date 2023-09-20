import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { TypeORMCategoryRepository } from '@shared/database/typeorm';
import { SupaBaseFileStorageService } from '@shared/services/storage';
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
  imports: [SharedModule],
  controllers: [...categoryControllers],
  providers: [
    ...categoryProviders,
    {
      provide: 'CategoryRepository',
      useClass: TypeORMCategoryRepository,
    },
    {
      provide: 'FileStorageService',
      useClass: SupaBaseFileStorageService,
    },
  ],
})
export class CategoryModule {}
