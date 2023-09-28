import { CapitalizeNameService } from '@infra/utils';
import { BaseEntity } from './base';

type Input = {
  clientId: string;
  name: string;
  imageUrl: string;
};

export class Category extends BaseEntity {
  updatedAt?: Date;

  constructor(
    readonly name: string,
    readonly imageUrl: string,
    readonly clientId: string,
  ) {
    super();
  }

  static create({ clientId, name, imageUrl }: Input) {
    const capitalizeFirstLetterOfCategoryName =
      CapitalizeNameService.handler(name);

    return new Category(
      capitalizeFirstLetterOfCategoryName,
      imageUrl,
      clientId,
    );
  }
}
