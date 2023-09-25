import { ApiProperty } from '@nestjs/swagger';

export class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  ingredients: string[];
  categoryId: string;
  clientId: string;
  createdAt: Date;
}

export class ProductsVMResponse {
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
