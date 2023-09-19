import { BaseEntity } from '@shared/database/base';

export class Category extends BaseEntity {
  public readonly name: string;
  public readonly imageUrl: string;

  constructor(name: string, imageUrl: string) {
    super();
    this.name = this.formatName(name);
    this.imageUrl = imageUrl;
  }

  private formatName(name: string): string {
    const [firstLetter, ...restOfName] = name.trim().toLowerCase();
    return `${firstLetter.toUpperCase()}${restOfName.join('')}`;
  }
}
