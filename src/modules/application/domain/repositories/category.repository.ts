import { Category } from '@application/domain/entities';

export abstract class CategoryRepository {
  public abstract save(category: Category): Promise<void>;
  public abstract getOne(id: string, clientId: string): Promise<Category>;
  public abstract getAll(clientId: string): Promise<Category[] | []>;
  public abstract update(input: Category): Promise<void>;
  public abstract delete(clientId: string, id: string): Promise<void>;
  public abstract getByCategory(clientId: string, id: string): Promise<any>;
}
