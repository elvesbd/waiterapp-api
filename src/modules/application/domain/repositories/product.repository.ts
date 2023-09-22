import { Product } from '@application/domain/entities';
import { Input } from '@application/usecases/types/product';

export abstract class ProductRepository {
  public abstract save(product: Product): Promise<void>;
  public abstract getOne(id: string, clientId: string): Promise<Product>;
  public abstract getAll(clientId: string): Promise<Product[] | []>;
  public abstract update(id: string, input: Input): Promise<void>;
  public abstract delete(id: string): Promise<void>;
}
