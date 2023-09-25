import { Product } from '@application/domain/entities';

export abstract class ProductRepository {
  public abstract save(product: Product): Promise<void>;
  public abstract getOne(id: string, clientId: string): Promise<Product>;
  public abstract getAll(clientId: string): Promise<Product[] | []>;
  public abstract delete(id: string): Promise<void>;
}
