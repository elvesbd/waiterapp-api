import { OrderProductOutput } from '@core/usecases/types/order';

export type OrderInput = {
  table: string;
  products: OrderProductOutput[];
};
