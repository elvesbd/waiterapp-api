import { Controller, Post } from '@nestjs/common';
import { OrderApiPath } from '@order/controllers/constants';

@Controller(OrderApiPath)
export class CreateOrderController {
  constructor() {}

  @Post()
  async handle(): Promise<any> {
    return 'CreateOrderController';
  }
}
