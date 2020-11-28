import generatePolicy from './generatePolicy';

/**
 * @see https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html#api-gateway-lambda-authorizer-lambda-function-create
 */
export default pool => (event, context, callback) => {
  console.log('basicAuthorizer triggered:', event);

  if (event.type !== 'TOKEN' || !event.authorizationToken) {
    // Case: no authorization data provided.
    callback('Unauthorized');
    return;
  }

  let encoded, username, password;

  try {
    encoded = event.authorizationToken.split(' ')[1];
    const buffer = Buffer.from(encoded, 'base64');
    [username, password] = buffer.toString('utf-8').split(':');
  } catch {
    // Case: invalid authorization data.
    callback('Unauthorized');
    return;
  }

  const isAllowed = pool.validateCredentials(username, password);
  const policy = generatePolicy(encoded, isAllowed, event.methodArn);

  callback(null, policy);
}
