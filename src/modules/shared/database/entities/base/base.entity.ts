import { v4 as uuidv4 } from 'uuid';

export class BaseEntity {
  public readonly id: string;
  public readonly createdAt: Date;

  constructor() {
    this.id = uuidv4();
    this.createdAt = new Date();
  }
}
