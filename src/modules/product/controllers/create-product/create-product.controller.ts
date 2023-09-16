import { Controller, Post } from '@nestjs/common';
import { ProductApiPath } from '@product/controllers/constants';

@Controller(ProductApiPath)
export class CreateProductController {
  constructor() {}

  @Post()
  async handle(): Promise<any> {
    return 'CreateProductController';
  }
}
