import { OrderStatus } from '@application/domain/entities/order';
import { ApiProperty } from '@nestjs/swagger';

export class OrderResponseDto {
  @ApiProperty({ type: String, description: 'Id do pedido' })
  id: string;

  @ApiProperty({ type: String, description: 'Mesa do pedido' })
  table: string;

  @ApiProperty({
    type: 'string',
    description: 'Status do pedido',
    enum: OrderStatus,
    enumName: 'OrderStatus',
  })
  status: OrderStatus;

  @ApiProperty({ type: String, description: 'Produtos cadastrados no pedido' })
  products: string;

  @ApiProperty({ type: Date, description: 'Data de criação do pedido' })
  createdAt: string;
}
