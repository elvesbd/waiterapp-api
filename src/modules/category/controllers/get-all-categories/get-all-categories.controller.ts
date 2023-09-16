import { Controller, Get } from '@nestjs/common';
import { CategoryApiPath } from '@category/controllers/constants';

@Controller(CategoryApiPath)
export class GetAllCategoriesController {
  constructor() {}

  @Get()
  async handle(): Promise<any> {
    return 'GetAllCategoriesController';
  }
}
