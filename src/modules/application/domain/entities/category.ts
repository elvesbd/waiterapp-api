import { BaseEntity } from '@application/domain/entities/base';

export class Category extends BaseEntity {
  public readonly id: string;
  public readonly name: string;
  public readonly imageUrl: string;
  public readonly createdAt: Date;
  public readonly updatedAt?: Date | null;

  constructor(name: string, imageUrl: string) {
    super();
    this.name = name;
    this.imageUrl = imageUrl;
    this.createdAt = new Date();
  }
}
