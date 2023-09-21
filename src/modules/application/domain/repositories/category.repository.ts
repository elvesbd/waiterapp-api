import { Category } from '@application/domain/entities';

export abstract class CategoryRepository {
  public abstract save(category: Category): Promise<void>;
  public abstract delete(id: string, clientId: string): Promise<void>;
  public abstract getAll(clientId: string): Promise<Category[] | []>;
}
