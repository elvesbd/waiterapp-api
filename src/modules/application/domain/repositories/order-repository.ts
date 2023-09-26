import { Order } from '@application/domain/entities';

export abstract class OrderRepository {
  public abstract getAll(clientId: string): Promise<Order[] | []>;
  public abstract create(clientId: string, body: any): Promise<Order>;
}
