import { Category } from '@core/domain/entities';
import { CategoryModel } from '../../models';

export class CategoryMapper {
  static toDomain(category: CategoryModel): Category {
    return {
      id: category._id,
      name: category.name,
      imageUrl: category.imageUrl,
      clientId: category.clientId,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }

  static toDomainArray(categories: CategoryModel[]): Category[] {
    return categories.map((category) => this.toDomain(category));
  }
}
