import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from 'modules/api/api.module';
import { CoreModule } from 'modules/core/core.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ApiModule, CoreModule],
})
export class AppModule {}
