import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OrderStatus } from '@application/domain/entities/order';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Schema()
export class OrderModel extends Document {
  @Prop({ type: UUID, required: true })
  _id: string;
  @Prop({ required: true })
  table: string;
  @Prop({ required: true })
  status: OrderStatus;
  @Prop([
    {
      productId: { type: String, ref: 'ProductModel', required: true },
      quantity: { type: Number, required: true },
    },
  ])
  products: {
    productId: string;
    quantity: number;
  }[];
  @Prop({ required: true })
  clientId: string;
  @Prop({ required: true })
  createdAt: Date;
  @Prop({ required: false })
  updatedAt: Date;
  @Prop({ required: false })
  finishedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(OrderModel);
