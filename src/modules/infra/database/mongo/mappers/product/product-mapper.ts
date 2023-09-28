import { Product } from '@application/domain/entities';
import { ProductModel } from '@infra/database/mongo/models';

export class ProductMapper {
  static toDomain(product: ProductModel): Product {
    return {
      id: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      description: product.description,
      ingredients: product.ingredients,
      clientId: product.clientId,
      categoryId: product.categoryId,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  static toDomainArray(products: ProductModel[]): Product[] {
    return products.map((product) => this.toDomain(product));
  }
}
