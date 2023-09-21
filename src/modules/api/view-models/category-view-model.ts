import { Category } from '@application/domain/entities';

export type CategoryVMResponse = {
  id: string;
  name: string;
  imageUrl: string;
};

export class CategoryViewModel {
  public static toHTTP(model: Category): CategoryVMResponse {
    return {
      id: model.id,
      name: model.name,
      imageUrl: model.imageUrl,
    };
  }

  public static toHTTPArray(models: Category[]): CategoryVMResponse[] {
    return models.map(this.toHTTP);
  }
}
