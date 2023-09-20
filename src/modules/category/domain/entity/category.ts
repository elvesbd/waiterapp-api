import { v4 as uuidv4 } from 'uuid';

export class Category {
  public readonly id: string;
  public readonly name: string;
  public readonly imageUrl: string;
  public readonly createdAt: Date;
  public readonly updatedAt?: Date | null;

  constructor(name: string, imageUrl: string) {
    this.id = uuidv4();
    this.name = name;
    this.imageUrl = imageUrl;
    this.createdAt = new Date();
  }
}
