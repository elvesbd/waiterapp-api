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

export class Order {
  id: string;
  table: string;
  status: OrderStatus;
  products: ProductInput[];
  createdAt: Date;
}
