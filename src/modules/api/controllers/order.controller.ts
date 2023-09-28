import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { OrderApiPath, OrderApiTag } from './constants';
import {
  ChangeOrderStatusUseCase,
  CreateOrderUseCase,
  GetAllOrdersUseCase,
} from '@core/usecases/order';
import { CreateOrderDto } from '@api/DTOs/order';
import { OrderVMResponse, OrderViewModel } from '@api/view-models';

@ApiBearerAuth('JWT-auth')
@ApiTags(OrderApiTag)
@Controller(OrderApiPath)
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getAllOrdersUseCase: GetAllOrdersUseCase,
    private readonly changeOrderStatusUseCase: ChangeOrderStatusUseCase,
  ) {}

  @ApiOperation({ summary: 'create order' })
  @ApiCreatedResponse({ type: OrderVMResponse })
  @ApiBody({ type: CreateOrderDto })
  @Post()
  async create(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<OrderVMResponse> {
    const clientId = '04a3e89e-cd64-4823-8c3d-da1cbd3c03cd';
    const order = await this.createOrderUseCase.execute(
      clientId,
      createOrderDto,
    );
    return OrderViewModel.toHTTP(order);
  }

  @ApiOperation({ summary: 'get all orders' })
  @ApiOkResponse({ type: [OrderVMResponse] })
  @Get()
  async getAll(): Promise<OrderVMResponse[]> {
    const clientId = '04a3e89e-cd64-4823-8c3d-da1cbd3c03cd';
    const orders = await this.getAllOrdersUseCase.execute(clientId);
    return OrderViewModel.toHTTPArray(orders);
  }

  @Patch(':orderId')
  async update(): Promise<any> {
    return 'ChangeOrderStatusController';
  }
}
