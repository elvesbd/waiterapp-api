import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  ingredients?: string[];

  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  clientId: string;

  @ApiProperty()
  createdAt: Date;
}
