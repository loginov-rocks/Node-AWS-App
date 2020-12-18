import { BadGatewayException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DiscoveryService {
  constructor(private readonly configService: ConfigService) {
  }

  /**
   * Discover service URL by name with the help of the environment variables.
   */
  public getServiceUrl(serviceName: string): string {
    const key = `${serviceName.toUpperCase()}_SERVICE_URL`;

    const serviceUrl = this.configService.get(key);

    if (!serviceUrl) {
      throw new BadGatewayException('Cannot process request');
    }

    return serviceUrl;
  }

  /**
   * Parse requested path to discover recipient service and build endpoint URL.
   */
  public discoverEndpoint(path: string): { serviceName: string, servicePath: string, serviceUrl: string, url: string } {
    const [, serviceName, ...rawServicePathParts] = path.split('/');
    const serviceUrl = this.getServiceUrl(serviceName);
    const servicePathParts = rawServicePathParts.filter(part => part !== '');
    const servicePath = servicePathParts.length > 0 ? `/${servicePathParts.join('/')}` : '';

    return {
      serviceName,
      servicePath,
      serviceUrl,
      // Query string is omitted intentionally since there is no requirement to pass it.
      url: serviceUrl + servicePath,
    };
  }
}
