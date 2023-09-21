import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateTableCategories1695221227728 implements MigrationInterface {
  private readonly logger = new Logger(CreateTableCategories1695221227728.name);

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Up migrations');
    await queryRunner.createTable(
      new Table({
        name: 'categories',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'imageUrl',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'categories',
      new TableIndex({
        name: 'IDX_CATEGORY_NAME',
        columnNames: ['name'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Down migrations');
    await queryRunner.dropTable('categories');
  }
}
