import { Controller, Get } from '@nestjs/common';
import { ProductApiPath } from '@product/controllers/constants';

@Controller(ProductApiPath)
export class GetAllProductsByCategoryController {
  constructor() {}

  @Get('category/:categoryId')
  async handle(): Promise<any> {
    return 'GetAllProductsByCategoryController';
  }
}
