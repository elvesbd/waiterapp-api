import { FileDto } from '@api/DTOs/shared';

export type Input = {
  name: string;
  imageUrl: string;
  clientId: string;
  file?: FileDto;
};
