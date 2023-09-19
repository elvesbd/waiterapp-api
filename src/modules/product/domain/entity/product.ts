import { BaseEntity } from '@shared/database/base';

type Input = {
  name: string;
  description: string;
  price: number;
  imagePath: string;
  ingredients: string[];
  categoryId: string;
};

export class Product extends BaseEntity {
  public readonly name: string;
  public readonly description: string;
  public readonly price: number;
  public readonly imagePath: string;
  public readonly ingredients: string[];
  public readonly categoryId: string;

  constructor({
    name,
    description,
    price,
    imagePath,
    ingredients,
    categoryId,
  }: Input) {
    super();
    this.name = name;
    this.description = description;
    this.price = price;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
    this.categoryId = categoryId;
  }
}
