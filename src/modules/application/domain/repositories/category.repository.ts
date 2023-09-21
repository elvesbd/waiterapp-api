import { Category } from '@application/domain/entities';

export abstract class CategoryRepository {
  public abstract getByName(name: string): Promise<Category>;
  public abstract getAll(): Promise<Category[] | []>;
  public abstract save(category: Category): Promise<void>;
}
