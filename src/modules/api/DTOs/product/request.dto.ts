import { FileDto } from '@api/DTOs/shared';

export class RequestDto {
  name: string;
  description: string;
  price: number;
  file: FileDto;
  ingredients?: string[];
  categoryId: string;
}
