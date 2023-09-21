import { FileDto } from '@product/dto';

export class RequestDto {
  name: string;
  description: string;
  price: number;
  file: FileDto;
  ingredients?: string[];
  categoryId: string;
}
