export type ProductOutput = {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
  ingredients?: string[];
  categoryId: string;
  clientId: string;
  createdAt: Date;
};
