import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Schema()
export class ProductModel extends Document {
  @Prop({ type: UUID, required: true })
  _id: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  imageUrl: string;
  @Prop({ type: UUID, ref: 'CategoryModel', required: true })
  categoryId: string;
  @Prop({ required: true })
  clientId: string;
  @Prop({ required: true })
  createdAt: Date;
  @Prop({ required: false })
  updatedAt: Date;
  @Prop({ required: false })
  description: string;
  @Prop({ required: false })
  ingredients: string[];
}
export const ProductSchema = SchemaFactory.createForClass(ProductModel);
