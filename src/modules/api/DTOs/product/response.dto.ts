export class ResponseDto {
  id: string;
  name: string;
  description: string;
  price: number;
  imagePath: string;
  ingredients?: string[];
  categoryId: string;
}
