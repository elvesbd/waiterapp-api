import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeORMCategoryEntity } from '../category/category.entity';

@Entity({ name: 'products' })
export class TypeORMProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  imageUrl: string;

  @Column({ type: 'varchar', array: true, length: 255, nullable: true })
  ingredients: string[];

  @Column({ type: 'uuid', nullable: false })
  categoryId: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @ManyToOne(() => TypeORMCategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: TypeORMCategoryEntity;
}