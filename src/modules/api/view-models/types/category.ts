import { Product, ProductsVMResponse } from '@api/view-models/types';

export type Category = {
  id: string;
  name: string;
  imageUrl: string;
  clientId: string;
  createdAt: Date;
  products?: Product[];
};

export type CategoryVMResponse = {
  id: string;
  name: string;
  imageUrl: string;
  products?: ProductsVMResponse[];
};
