import { ApiProperty } from '@nestjs/swagger';

class Product {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  ingredients: string[];
}

export class GetAllProductsByCategoryResponseDto {
  @ApiProperty({ type: String, description: 'Id da categoria' })
  id: string;

  @ApiProperty({ type: String, description: 'Nome da categoria' })
  name: string;

  @ApiProperty({ type: String, description: 'URL da imagem da categoria' })
  imageUrl: string;

  @ApiProperty({ type: [Product] })
  products: Product[];
}
