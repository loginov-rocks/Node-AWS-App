import basicAuthorizerHandler from './handlers/basicAuthorizer';
import wrapHttpHandler from './http/wrapHttpHandler';

export const basicAuthorizer = wrapHttpHandler(basicAuthorizerHandler);
