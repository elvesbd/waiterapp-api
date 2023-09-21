import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeORMProductEntity } from '../product/product.entity';

@Entity({ name: 'categories' })
export class TypeORMCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  imageUrl: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @OneToMany(() => TypeORMProductEntity, (product) => product.category)
  products: TypeORMProductEntity[];
}
