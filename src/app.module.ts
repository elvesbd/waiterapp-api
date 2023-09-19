import { Module } from '@nestjs/common';
import { CategoryModule } from '@category/category.module';
import { OrderModule } from '@order/order.module';
import { ProductModule } from '@product/product.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CategoryModule,
    OrderModule,
    ProductModule,
  ],
})
export class AppModule {}
