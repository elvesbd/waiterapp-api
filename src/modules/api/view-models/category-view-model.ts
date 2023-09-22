import { Category, CategoryVMResponse } from '@api/view-models/types';

export class CategoryViewModel {
  public static toHTTP(model: Category): CategoryVMResponse {
    return {
      id: model.id,
      name: model.name,
      imageUrl: model.imageUrl,
      products: model.products?.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        ingredients: product.ingredients,
      })),
    };
  }

  public static toHTTPArray(models: Category[]): CategoryVMResponse[] {
    return models.map(this.toHTTP);
  }
}
