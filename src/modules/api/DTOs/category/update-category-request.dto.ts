import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryRequestDto {
  @ApiProperty({ type: String, description: 'Nome da categoria' })
  name: string;

  @ApiProperty({ type: String, description: 'URL da imagem da categoria' })
  imageUrl: string;
}
