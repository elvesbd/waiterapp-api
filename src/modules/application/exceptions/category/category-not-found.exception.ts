import { NotFoundException } from '@nestjs/common';

export class CategoryNotFoundException extends NotFoundException {
  constructor(name: string) {
    super(`A categoria ${name} não existe`);
    this.name = 'CategoryNotFoundException';
  }
}
