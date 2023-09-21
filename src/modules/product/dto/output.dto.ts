export class OutputDto {
  id: string;
  name: string;
  description: string;
  price: number;
  imagePath: string;
  ingredients?: string[];
  categoryId: string;
}
