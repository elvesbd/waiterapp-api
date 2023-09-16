import { Module } from '@nestjs/common';
import { CategoryModule } from '@category/category.module';
import { OrderModule } from '@order/order.module';
import { ProductModule } from '@product/product.module';

@Module({
  imports: [CategoryModule, OrderModule, ProductModule],
})
export class AppModule {}
