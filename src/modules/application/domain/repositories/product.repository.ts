import { Product } from '@application/domain/entities';

export abstract class ProductRepository {
  public abstract save(product: Product): Promise<void>;
  public abstract getAll(clientId: string): Promise<Product[] | []>;
}
