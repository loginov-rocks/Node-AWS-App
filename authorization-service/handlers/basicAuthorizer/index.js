import ForbiddenHttpError from '../../http/ForbiddenHttpError';
import UnauthorizedHttpError from '../../http/UnauthorizedHttpError';

import generatePolicy from './generatePolicy';

export default (event) => {
  console.log('basicAuthorizer triggered:', event);

  if (event.type !== 'TOKEN' || !event.authorizationToken) {
    throw new UnauthorizedHttpError();
  }

  try {
    const encoded = event.authorizationToken.split(' ')[1];
    const buffer = Buffer.from(encoded, 'base64');
    const [username, password] = buffer.toString('utf-8').split(':');

    // TODO: Approach?
    const storedUserPassword = process.env[username];
    const effect = !storedUserPassword || storedUserPassword !== password ? 'Deny' : 'Allow';

    return generatePolicy(encoded, event.methodArn, effect);
  } catch {
    throw new ForbiddenHttpError();
  }
}
