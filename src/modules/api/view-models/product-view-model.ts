import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@core/domain/entities';

export class ProductVMResponse {
  @ApiProperty({ type: String, description: 'Id do produto' })
  id: string;

  @ApiProperty({ type: String, description: 'Nome do produto' })
  name: string;

  @ApiProperty({ type: String, description: 'descrição do produto' })
  description?: string | null;

  @ApiProperty({ type: String, description: 'preço do produto' })
  price: number;

  @ApiProperty({ type: String, description: 'URL da imagem do produto' })
  imageUrl: string;

  @ApiProperty({ type: String, description: 'ingredientes do produto' })
  ingredients: string[] | null;

  @ApiProperty({ type: String, description: 'id da categoria' })
  categoryId: string;
}

export class ProductViewModel {
  public static toHTTP(model: Product): ProductVMResponse {
    return {
      id: model.id,
      name: model.name,
      description: model.description,
      price: model.price,
      imageUrl: model.imageUrl,
      ingredients: model.ingredients,
      categoryId: model.categoryId,
    };
  }

  public static toHTTPArray(models: Product[]): ProductVMResponse[] {
    return models.map(this.toHTTP);
  }
}
