import { GetAllProductsByCategoryResponseDto } from '@api/DTOs/category';
import { Category } from '@application/domain/entities';

export abstract class CategoryRepository {
  public abstract save(category: Category): Promise<void>;
  public abstract getOne(clientId: string, id: string): Promise<Category>;
  public abstract getAll(clientId: string): Promise<Category[] | []>;
  public abstract getByCategory(
    clientId: string,
    id: string,
  ): Promise<GetAllProductsByCategoryResponseDto[] | []>;
  public abstract delete(id: string): Promise<void>;
}
