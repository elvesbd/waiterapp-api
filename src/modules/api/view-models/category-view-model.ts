import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@core/domain/entities';

export class CategoryVMResponse {
  @ApiProperty({ type: String, description: 'Id da categoria' })
  id: string;

  @ApiProperty({ type: String, description: 'Nome da categoria' })
  name: string;

  @ApiProperty({ type: String, description: 'URL da imagem da categoria' })
  imageUrl: string;
}

export class CategoryViewModel {
  public static toHTTP(model: Category): CategoryVMResponse {
    return {
      id: model.id,
      name: model.name,
      imageUrl: model.imageUrl,
    };
  }

  public static toHTTPArray(models: Category[]): CategoryVMResponse[] {
    return models.map(this.toHTTP);
  }
}
