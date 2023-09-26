import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderRepository } from '@application/domain/repositories';
import { TypeORMOrderEntity, dataSource } from '@infra/database/typeorm';
import { Order } from '@application/domain/entities';

@Injectable()
export class TypeORMOrderRepository implements OrderRepository {
  constructor() {
    this.repository = dataSource.getRepository(TypeORMOrderEntity);
  }
  private repository: Repository<TypeORMOrderEntity>;
  private logger = new Logger(TypeORMOrderRepository.name);

  async create(clientId: string, body: any): Promise<Order> {
    const order = {
      clientId,
      ...body,
    };
    return await this.repository.save(order);
  }

  async getAll(clientId: string): Promise<any[] | []> {
    try {
      return await this.repository.find({
        where: {
          clientId,
        },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }
}
