import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from 'modules/api/api.module';
import { ApplicationModule } from 'modules/application/application.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ApiModule,
    ApplicationModule,
  ],
})
export class AppModule {}
