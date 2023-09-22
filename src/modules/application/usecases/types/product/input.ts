import { FileDto } from '@api/DTOs/shared';

export type Input = {
  name: string;
  description: string;
  price: number;
  ingredients?: string[];
  categoryId: string;
  clientId: string;
  file?: FileDto;
};
