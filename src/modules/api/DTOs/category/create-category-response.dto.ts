import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryResponseDto {
  @ApiProperty({ type: String, description: 'Id da categoria' })
  id: string;

  @ApiProperty({ type: String, description: 'Nome da categoria' })
  name: string;

  @ApiProperty({ type: String, description: 'URL da imagem da categoria' })
  imageUrl: string;
}
