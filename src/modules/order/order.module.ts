import { Module } from '@nestjs/common';
import {
  ChangeOrderStatusController,
  CreateOrderController,
  GetAllOrdersController,
} from '@order/controllers';
import {
  ChangeOrderStatusUseCase,
  CreateOrderUseCase,
  GetAllOrdersUseCase,
} from '@order/use-cases';

const orderControllers = [
  ChangeOrderStatusController,
  CreateOrderController,
  GetAllOrdersController,
];
const orderProviders = [
  ChangeOrderStatusUseCase,
  CreateOrderUseCase,
  GetAllOrdersUseCase,
];

@Module({
  imports: [],
  controllers: [...orderControllers],
  providers: [...orderProviders],
})
export class OrderModule {}
