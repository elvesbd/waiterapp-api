import { BadRequestException } from '@nestjs/common';

export class CreateCategoryException extends BadRequestException {
  constructor(name: string) {
    super(`Não foi possível criar a categoria ${name}`);
    this.name = 'CreateCategoryException';
  }
}
