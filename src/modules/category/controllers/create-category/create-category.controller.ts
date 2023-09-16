import { Controller, Post } from '@nestjs/common';
import { CategoryApiPath } from '@category/controllers/constants';

@Controller(CategoryApiPath)
export class CreateCategoryController {
  constructor() {}

  @Post()
  async handle(): Promise<any> {
    return 'CreateCategoryController';
  }
}
