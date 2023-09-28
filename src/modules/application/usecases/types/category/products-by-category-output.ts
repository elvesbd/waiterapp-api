export type ProductsByCategoryOutput = {
  id: string;
  name: string;
  imageUrl: string;
  clientId: string;
  createdAt: Date;
  products: Product[];
};

type Product = {
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
