import { Module } from '@nestjs/common';
import { TypeORMCategoryRepository } from '@shared/database/typeorm';
import { OptimizeImageFileService } from '@shared/utils';
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
    OptimizeImageFileService,
  ],
  exports: [
    TypeORMCategoryRepository,
    SupaBaseFileStorageService,
    SupaBaseClientService,
    OptimizeImageFileService,
  ],
})
export class SharedModule {}
