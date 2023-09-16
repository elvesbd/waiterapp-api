import { Controller, Patch } from '@nestjs/common';
import { OrderApiPath } from '@order/controllers/constants';

@Controller(OrderApiPath)
export class ChangeOrderStatusController {
  constructor() {}

  @Patch(':orderId')
  async handle(): Promise<any> {
    return 'ChangeOrderStatusController';
  }
}
