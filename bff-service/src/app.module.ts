import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { DiscoveryService } from './discovery.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  controllers: [
    AppController,
  ],
  providers: [
    DiscoveryService,
  ],
})
export class AppModule {
}
