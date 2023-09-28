export class UpdateRequestDto {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  ingredients?: string[];
  categoryId: string;
}
