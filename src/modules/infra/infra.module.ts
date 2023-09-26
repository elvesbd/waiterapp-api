import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DatabaseService } from '@infra/database/services';
import {
  TypeORMCategoryRepository,
  TypeORMOrderRepository,
  TypeORMProductRepository,
  dataSource,
} from '@infra/database/typeorm';
import {
  SupaBaseFileStorageService,
  SupaBaseClientService,
} from '@infra/services/storage';

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
    TypeORMOrderRepository,
    TypeORMProductRepository,
    SupaBaseFileStorageService,
    SupaBaseClientService,
  ],
  exports: [
    TypeORMCategoryRepository,
    TypeORMOrderRepository,
    TypeORMProductRepository,
    SupaBaseFileStorageService,
    SupaBaseClientService,
  ],
})
export class InfraModule {}
