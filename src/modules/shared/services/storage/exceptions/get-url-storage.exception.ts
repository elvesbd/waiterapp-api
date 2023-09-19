import { BadRequestException } from '@nestjs/common';

export class GetUrlStorageException extends BadRequestException {
  constructor(message: string) {
    super(`${message}`);
    this.name = 'GetUrlStorageException';
  }
}
