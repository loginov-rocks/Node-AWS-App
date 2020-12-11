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
   * Get full endpoint URL for the discovered service.
   */
  public getEndpointUrl(path: string): string {
    const [, serviceName, ...servicePathParts] = path.split('/');
    const serviceUrl = this.getServiceUrl(serviceName);
    const servicePath = servicePathParts.length > 0 ? `/${servicePathParts.join('/')}` : '';

    // Query string is omitted intentionally since there is no requirement to pass it.
    return serviceUrl + servicePath;
  }
}
