import { Order } from '@core/domain/entities';

export abstract class OrderRepository {
  public abstract getAll(clientId: string): Promise<Order[] | []>;
  public abstract save(order: Order): Promise<void>;
}
