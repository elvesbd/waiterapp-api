import { BadRequestException } from '@nestjs/common';

export class UploadFileStorageException extends BadRequestException {
  constructor(message: string) {
    super(`${message}`);
    this.name = 'UploadFileStorageException';
  }
}
