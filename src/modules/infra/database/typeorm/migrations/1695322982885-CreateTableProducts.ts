import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateTableProducts1695322982885 implements MigrationInterface {
  private readonly logger = new Logger(CreateTableProducts1695322982885.name);

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Up migrations');
    await queryRunner.createTable(
      new Table({
        name: 'products',
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
            name: 'description',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'imageUrl',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'ingredients',
            type: 'varchar',
            isArray: true,
            length: '255',
            isNullable: true,
          },
          {
            name: 'categoryId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'clientId',
            type: 'uuid',
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
      'products',
      new TableIndex({
        name: 'IDX_PRODUCT_CATEGORY_ID',
        columnNames: ['categoryId'],
      }),
    );

    await queryRunner.createIndex(
      'products',
      new TableIndex({
        name: 'IDX_PRODUCT_CLIENT_ID',
        columnNames: ['clientId'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Down migrations');
    await queryRunner.dropTable('products');
  }
}
