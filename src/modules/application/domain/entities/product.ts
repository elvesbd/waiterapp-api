import { BaseEntity } from '@application/domain/entities/base';

type Input = {
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
  ingredients?: string[];
  categoryId: string;
  clientId: string;
};

export class Product extends BaseEntity {
  public readonly id: string;
  public readonly name: string;
  public readonly description?: string;
  public readonly price: number;
  public readonly imageUrl: string;
  public readonly ingredients?: string[];
  public readonly categoryId: string;
  public readonly clientId: string;
  public readonly createdAt: Date;

  constructor({
    name,
    description,
    price,
    imageUrl,
    ingredients,
    categoryId,
    clientId,
  }: Input) {
    super();
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
    this.ingredients = ingredients;
    this.categoryId = categoryId;
    this.clientId = clientId;
    this.createdAt = new Date();
  }
}
