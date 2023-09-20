import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { OptimizeImageFileService } from '@shared/utils';
import {
  TypeORMCategoryRepository,
  dataSource,
} from '@shared/database/typeorm';
import {
  SupaBaseClientService,
  SupaBaseFileStorageService,
} from '@shared/services/storage';
import { DatabaseService } from '@shared/database/services';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
      dataSourceFactory: async (
        options?: DataSourceOptions,
      ): Promise<DataSource> => {
        if (!options) {
          throw new Error('No DataSource options were provided!');
        }
        return dataSource.initialize();
      },
    }),
  ],
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
