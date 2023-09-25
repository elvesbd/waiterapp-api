export type OutputProductsByCategory = {
  id: string;
  name: string;
  imageUrl: string;
  clientId: string;
  createdAt: Date;
  products?: Product[];
};

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: string;
  imageUrl: string;
  ingredients: string | null;
  categoryId: string;
};
