import { Category } from '@application/domain/entities';
import { Input } from '@application/usecases/types/category';

export abstract class CategoryRepository {
  public abstract save(category: Category): Promise<void>;
  public abstract getOne(id: string, clientId: string): Promise<Category>;
  public abstract getAll(clientId: string): Promise<Category[] | []>;
  public abstract getByCategory(clientId: string, id: string): Promise<any>;
  public abstract update(id: string, input: Input): Promise<void>;
  public abstract delete(id: string): Promise<void>;
}
