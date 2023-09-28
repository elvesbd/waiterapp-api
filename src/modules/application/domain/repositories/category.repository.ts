import { Category } from '@application/domain/entities';

export abstract class CategoryRepository {
  public abstract getOne(clientId: string, id: string): Promise<Category>;
  public abstract getAll(clientId: string): Promise<Category[]>;
  public abstract save(category: Category): Promise<void>;
  public abstract delete(id: string): Promise<void>;
}
