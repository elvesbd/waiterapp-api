import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeORMProductEntity } from '../product/product.entity';
import { OrderStatus } from '../../../../../application/domain/entities/order';

@Entity({ name: 'orders' })
export class TypeORMOrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  table: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    nullable: false,
    default: OrderStatus.WAITING,
  })
  status: OrderStatus;

  @Column({ type: 'uuid', nullable: false })
  clientId: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @ManyToMany(() => TypeORMProductEntity)
  @JoinTable()
  products: TypeORMProductEntity[];
}
