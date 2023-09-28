import { OrderStatus } from '@core/domain/entities/order';

export type OrderProductOutput = {
  productId: string;
  quantity: number;
};

export type OrderOutput = {
  id: string;
  clientId: string;
  table: string;
  status: OrderStatus;
  createdAt: Date;
  products: OrderProductOutput[];
};
