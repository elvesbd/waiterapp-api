import { Product } from '@core/domain/entities';

export abstract class ProductRepository {
  public abstract getOne(id: string, clientId: string): Promise<Product>;
  public abstract getAll(clientId: string): Promise<Product[]>;
  public abstract getAllByCategory(
    clientId: string,
    categoryId: string,
  ): Promise<Product[]>;
  public abstract save(product: Product): Promise<void>;
  public abstract delete(id: string): Promise<void>;
}
