import { Controller, Delete } from '@nestjs/common';
import { ProductApiPath } from '@product/controllers/constants';

@Controller(ProductApiPath)
export class DeleteProductController {
  constructor() {}

  @Delete(':productId')
  async handle(): Promise<any> {
    return 'DeleteProductController';
  }
}
