import { Module } from '@nestjs/common';
import { CoreModule } from '@core/core.module';
import {
  CategoryController,
  OrderController,
  ProductController,
} from '@api/controllers';

@Module({
  imports: [CoreModule],
  controllers: [CategoryController, OrderController, ProductController],
})
export class ApiModule {}
