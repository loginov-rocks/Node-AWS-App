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
    // Error type 1.
    throw new BadRequestHttpError();
  }

  if (!description || !price || !title) {
    // Error type 2.
    throw new BadRequestHttpError();
  }

  const product = await database.createProduct({ description, price, title });

  if (!product) {
    // Error type 3.
    throw new BadRequestHttpError();
  }

  return product;
};
