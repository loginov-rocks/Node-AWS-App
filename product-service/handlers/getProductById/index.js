const NotFoundHttpError = require('../../http/NotFoundHttpError.js');

/**
 * Module implementing Get Product By ID business logic.
 * Database layer injected as a dependency.
 */
module.exports = database => async event => {
  const id = event.pathParameters.id;
  const product = await database.getProductById(id);

  if (!product) {
    throw new NotFoundHttpError();
  }

  return product;
};
