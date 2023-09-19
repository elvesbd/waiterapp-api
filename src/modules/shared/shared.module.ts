import { Module } from '@nestjs/common';
import { TypeORMCategoryRepository } from '@shared/database/typeorm';
import {
  SupaBaseClientService,
  SupaBaseFileStorageService,
} from '@shared/services/storage';

@Module({
  imports: [],
  providers: [
    TypeORMCategoryRepository,
    SupaBaseFileStorageService,
    SupaBaseClientService,
  ],
  exports: [
    TypeORMCategoryRepository,
    SupaBaseFileStorageService,
    SupaBaseClientService,
  ],
})
export class SharedModule {}
