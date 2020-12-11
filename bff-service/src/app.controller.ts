import { All, Controller, Req, Res } from '@nestjs/common';
import { Method } from 'axios';
import { Request, Response } from 'express';

import { DiscoveryService } from './discovery.service';
import { ProxyService } from './proxy.service';

@Controller()
export class AppController {
  constructor(
      private readonly discoveryService: DiscoveryService,
      private readonly proxyService: ProxyService,
  ) {
  }

  @All()
  async proxy<T>(@Req() req: Request, @Res() res: Response): Promise<void> {
    const method = req.method as Method;
    const url = this.discoveryService.getEndpointUrl(req.path);
    const body = req.body;

    const { data, status } = await this.proxyService.request(method, url, body);

    res.status(status).send(data);
  }
}
