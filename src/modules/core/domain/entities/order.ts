import { BaseEntity } from './base';

export enum OrderStatus {
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
  clientId: string;
  table: string;
  products: ProductInput[];
};

export class Order extends BaseEntity {
  updatedAt?: Date;
  finishedAt?: Date;

  constructor(
    readonly clientId: string,
    private table: string,
    private status: OrderStatus,
    private products: ProductInput[],
  ) {
    super();
  }

  static create({ clientId, table, products }: Input) {
    const status = OrderStatus.WAITING;
    return new Order(clientId, table, status, products);
  }

  update(table?: string, products?: ProductInput[]) {
    this.table = table;
    this.products = products;
    this.updatedAt = new Date();
  }

  inProduction() {
    if (this.status === OrderStatus.WAITING) {
      this.status = OrderStatus.IN_PRODUCTION;
      this.updatedAt = new Date();
    }
  }

  done() {
    if (this.status === OrderStatus.IN_PRODUCTION) {
      this.status = OrderStatus.DONE;
      this.finishedAt = new Date();
    }
  }

  cancel() {
    if (this.status === OrderStatus.DONE) {
      throw new Error('Não é possível cancelar um pedido finalizado.');
    }
    this.status = OrderStatus.CANCELLED;
    this.updatedAt = new Date();
  }

  getTable() {
    return this.table;
  }

  getStatus() {
    return this.status;
  }

  getProducts() {
    return this.products;
  }
}
