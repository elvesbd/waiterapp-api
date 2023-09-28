import { OrderProductOutput } from '@application/usecases/types/order';

export type OrderInput = {
  table: string;
  products: OrderProductOutput[];
};
