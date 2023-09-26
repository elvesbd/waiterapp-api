import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableOrders1695675522730 implements MigrationInterface {
  private readonly logger = new Logger(CreateTableOrders1695675522730.name);

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Up migrations');
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'table',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['WAITING', 'IN_PRODUCTION', 'DONE', 'CANCELLED'],
            default: "'WAITING'",
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
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Down migrations');
    await queryRunner.dropTable('orders');
  }
}
