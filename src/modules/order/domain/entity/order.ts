import { OrderStatus } from '@order/enum';
import { OrderAlreadyFinalizedException } from '@order/exceptions';
import { BaseEntity } from '@shared/database';

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
  public readonly table: string;
  private _status: OrderStatus;
  public readonly products: ProductInput[];

  constructor({ table, products }: Input) {
    super();
    this.table = table;
    this._status = OrderStatus.WAITING;
    this.products = products;
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
