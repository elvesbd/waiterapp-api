import { BadRequestException } from '@nestjs/common';

export class GetUrlStorageException extends BadRequestException {
  constructor(message: string) {
    super(`Failed to get URL: ${message}`);
    this.name = 'GetUrlStorageException';
  }
}
