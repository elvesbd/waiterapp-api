import { Category } from '@category/domain/entity/category';

export abstract class CategoryRepository {
  public abstract getAll(): Promise<Category[] | []>;
  public abstract save({
    id,
    name,
    imageUrl,
    createdAt,
  }: Category): Promise<void>;
}
