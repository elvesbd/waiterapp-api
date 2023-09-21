import { Product } from '@application/domain/entities';

export type ProductVMResponse = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  imageUrl: string;
  ingredients: string[] | null;
  categoryId: string;
};

export class ProductViewModel {
  public static toHTTP(model: Product): ProductVMResponse {
    return {
      id: model.id,
      name: model.name,
      description: model.description,
      price: model.price,
      imageUrl: model.imageUrl,
      ingredients: model.ingredients,
      categoryId: model.categoryId,
    };
  }

  public static toHTTPArray(models: Product[]): ProductVMResponse[] {
    return models.map(this.toHTTP);
  }
}
