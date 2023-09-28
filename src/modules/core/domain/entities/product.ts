import { CapitalizeNameService } from '@infra/utils';
import { BaseEntity } from './base';

type Input = {
  name: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  clientId: string;
  description?: string;
  ingredients?: string[];
};

export class Product extends BaseEntity {
  updatedAt?: Date;

  constructor(
    readonly name: string,
    readonly price: number,
    readonly imageUrl: string,
    readonly categoryId: string,
    readonly clientId: string,
    readonly createdAt: Date,
    readonly description?: string,
    readonly ingredients?: string[],
  ) {
    super();
  }

  static create({
    name,
    price,
    imageUrl,
    categoryId,
    clientId,
    description,
    ingredients,
  }: Input) {
    const capitalizeFirstLetterOfCategoryName =
      CapitalizeNameService.handler(name);
    const createdAt = new Date();
    return new Product(
      capitalizeFirstLetterOfCategoryName,
      price,
      imageUrl,
      categoryId,
      clientId,
      createdAt,
      description,
      ingredients,
    );
  }
}
