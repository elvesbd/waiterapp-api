import { v4 as uuidv4 } from 'uuid';

export class BaseEntity {
  protected readonly id: string;

  constructor() {
    this.id = uuidv4();
  }
}
