import { ConflictException } from '@nestjs/common';

export class OrderAlreadyFinalizedException extends ConflictException {
  constructor() {
    super('Não é possível cancelar um pedido finalizado.');
    this.name = 'OrderAlreadyFinalizedException';
  }
}
