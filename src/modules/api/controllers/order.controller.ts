import { Controller, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderApiPath, OrderApiTag } from './constants';

@ApiTags(OrderApiTag)
@Controller(OrderApiPath)
export class OrderController {
  constructor() {}

  @Post()
  async create(): Promise<any> {
    return 'CreateOrderController';
  }

  @Get()
  async getAll(): Promise<any> {
    return 'GetAllOrdersController';
  }

  @Patch(':orderId')
  async update(): Promise<any> {
    return 'ChangeOrderStatusController';
  }
}
