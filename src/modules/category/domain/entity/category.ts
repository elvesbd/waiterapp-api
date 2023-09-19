import { BaseEntity } from '@shared/database/base';

type CategoryInput = {
  name: string;
  imageUrl: string;
};

export class Category extends BaseEntity {
  public readonly name: string;
  public readonly imageUrl: string;

  constructor({ name, imageUrl }: CategoryInput) {
    super();
    this.name = this.formatName(name);
    this.imageUrl = imageUrl;
  }

  private formatName(name: string): string {
    const [firstLetter, ...restOfName] = name.trim().toLowerCase();
    return `${firstLetter.toUpperCase()}${restOfName.join('')}`;
  }
}
