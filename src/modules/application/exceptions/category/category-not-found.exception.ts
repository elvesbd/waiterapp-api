import { NotFoundException } from '@nestjs/common';

export class CategoryNotFoundException extends NotFoundException {
  constructor() {
    super('Categoria não encontrada!');
    this.name = 'CategoryNotFoundException';
  }
}
