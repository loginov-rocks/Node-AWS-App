import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { DiscoveryService } from './discovery.service';
import { ProxyService } from './proxy.service';

@Module({
  imports: [
    CacheModule.register(),
    ConfigModule.forRoot(),
    HttpModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    DiscoveryService,
    ProxyService,
  ],
})
export class AppModule {
}
