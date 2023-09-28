import { ApiProperty } from '@nestjs/swagger';

export class OrderProductsDto {
  @ApiProperty({ type: String, required: true, description: 'id do produto' })
  productId: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'Quantidade do produto',
  })
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ type: String, required: true, description: 'Número da mesa' })
  table: string;

  @ApiProperty({
    type: [OrderProductsDto],
    required: true,
    description: 'Produtos do pedido',
  })
  products: OrderProductsDto[];
}
