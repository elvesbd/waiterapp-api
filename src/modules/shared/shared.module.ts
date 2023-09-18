import { Module } from '@nestjs/common';
import { TypeORMCategoryRepository } from '@shared/database/typeorm';

@Module({
  imports: [],
  providers: [TypeORMCategoryRepository],
  exports: [TypeORMCategoryRepository],
})
export class SharedModule {}
