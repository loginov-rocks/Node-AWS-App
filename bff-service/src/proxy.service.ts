import { BadGatewayException, HttpService, Injectable } from '@nestjs/common';
import { Method } from 'axios';

@Injectable()
export class ProxyService {
  constructor(private readonly httpService: HttpService) {
  }

  /**
   * Make a request and return data and status received.
   */
  public async request<T>(method: Method, url: string, body?: any): Promise<{ data: T; status: number }> {
    // Send body only for the appropriate HTTP methods.
    const data = ['patch', 'post', 'put'].includes(method.toLowerCase()) ? body : undefined;

    const response = await this.httpService.request<T>({
      data,
      method,
      url,
    }).toPromise()
        .catch((error) => {
          if (error.response) {
            // Response has been received so we can return it.
            return error.response;
          } else {
            // Response has not been received from the upstream server.
            throw new BadGatewayException();
          }
        });

    return {
      data: response.data,
      status: response.status,
    };
  }
}
