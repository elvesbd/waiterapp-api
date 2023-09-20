import { Category } from '@category/domain/entity/category';

export abstract class CategoryRepository {
  public abstract getAll(): Promise<Category[] | []>;
  public abstract save({
    id,
    name,
    imageUrl,
    createdAt,
  }: CreateCategoryInput): Promise<Category>;
}

type CreateCategoryInput = {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: Date;
};
