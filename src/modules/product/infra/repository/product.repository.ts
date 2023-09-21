import { Product } from '@product/domain';

export abstract class ProductRepository {
  public abstract getAll(): Promise<Product[] | []>;
}
