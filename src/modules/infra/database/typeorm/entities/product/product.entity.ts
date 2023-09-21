import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class TypeORMProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  imagePath: string;

  @Column({ type: 'varchar', array: true, length: 255, nullable: false })
  ingredients: string[];

  @Column({ type: 'uuid', nullable: false })
  categoryId: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: Date;
}
