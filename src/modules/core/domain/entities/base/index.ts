import { v4 as uuidv4 } from 'uuid';

export abstract class BaseEntity {
  id: string;
  createdAt: Date;

  constructor() {
    this.id = uuidv4();
    this.createdAt = new Date();
  }
}
