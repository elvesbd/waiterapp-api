import { Module } from '@nestjs/common';
import { ApplicationModule } from '@application/application.module';
import {
  CategoryController,
  OrderController,
  ProductController,
} from '@api/controllers';

@Module({
  imports: [ApplicationModule],
  controllers: [CategoryController, OrderController, ProductController],
})
export class ApiModule {}
