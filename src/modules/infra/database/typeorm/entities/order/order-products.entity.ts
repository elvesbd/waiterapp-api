import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TypeORMOrderEntity } from './order.entity';
import { TypeORMProductEntity } from '../product/product.entity';

@Entity({ name: 'order_product' })
export class TypeORMOrderProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @ManyToOne(() => TypeORMOrderEntity, (order) => order.products)
  @JoinColumn({ name: 'orderId', referencedColumnName: 'id' })
  order: TypeORMOrderEntity;

  @ManyToOne(() => TypeORMProductEntity, (product) => product.orders)
  @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
  product: TypeORMProductEntity;
}
