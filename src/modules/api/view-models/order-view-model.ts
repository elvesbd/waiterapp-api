import { ApiProperty } from '@nestjs/swagger';
import { Order } from '@core/domain/entities';
import { OrderProductsDto } from '@api/DTOs/order';

export class OrderVMResponse {
  @ApiProperty({ type: String, description: 'Id do pedido' })
  id: string;

  @ApiProperty({ type: String, description: 'Número da mesa' })
  table: string;

  @ApiProperty({ type: String, description: 'status do pedido' })
  status: string;

  @ApiProperty({
    type: [OrderProductsDto],
    description: 'Produtos do pedido',
  })
  products: OrderProductsDto[];
}

export class OrderViewModel {
  public static toHTTP(model: Order): OrderVMResponse {
    return {
      id: model.id,
      table: model.getTable(),
      status: model.getStatus(),
      products: model.getProducts(),
    };
  }

  public static toHTTPArray(models: Order[]): OrderVMResponse[] {
    return models.map(this.toHTTP);
  }
}
