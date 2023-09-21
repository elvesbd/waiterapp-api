import { OrderAlreadyFinalizedException } from '@application/exceptions/order';
import { BaseEntity } from '@application/domain/entities/base';

enum OrderStatus {
  WAITING = 'aguardando',
  IN_PRODUCTION = 'em produção',
  DONE = 'finalizado',
  CANCELLED = 'cancelado',
}

type ProductInput = {
  productId: string;
  quantity: number;
};

type Input = {
  table: string;
  status: OrderStatus;
  products: ProductInput[];
};

export class Order extends BaseEntity {
  public readonly id: string;
  public readonly table: string;
  private _status: OrderStatus;
  public readonly products: ProductInput[];
  public readonly createdAt: Date;

  constructor({ table, products }: Input) {
    super();
    this.table = table;
    this._status = OrderStatus.WAITING;
    this.products = products;
    this.createdAt = new Date();
  }

  get status(): OrderStatus {
    return this._status;
  }

  setInProduction() {
    if (this._status === OrderStatus.WAITING) {
      this._status = OrderStatus.IN_PRODUCTION;
    }
  }

  setInDone() {
    if (this._status === OrderStatus.IN_PRODUCTION) {
      this._status = OrderStatus.DONE;
    }
  }

  cancel() {
    if (this._status === OrderStatus.DONE) {
      throw new OrderAlreadyFinalizedException();
    }
    this._status = OrderStatus.CANCELLED;
  }
}
