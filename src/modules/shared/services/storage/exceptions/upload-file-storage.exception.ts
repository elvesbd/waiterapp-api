import { BadRequestException } from '@nestjs/common';

export class UploadFileStorageException extends BadRequestException {
  constructor(message: string) {
    super(`Failed to upload file: ${message}`);
    this.name = 'UploadFileStorageException';
  }
}
