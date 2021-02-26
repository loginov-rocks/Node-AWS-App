import {
  All,
  CACHE_MANAGER,
  Controller,
  Inject,
  Req,
  Res,
} from '@nestjs/common';
import { Method } from 'axios';
import { Cache } from 'cache-manager';
import { Request, Response } from 'express';

import { DiscoveryService } from './discovery.service';
import { ProxyService } from './proxy.service';

@Controller()
export class AppController {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly discoveryService: DiscoveryService,
    private readonly proxyService: ProxyService,
  ) {}

  /**
   * Return cache parameters for the specified combination of the service name, path and request method;
   * or NULL if the combination is not expected to be cached.
   */
  protected getCacheParameters(
    serviceName: string,
    servicePath: string,
    method: Method,
  ): {
    key: string;
    statuses: number[];
    ttl: number;
  } | null {
    if (
      serviceName === 'product' &&
      servicePath === '' &&
      method.toLowerCase() === 'get'
    ) {
      return {
        key: 'product',
        statuses: [200],
        ttl: 120, // 2 min
      };
    }

    return null;
  }

  @All()
  async proxy<T>(@Req() req: Request, @Res() res: Response): Promise<void> {
    const method = req.method as Method;
    const {
      serviceName,
      servicePath,
      url,
    } = this.discoveryService.discoverEndpoint(req.path);
    const body = req.body;

    // Custom cache implementation since the controller is dynamic and
    // default interceptors can't work when the "res" is used directly.
    const cacheParameters = this.getCacheParameters(
      serviceName,
      servicePath,
      method,
    );
    if (cacheParameters) {
      const cached = await this.cacheManager.get(cacheParameters.key);
      if (cached) {
        res.send(cached);
        return;
      }
    }

    const { data, status } = await this.proxyService.request(method, url, body);

    if (cacheParameters) {
      if (cacheParameters.statuses.includes(status)) {
        await this.cacheManager.set(cacheParameters.key, data, {
          ttl: cacheParameters.ttl,
        });
      }
    }

    res.status(status).send(data);
  }
}
