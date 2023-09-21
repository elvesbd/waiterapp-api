export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  ingredients?: string[];
  categoryId: string;
}
