import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { Document } from 'mongoose';

@Schema()
export class CategoryModel extends Document {
  @Prop({ type: UUID, required: true })
  _id: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  imageUrl: string;
  @Prop({ required: true })
  clientId: string;
  @Prop({ required: true })
  createdAt: Date;
  @Prop({ required: false, default: null })
  updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryModel);
