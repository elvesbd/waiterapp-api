import { Controller, Get } from '@nestjs/common';
import { ProductApiPath } from '@product/controllers/constants';

@Controller(ProductApiPath)
export class GetAllProductsController {
  constructor() {}

  @Get()
  async handle(): Promise<any> {
    return 'GetAllProductsController';
  }
}
