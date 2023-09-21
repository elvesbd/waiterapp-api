import { BadRequestException } from '@nestjs/common';

export class CategoryAlreadyExistsException extends BadRequestException {
  constructor(name: string) {
    super(`A categoria ${name} já foi cadastrada`);
    this.name = 'CategoryAlreadyExistsException';
  }
}
