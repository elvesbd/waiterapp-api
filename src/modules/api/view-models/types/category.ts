import { Product, ProductsVMResponse } from '@api/view-models/types';
import { ApiProperty } from '@nestjs/swagger';

export class Category {
  id: string;
  name: string;
  imageUrl: string;
  clientId: string;
  createdAt: Date;
  products?: Product[];
}

export class CategoryVMResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty({ type: [ProductsVMResponse] })
  products?: ProductsVMResponse[];
}
