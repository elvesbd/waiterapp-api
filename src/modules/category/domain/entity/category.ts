import { BaseEntity } from '@shared/database';

export class Category extends BaseEntity {
  public readonly name: string;
  public readonly icon: string;

  constructor(name: string, icon: string) {
    super();
    this.name = name;
    this.icon = icon;
  }
}
