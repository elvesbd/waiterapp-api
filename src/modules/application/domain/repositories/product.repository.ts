import { Product } from '@application/domain/entities';

export abstract class ProductRepository {
  public abstract getAll(): Promise<Product[] | []>;
}
