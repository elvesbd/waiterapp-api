import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDefaultToOrderId1695680187549 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE orders ALTER COLUMN id SET DEFAULT uuid_generate_v4()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE orders ALTER COLUMN id DROP DEFAULT`);
  }
}
