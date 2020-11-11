import NotFoundHttpError from '../../http/NotFoundHttpError';

/**
 * Module implementing Get Product By ID business logic.
 * Database layer injected as a dependency.
 */
export default database => async event => {
  console.log('getProductById triggered:', event);

  const id = event.pathParameters.id;
  const product = await database.getProductById(id);

  if (!product) {
    throw new NotFoundHttpError();
  }

  return product;
};
