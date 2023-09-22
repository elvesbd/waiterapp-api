export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  ingredients: string[];
  categoryId: string;
  clientId: string;
  createdAt: Date;
};

export type ProductsVMResponse = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  ingredients: string[];
};
