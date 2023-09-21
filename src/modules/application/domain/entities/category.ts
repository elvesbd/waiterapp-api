import { BaseEntity } from '@application/domain/entities/base';

export class Category extends BaseEntity {
  public readonly id: string;
  public readonly name: string;
  public readonly imageUrl: string;
  public readonly clientId: string;
  public readonly createdAt: Date;

  constructor(name: string, imageUrl: string, clientId: string) {
    super();
    this.name = name;
    this.imageUrl = imageUrl;
    this.clientId = clientId;
    this.createdAt = new Date();
  }
}
