import { All, Controller, Req } from '@nestjs/common';
import { Request } from 'express';

import { DiscoveryService } from './discovery.service';

@Controller()
export class AppController {
  constructor(private readonly discoveryService: DiscoveryService) {
  }

  @All()
  proxy(@Req() req: Request) {
    const url = this.discoveryService.getEndpointUrl(req.path);

    return [
      url,
      req.method,
    ];
  }
}
