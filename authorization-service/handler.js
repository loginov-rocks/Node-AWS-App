import basicAuthorizerHandler from './handlers/basicAuthorizer';
import * as pool from './pool';

export const basicAuthorizer = basicAuthorizerHandler(pool);
