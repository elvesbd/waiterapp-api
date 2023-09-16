import { Controller, Get } from '@nestjs/common';
import { OrderApiPath } from '@order/controllers/constants';

@Controller(OrderApiPath)
export class GetAllOrdersController {
  constructor() {}

  @Get()
  async handle(): Promise<any> {
    return 'GetAllOrdersController';
  }
}
