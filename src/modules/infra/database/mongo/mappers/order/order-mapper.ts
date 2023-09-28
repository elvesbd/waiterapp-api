import { Order } from '@core/domain/entities';
import { OrderModel } from '@infra/database/mongo/models';

export class OrderMapper {
  static toDomain(order: OrderModel): Order {
    const orderMapper = new Order(
      order.clientId,
      order.table,
      order.status,
      order.products.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
      })),
    );
    orderMapper.id = order._id;
    return orderMapper;
  }

  static toDomainArray(orders: OrderModel[]): Order[] {
    return orders.map((order) => this.toDomain(order));
  }
}
