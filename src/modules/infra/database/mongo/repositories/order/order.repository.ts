import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { OrderRepository } from '@core/domain/repositories';
import { OrderModel } from '../../models/order/order.model';
import { Order } from '@core/domain/entities';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderMapper } from '../../mappers/order';

@Injectable()
export class MongoDBOrderRepository implements OrderRepository {
  constructor(
    @InjectModel(OrderModel.name)
    private readonly orderModel: Model<OrderModel>,
  ) {}

  private logger = new Logger(MongoDBOrderRepository.name);

  async getAll(clientId: string): Promise<Order[] | []> {
    try {
      const orders = await this.orderModel.find({ clientId }).exec();
      return OrderMapper.toDomainArray(orders);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  async save(order: Order): Promise<void> {
    try {
      await this.orderModel.create(order);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }
}
