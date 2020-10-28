import HttpError from './HttpError';
import wrapHttpHandler from './wrapHttpHandler';

it('transforms result from the handler to the HTTP representation', async () => {
  const handler = async () => {
    return {
      first: 'field',
      second: 10,
    };
  };

  const wrappedHandler = wrapHttpHandler(handler);
  const response = await wrappedHandler({});

  expect(response).toStrictEqual({
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 200,
    body: JSON.stringify({ first: 'field', second: 10 }),
  });
});

it('transforms HTTP error thrown from the handler to the correct representation', async () => {
  const handler = async () => {
    throw new HttpError(123, 'Special Error');
  };

  const wrappedHandler = wrapHttpHandler(handler);
  const response = await wrappedHandler({});

  expect(response).toStrictEqual({
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 123,
    body: JSON.stringify({ message: 'Special Error' }),
  });
});

it('transforms unknown error thrown from the handler to the Internal Server Error', async () => {
  const handler = async () => {
    throw new Error('Unexpected behavior');
  };

  const wrappedHandler = wrapHttpHandler(handler);
  const response = await wrappedHandler({});

  expect(response).toStrictEqual({
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 500,
    body: JSON.stringify({ message: 'Internal Server Error' }),
  });
});
