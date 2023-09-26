import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { OrderApiPath, OrderApiTag } from './constants';
import {
  ChangeOrderStatusUseCase,
  CreateOrderUseCase,
  GetAllOrdersUseCase,
} from '@application/usecases/order';
import { OrderResponseDto } from '@api/DTOs/order';

@ApiBearerAuth('JWT-auth')
@ApiTags(OrderApiTag)
@Controller(OrderApiPath)
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getAllOrdersUseCase: GetAllOrdersUseCase,
    private readonly changeOrderStatusUseCase: ChangeOrderStatusUseCase,
  ) {}

  @Post()
  async create(@Body() body: any): Promise<any> {
    const clientId = '04a3e89e-cd64-4823-8c3d-da1cbd3c03cd';
    return await this.createOrderUseCase.execute(clientId, body);
  }

  @ApiOperation({ summary: 'get all orders' })
  @ApiOkResponse({ type: [OrderResponseDto] })
  @Get()
  async getAll(): Promise<OrderResponseDto[] | []> {
    const clientId = '04a3e89e-cd64-4823-8c3d-da1cbd3c03cd';
    return await this.getAllOrdersUseCase.execute(clientId);
  }

  @Patch(':orderId')
  async update(): Promise<any> {
    return 'ChangeOrderStatusController';
  }
}
