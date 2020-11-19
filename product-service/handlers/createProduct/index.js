import BadRequestHttpError from '../../http/BadRequestHttpError';

/**
 * Module implementing Create Product business logic.
 * Database layer injected as a dependency.
 */
export default database => async event => {
  console.log('createProduct triggered:', event);
  let description, price, title;

  try {
    ({ description, price, title } = JSON.parse(event.body));
  } catch {
    throw new BadRequestHttpError('Request body is invalid');
  }

  if (!description || !price || !title) {
    throw new BadRequestHttpError('Missing description, price or title attributes');
  }

  const product = await database.createProduct({ description, price, title });

  if (!product) {
    // Error type 3.
    throw new BadRequestHttpError('Product creation failed');
  }

  return product;
};
