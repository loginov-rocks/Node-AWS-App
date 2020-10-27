const HttpError = require('./HttpError.js');

/**
 * Wrapper for the functions working in the HTTP context, responsible for
 * transforming outcome of the business logic in the HTTP responses.
 */
module.exports = handler => async event => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
  };

  let result;

  try {
    result = await handler(event);
  } catch (error) {
    if (error instanceof HttpError) {
      return {
        headers,
        statusCode: error.code,
        body: JSON.stringify({ message: error.message }),
      };
    }

    return {
      headers,
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }

  return {
    headers,
    statusCode: 200,
    body: JSON.stringify(result),
  };
};
