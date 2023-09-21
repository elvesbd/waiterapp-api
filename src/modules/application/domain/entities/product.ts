import { BaseEntity } from '@application/domain/entities/base';

type Input = {
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
  ingredients?: string[];
  categoryId: string;
};

export class Product extends BaseEntity {
  public readonly id: string;
  public readonly name: string;
  public readonly description?: string;
  public readonly price: number;
  public readonly imageUrl: string;
  public readonly ingredients?: string[];
  public readonly categoryId: string;
  public readonly createdAt: Date;

  constructor({
    name,
    description,
    price,
    imageUrl,
    ingredients,
    categoryId,
  }: Input) {
    super();
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
    this.ingredients = ingredients;
    this.categoryId = categoryId;
    this.createdAt = new Date();
  }
}
